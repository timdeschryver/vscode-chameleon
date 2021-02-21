import { workspace, extensions } from "vscode";
import { IColorThemes } from "./IThemes";

export function getColorThemes(): IColorThemes[] {
  const excludedThemes: string[] | undefined = workspace
    .getConfiguration("chameleon")
    .get("exclude.themes");

  const allColorThemes: IColorThemes[] = extensions.all
    .map(ext => ext.packageJSON.contributes?.themes || [])
    .reduce(
      (allColorThemes, packageColorTheme) => [
        ...allColorThemes,
        ...packageColorTheme
      ],
      []
    );

  return excludedThemes && excludedThemes.length !== 0
    ? allColorThemes.filter(
        themes => excludedThemes.indexOf(themes.label) === -1
      )
    : allColorThemes;
}
