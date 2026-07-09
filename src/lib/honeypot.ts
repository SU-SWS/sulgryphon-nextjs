// Not "search", "q", etc: those are real params the external /all and
// searchworks.stanford.edu targets may interpret, so a generic name risks colliding.
// Shared (not in honeypot-field.tsx, which is "use client") so the edge handler
// (middleware.ts / proxy.ts) can import it without pulling in a client module.
export const HONEYPOT_FIELD_NAME = "_hp"
