/**
 * Compare two secrets in constant time.
 *
 * A plain `===` bails on the first differing character, which leaks the secret one character at a
 * time to anyone willing to measure the response. Hashing first gives two fixed-length values, so
 * neither the length nor the contents of the expected secret affect how long the comparison takes.
 *
 * @param given - The value supplied by the request.
 * @param expected - The configured secret. An empty or missing secret never matches.
 * @returns Whether the two values are identical.
 */
export const secretsMatch = async (given?: string | null, expected?: string | null): Promise<boolean> => {
  // Fail closed: an unset secret must never turn into an open door.
  if (!expected || typeof given !== "string") return false

  const encoder = new TextEncoder()
  const [givenHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(given)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ])

  const givenBytes = new Uint8Array(givenHash)
  const expectedBytes = new Uint8Array(expectedHash)

  let difference = 0
  for (let i = 0; i < expectedBytes.length; i++) difference |= givenBytes[i] ^ expectedBytes[i]

  return difference === 0
}
