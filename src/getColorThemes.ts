import { workspace, extensions } from 'vscode'
import { ColorTheme } from './types'

export default function getColorThemes(): ColorTheme[] {
  const options = workspace.getConfiguration('chameleon')
  const excludedThemes: string[] = options.get('excludedThemes') || []
  const uiTheme: string = options.get('uiTheme') || 'all'
  const uiThemeConfig: Record<string, string> = {
    light: 'vs',
    dark: 'vs-dark',
  }
  const ignoreDefaultThemes = excludedThemes.includes('default')

  const excludeDefaultThemes = (theme: ColorTheme) =>
    !ignoreDefaultThemes || !theme.path.startsWith('./themes/')

  const excludeExcludedThemes = (theme: ColorTheme) =>
    !excludedThemes.includes(theme.label)

  const excludeUiThemes = (theme: ColorTheme) =>
    (uiThemeConfig[uiTheme] || theme.uiTheme) === theme.uiTheme

  const colorThemes: ColorTheme[] = extensions.all
    .map((ext) => ext.packageJSON.contributes?.themes || [])
    .reduce(
      (allColorThemes, packageColorTheme) => [
        ...allColorThemes,
        ...packageColorTheme,
      ],
      [],
    )
    .filter(excludeDefaultThemes)
    .filter(excludeExcludedThemes)
    .filter(excludeUiThemes)

  return colorThemes
}
