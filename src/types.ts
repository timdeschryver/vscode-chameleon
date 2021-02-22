export interface Theme {
  label: string
  id: string
}

export interface ColorTheme extends Theme {
  uiTheme: string
  path: string
}
