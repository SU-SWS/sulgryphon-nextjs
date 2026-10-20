import Jsona from "jsona"

// jsona only exports its root entry, which doesn't re-export these types, so take them from the method.
type TJsonApiBody = Parameters<Jsona["deserialize"]>[0]
type TDeserializeOptions = Parameters<Jsona["deserialize"]>[1]

const dataFormatter = new Jsona()

export const deserialize = (body: TJsonApiBody, options?: TDeserializeOptions) => {
  if (!body) return null
  return dataFormatter.deserialize(body, options)
}
