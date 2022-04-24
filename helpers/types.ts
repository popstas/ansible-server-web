export type ItemTypeShort = {
  type: string, //"host" | "project" | "site",
  name: string,
  host: string,
  readme?: string,
  children?: ItemTypeShort[],
  roles?: RoleType[],
}

export type HostType = ItemTypeShort & {
  ip: string,
}

export type RoleType = string | {
  role: string,
}