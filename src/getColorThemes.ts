import { workspace, extensions } from "vscode";
import { IColorThemes } from "./IThemes";

export function getColorThemes(): IColorThemes[] {
  const colorThemes: string[] | undefined = workspace
    .getConfiguration("chameleon")
    .get("themes");

  const allColorThemes: IColorThemes[] = extensions.all
    .map(ext => ext.packageJSON.contributes?.themes || [])
    .reduce(
      (allColorThemes, packageColorTheme) => [
        ...allColorThemes,
        ...packageColorTheme
      ],
      []
    );

  return colorThemes && colorThemes.length !== 0
    ? allColorThemes.filter(themes => colorThemes.indexOf(themes.label) >= 0)
    : allColorThemes;
}
