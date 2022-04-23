export type ItemTypeShort = {
  type: string, //"host" | "project" | "site",
  name: string,
  host: string,
  readme?: string,
}

export type HostType = ItemTypeShort & {
  ip: string,
}