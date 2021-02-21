import { workspace, extensions } from "vscode";
import getColorThemes from "./getColorThemes";
import { IIconThemes } from "./IThemes";

export default function chameleonSwitch(): void {
  const userConfig = workspace.getConfiguration();

  const colorThemes = getColorThemes();
  const colorTheme =
    colorThemes[Math.floor(Math.random() * colorThemes.length)];
  userConfig.update(
    "workbench.colorTheme",
    colorTheme.id || colorTheme.label,
    true
  );

  const fonts: string = userConfig.get("editor.fontFamily") || "";
  if (fonts) {
    const font = fonts
      .split(",")
      .map(f => f.trim())
      .sort(() => 0.5 - Math.random())
      .join(", ");
    userConfig.update("editor.fontFamily", font, true);
  }

  const productIconThemes: IIconThemes[] = [
    { label: "Default", id: "Default" },
    ...extensions.all
      .map(ext => ext.packageJSON.contributes?.productIconThemes || [])
      .reduce(
        (allProductIcons, packageIcons) => [
          ...allProductIcons,
          ...packageIcons
        ],
        []
      )
  ];

  const productIconTheme =
    productIconThemes[Math.floor(Math.random() * productIconThemes.length)];
  userConfig.update(
    "workbench.productIconTheme",
    productIconTheme.id || productIconTheme.label,
    true
  );

  const iconThemes: IIconThemes[] = extensions.all
    .map(ext => ext.packageJSON.contributes?.iconThemes || [])
    .reduce((allIcons, packageIcons) => [...allIcons, ...packageIcons], []);
  const iconTheme = iconThemes[Math.floor(Math.random() * iconThemes.length)];
  userConfig.update(
    "workbench.iconTheme",
    iconTheme.id || iconTheme.label,
    true
  );
}
