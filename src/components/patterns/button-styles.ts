/**
 * Colors and states for the pill buttons, from the "Buttons and Links" Figma spec. Size and spacing stay with
 * each caller. Hover and keyboard focus darken the fill and underline the text; focus adds the blue ring;
 * active (pressed) is black. `focus-ring-pill` is defined in src/styles/interactive.css.
 *
 * `active:` is listed after `hover:` and `focus-visible:` in Tailwind's variant order, so a pressed button turns
 * black even while hovered.
 */
export const primaryButtonClasses =
  "bg-digital-red text-white no-underline transition-colors hover:bg-cardinal-red-dark hover:text-white hover:underline focus-visible:bg-cardinal-red-dark focus-visible:text-white focus-visible:underline focus-visible:focus-ring-pill active:bg-black-true active:no-underline"

export const secondaryButtonClasses =
  "border-3 border-solid border-digital-red bg-white text-digital-red no-underline transition-colors hover:border-cardinal-red-dark hover:bg-cardinal-red-dark hover:text-white hover:underline focus-visible:border-cardinal-red-dark focus-visible:bg-cardinal-red-dark focus-visible:text-white focus-visible:underline focus-visible:focus-ring-pill active:border-black-true active:bg-black-true active:text-white active:no-underline"

/*
 * The spec has no dark background variants. The primary one keeps its earlier look, with focus moved to the ring.
 * The secondary one matches secondaryButtonClasses, except that its border turns white on hover and focus so the
 * #820000 pill stays visible on a Cardinal Red card.
 */
export const primaryButtonDarkBgClasses =
  "border-2 border-white bg-transparent text-white no-underline transition-colors hover:bg-white hover:text-digital-red hover:underline focus-visible:bg-black-true focus-visible:text-white focus-visible:underline focus-visible:focus-ring-pill active:bg-black-true active:text-white"

export const secondaryButtonDarkBgClasses =
  "border-3 border-solid border-digital-red bg-white text-digital-red no-underline transition-colors hover:border-white hover:bg-cardinal-red-dark hover:text-white hover:underline focus-visible:border-white focus-visible:bg-cardinal-red-dark focus-visible:text-white focus-visible:underline focus-visible:focus-ring-pill active:border-black-true active:bg-black-true active:text-white active:no-underline"
