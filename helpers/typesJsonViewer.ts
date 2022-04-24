export type JsonViewerDataType = {
  name?: string,
  favicon?: string,
  items: object[],
  fields?: JsonViewerFieldType[],
  filters?: object[],
  columns?: object,
}

export type JsonViewerFieldType = {
  name: string,
  comment?: string,
  comment_en?: string,
  groups?: string[],
  default?: boolean,
  validate?: {
    // success?: string,
    warning?: string,
    error?: string,
  },
  stat?: {
    type?: "enum" | "unique" | "ranges",
    ranges?: string[],
  },
  type?: "string" | "integer" | "enum" | "boolean",
  filterType?: "integer" | "enum" | "string",
}
