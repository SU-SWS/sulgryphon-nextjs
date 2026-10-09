import type {NextConfig} from "next"
import {INFINITE_CACHE} from "next/dist/lib/constants"

const drupalUrl = new URL(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string)

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: false,
  cacheLife: {
    // Safety net for any `use cache` scope that doesn't name a profile.
    default: {
      stale: INFINITE_CACHE,
      revalidate: INFINITE_CACHE,
      expire: INFINITE_CACHE,
    },
  },
  typescript: {
    // Disable build errors since dev dependencies aren't loaded on prod. Rely on GitHub actions to throw any errors.
    ignoreBuildErrors: process.env.CI !== "true",
  },
  images: {
    minimumCacheTTL: 2678400,
    dangerouslyAllowLocalIP: !!(process.env.CI || process.env.NODE_ENV === "development"),
    remotePatterns: [
      {
        protocol: drupalUrl.protocol === "https:" ? "https" : "http",
        hostname: drupalUrl.hostname,
        pathname: "/sites/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "localist-images.azureedge.net",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        // Drupal's preview links used to point here. The query string (secret and slug) is passed
        // through, and proxy.ts takes over from /preview.
        source: "/api/draft",
        destination: "/preview",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/search/website",
        destination: "/search",
        permanent: true,
      },
      {
        source: "/sfx",
        destination: "https://sfx-01stanford.hosted.exlibrisgroup.com/01stanford",
        permanent: true,
      },
      {
        source: "/sfx/:path*",
        destination: "https://sfx-01stanford.hosted.exlibrisgroup.com/01stanford/:path*",
        permanent: true,
      },
      {
        // Vulnerability scanners. Answered at the edge, so they never reach a function or the cache. Dotfiles
        // and dot directories (/.env, /.git/config), except /.well-known (certificates, security.txt).
        source: "/:file(\\.(?!well-known(?:/|$))[^/]+)/:path*",
        destination: "/not-found",
        permanent: true,
      },
      {
        // Server-side scripts, configs and backups this site never serves.
        source: "/:path(.*\\.(?:asp|aspx|jsp|cgi|env|ini|sql|bak|old|swp|ya?ml|log|config))",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/:dir(cgi-bin|phpmyadmin|xmlrpc|vendor/phpunit)/:path*",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/wp-:path",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/wp-:slug/:path*",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/node/:slug",
        destination: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/node/:slug",
        permanent: true,
      },
      {
        source: "/saml/login",
        destination: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/user/login",
        permanent: true,
      },
    ]
  },
  async headers() {
    if (process.env.VERCEL_ENV === "production") {
      return []
    }
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex,nofollow,noarchive",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({enabled: true})
  module.exports = withBundleAnalyzer(nextConfig)
}
