# AGENTS.md

Stanford University Libraries website (`library.stanford.edu`): a Next.js front end for a Drupal CMS. Content comes
from Drupal over GraphQL and is rendered with Decanter (Stanford's design system) on Tailwind CSS.

## Stack

- **Next.js 16** App Router with **Cache Components** enabled (`cacheComponents: true`), built with webpack
  (`--webpack`). React 19, TypeScript 6.
- **Drupal 11** backend, queried over GraphQL at `${NEXT_PUBLIC_DRUPAL_BASE_URL}/graphql`.
- **Tailwind CSS 4** with **Decanter 8** (`8.0.0-beta.2`), configured CSS-first. There is no `tailwind.config.js`.
- **Base UI** (`@base-ui/react`) for interactive primitives (select, tabs). Not `@mui/base`.
- **TanStack Query** for the one client-side fetch (library hours).
- **Algolia** for site search, when configured.
- Hosted on **Vercel**. Package manager: **yarn**.

## Commands

```bash
yarn dev        # next dev --webpack (with --inspect)
yarn build      # next build --webpack
yarn preview    # build then next start
yarn lint       # eslint ./src ./app && tsc  (what CI runs)
yarn graphql    # regenerate GraphQL types from Drupal (reads .env.local)
```

- `BUILD_COMPLETE=true` prerenders every Drupal node at build time. Keep it `false` locally: only a placeholder
  (`/home`) is prerendered, and other pages render on first request and are then cached.
- Only one `next dev` can run per project. If one is already running (usually on port 3000), use it.
- The pre-commit hook (`.githooks/pre-commit`, installed by `postinstall`) runs Prettier on staged `.tsx` files.
- Vercel installs with `yarn workspaces focus --production`, so dev dependencies are absent in production builds.
  That's why `next.config.ts` ignores type errors outside CI. Rely on `yarn lint` / CI for type checking.

## Project structure

```
app/                       Routes
  [...slug]/page.tsx         Every Drupal node page (resolved by path)
  page.tsx                   Home page (renders components/node/stanford-page/home-page/home-page.tsx)
  preview/[[...slug]]/       Editor previews of draft content (see Preview)
  search/                    Site search (Algolia, or the Drupal search view as a fallback)
  calendar/, study-place/    Pages that also open as modals via the @modal intercepting routes
  api/revalidate/            On-demand revalidation called by Drupal
  api/library-hours/         Proxied, cached library hours (used by client components)
  api/people/search/         Person search over the cached staff directory
  sitemap.ts
proxy.ts                   Request gate: preview secret, /search query validation, /all honeypot
src/components/
  node/                      Drupal node displays (page, card, list item per content type); index.tsx dispatches
  paragraph/                 Drupal paragraph components; index.tsx dispatches by __typename
  views/                     Drupal view (list) displays; view.tsx dispatches and holds the loadViewPage action
  patterns/                  Shared UI (cards, links, select-list, tabs, modals, ...)
src/lib/
  gql/                       GraphQL documents (*.drupal.gql), generated types, client and cached queries
  hooks/                     Client hooks (useDataFetch, useLibraryHours, ...)
  libguides.tsx              LibGuides API (staff and subject guides)
  query-client.ts            TanStack Query client (per request on the server, shared in the browser)
  security.ts                secretsMatch (constant-time secret comparison)
src/styles/                Tailwind/Decanter entry (index.css) and site CSS
```

Import aliases: `@/components/*` and `@/lib/*`.

## GraphQL

- Queries and fragments live in `src/lib/gql/*.drupal.gql`. After editing them, run `yarn graphql` (needs
  `DRUPAL_BASIC_AUTH_ADMIN` in `.env.local`). Never edit `src/lib/gql/__generated__/` by hand.
- Codegen uses the **client preset** with `documentMode: "string"` and `enumsAsConst`. Import types and documents
  from `@/lib/gql/__generated__/graphql`, and run them with the client:
  ```ts
  graphqlClient().request<MenuQuery>(MenuDocument, {name})
  ```
- Custom scalars are typed: `Html`, `Timestamp`, `Time`, etc. are `string`. Drupal sends timestamps as strings,
  so use `parseInt(value) * 1000` for dates. `UntypedStructuredData` is `unknown`.
- `src/lib/gql/gql-client.ts` throws typed errors, all extending `ClientError`:
  - `NetworkError`: Drupal unreachable, or no answer within 15s (`timedOut`).
  - `HttpError`: an error status or a non-JSON body (e.g. a WAF page), with `status`.
  - `GraphqlError`: GraphQL `errors` in the response, or no `data`.

  Use `describeError()` for log messages. Error classes set `name` as a literal string, because production
  minification renames classes.
- Put new data access in `gql-queries.ts` or `gql-views.ts`, not in components.

## Caching (Cache Components)

All Drupal data is cached with `"use cache: remote"` and tagged with `cacheTag()`. The default `cacheLife` is
infinite (see `next.config.ts`). Content changes reach the site through on-demand revalidation.

**Cache tags.** Every entry carries `all-cache`, a group tag, and a specific tag:

| Data | Tags |
| --- | --- |
| Page/route by path | `paths`, `paths:<path>` |
| Menus | `menus`, `menu:<name>` (e.g. `menu:main`) |
| Config pages (site settings, footers, lockup) | `config-pages` |
| Views / listings | `views`, `views:<type>` (e.g. `views:stanford_news`) |
| Taxonomy | `taxonomy`, `taxonomy:<vocab>` |
| Nodes by uuid, libraries | `nodes`, `node:<uuid>`, `node:sul_library` |
| LibGuides | `libguides` plus the person's `paths:<path>` |

**Revalidation** (`app/api/revalidate`), authenticated with `DRUPAL_REVALIDATE_SECRET` (compared in constant time):
- `GET ?secret=…&path=/about` invalidates `paths:/about`. `/node/<id>` paths are resolved to their alias first.
  `/tags/a/b` invalidates the tags `a` and `b`. Saving the home page alias also clears `paths:/`.
- `POST` with `Authorization: Bearer <secret>` and `{"paths": [], "tags": []}` invalidates many at once.

**Rules for cached functions.** These were learned the hard way; follow them.
- **Never throw out of a `"use cache"` function to get a fallback.** Next reports the error to the page render and
  fails the whole page with a 500, even if the caller catches it.
- **On failure, return the fallback inside the cache scope with a short lifetime.** In `gql-queries.ts`,
  `cacheFailure(context, error)` logs the error and calls `cacheLife("minutes")`. Pages that use the fallback take
  the shorter lifetime too, so they retry soon. A failed request must never be cached like a real answer.
- **Exception, the page's own content:** a failed full route lookup (`getEntityFromPath`) is rethrown, so the
  render fails. Next then keeps serving the last good cached page, or returns a non-cached 500 when there is none,
  instead of caching a 404. Teaser lookups (cards) and menus, config pages and listings use the short-lived
  fallback, so one failed card can't take down a page.
- **A real "not found" is not an error.** For an unknown path Drupal returns `route: null` without errors. That
  is cached normally, so junk URLs don't hammer Drupal.
- `cacheLife` may only be called inside a cache scope, and only once per invocation (branches are fine).
- **Preview content is never cached.** `getEntityFromPath(path, true)` goes straight to Drupal.
- External data Drupal doesn't know about expires on its own (LibGuides `"days"`, node list `"weeks"`, library
  hours 8h).

**Cache Components conventions**
- Route segment config (`export const dynamic`, `revalidate`, `fetchCache`, `dynamicParams`) is not allowed.
- `generateStaticParams` must return at least one param (`[...slug]` falls back to `/home`).
- In `[...slug]/page.tsx`, params are awaited **outside** Suspense on purpose. Unlisted paths then render on first
  request and are cached (ISR), and redirects and 404s keep real status codes. Routes without
  `generateStaticParams` (calendar, study-place, modals) await params **inside** `<Suspense>`.
- Client components that read the URL or the clock during render (`useSearchParams`, `usePathname` on dynamic
  routes, `new Date()`) need a `<Suspense>` boundary, or must defer the read (e.g. `useSyncExternalStore` with a
  server snapshot, as in `past-event-notice.tsx`). Otherwise the prerender fails.
- Inline server-action closures encrypt their bound values at render time, which counts as uncached data. Prefer a
  `"use server"` module with form fields (see `flush-cache-action.ts`).
- Pages streamed after a static shell can't change their status code mid-render. Status-dependent decisions
  (preview access, `/search` query validation) therefore live in `proxy.ts`.

## Preview

Same flow as `nextCardinalsites`. There is no cookie.
1. Drupal links to `/preview?secret=…&slug=/path`. `/api/draft` is redirected there, for Drupal's older links.
2. `proxy.ts` checks the secret (`DRUPAL_PREVIEW_SECRET`, constant-time) and rejects unsafe slugs (`//host`, `..`,
   backslashes, `?`, `#`, including percent-encoded forms). It then redirects to `/preview/path?secret=…`.
3. Every preview request is re-checked. Bad or missing secrets are rewritten to a real 404. Preview responses get
   `Cache-Control: no-store`, `X-Robots-Tag: noindex` and `Referrer-Policy: no-referrer`.

Development mode does not bypass the check. The home page previews at `/preview` and `/preview/home`.

## Styling (Tailwind 4 + Decanter 8)

- Entry point: `src/styles/index.css`. It imports `decanter` (keeps the **62.5% root font size**, so `1rem` = 10px
  and all rem values assume this), `decanter/forms`, the site CSS files, and holds the `@theme` block (breakpoints
  `xs` 440px and `3xl` 1600px, container sizes, `grid-cols-1-2`-style columns, animations).
- Merge classes with `twMerge` / `clsx` (tailwind-merge v3).
- Prettier sorts classes using `tailwindStylesheet` in `.prettierrc`. Run `yarn lint` (or `eslint --fix`) after
  editing classes.

**Tailwind 4 / Decanter 8 gotchas**
- **Cascade layers.** In v4 every utility beats every base or component rule, whatever its specificity, and
  unlayered CSS beats all layers. Consequences already handled:
  - Font Awesome is imported into its own layer between `components` and `utilities` (otherwise its `.sr-only`
    beats `lg:not-sr-only`).
  - `src/styles/sul-base.css` re-declares `a:hover/a:focus` color and `li:last-child` margin in the utilities layer,
    so they keep their v3 precedence.
  - `responsive-table.css` is unlayered, so it can override the unlayered `react-super-responsive-table` CSS.
- **Variant stacking order is left to right in v4** (it was right to left in v3). "Last child's margin" is
  `*:last:mb-0`, not `last:*:mb-0`. `[&_p]:last:mb-0` targets the last `p` inside.
- **v4 accepts arbitrary scale values.** Classes that silently did nothing in v3 (e.g. `z-100`, `min-w-1/5`) now
  apply. Check for this before adding numeric classes.
- Removed or renamed: `children:` → `*:`, `flex-shrink-0` → `shrink-0`, `bg-opacity-*` → `bg-color/NN`,
  `bg-gradient-to-*` → `bg-linear-to-*/srgb` (sRGB keeps v3's look), `rounded` → `rounded-[0.3rem]`, `foggy` →
  `fog`, `break-words` → `wrap-anywhere`, `leading` → `leading-normal`. Decanter 8 removed `rs-*-neg*`; this site
  defines `rs-mt-neg1`, `rs-p-neg1` and `rs-mb-neg2` locally (`responsive-spacing-legacy.css`).
- `centered` is an `@utility` (so `lg:centered` works), and is not the same as Decanter's `centered-container`.
- `transform-none` does not reset v4's separate `translate` property. Add `translate-none` as well.
- `gray-200/500` and `blue-500/600` are pinned to their v3 hex values in `@theme`.

## Interactive components

- `patterns/elements/select-list.tsx` wraps Base UI `Select`. Keep its public props (`options`, `value`,
  `onChange(event, value)`, `multiple`, `label`, `emptyLabel`). It is non-modal, opens below the trigger at full
  width (`alignItemWithTrigger={false}`), and renders `<ul>/<li>` so base `li` text sizes apply.
- `patterns/elements/tabs.tsx` wraps Base UI `Tabs`. Each `Tab`/`TabPanel` needs an explicit numeric `value` (its
  index). Tabs are **controlled**, seeded once from `?tab=`, and the URL is updated with
  `window.history.replaceState`, which avoids a server round trip. Don't derive `defaultValue` from the URL on
  every render; Base UI errors on that. Panels use `keepMounted`, so all content is in the HTML.

## Client-side data

- `useDataFetch(url)` wraps `useQuery` and passes `getQueryClient()` directly, so **no provider wrapper is
  needed**. On the server the client is created per request; in the browser one client is shared (with a 10 min
  `staleTime` and 2 retries). Use `environmentManager.isServer()`, not the deprecated `isServer`.
- `useAllLibraryHours()` returns every location (`{}` while loading). `useLibraryHours(id)` returns one branch
  (`undefined` while loading), and accepts `branch/location` ids for additional locations.

## Environment variables

Required: `NEXT_PUBLIC_DRUPAL_BASE_URL`, `DRUPAL_BASIC_AUTH` (`user:pass`), `DRUPAL_BASIC_AUTH_ADMIN` (preview and
codegen), `DRUPAL_PREVIEW_SECRET`, `DRUPAL_REVALIDATE_SECRET`.

Optional: `LIBGUIDE_CLIENT_ID` / `LIBGUIDE_CLIENT_SECRET`, `ALGOLIA_ID` / `ALGOLIA_INDEX` / `ALGOLIA_KEY` (search-only
key; overrides the Drupal Site Settings), `DRUPAL_REQUEST_HEADER` (JSON headers, e.g. WAF bypass),
`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `BUILD_COMPLETE`. See `.env.example`.

`NEXT_PUBLIC_*` values are inlined at build time; changing them needs a rebuild.

## Verifying changes

- Run `yarn lint` and a `BUILD_COMPLETE=false yarn build`. The build is where Cache Components validation runs.
- For visual or behavioural checks, run `next start` on a spare port and check real pages: the home page, a library
  page (`/libraries/cecil-h-green-library`), the tables (`/libraries/places-to-study`,
  `/libraries/branches-and-centers`), and `/test-paragraphs` (all paragraph types).
- Locally, `/_next/image` returns 400 for Drupal images because the local Drupal host resolves to a private IP.
  This is an environment artifact, not a bug.
- Restarting `next start` clears its local cache, so test cache behaviour without restarting.
- `next-env.d.ts` is generated and git-ignored. Don't commit it.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
