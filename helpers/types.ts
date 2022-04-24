export type ItemTypeShort = {
  type: string, //"host" | "project" | "site",
  slug: string, // unique
  name: string,
  host: string,
  readme?: string,
  children?: ItemTypeShort[],
  roles?: RoleType[],
  data?: object,
}

export type HostType = ItemTypeShort & {
  ip: string,
}

export type RoleType = string | {
  role: string,
}
