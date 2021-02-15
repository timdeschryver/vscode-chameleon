import * as vscode from "vscode";

function switchLook() {
  const userConfig = vscode.workspace.getConfiguration();

  const colorThemes: {
    label: string;
    uiTheme: string;
    id?: string;
  }[] = vscode.extensions.all
    .map((ext) => ext.packageJSON.contributes?.themes || [])
    .reduce(
      (allColorThemes, packageColorThemes) => [
        ...allColorThemes,
        ...packageColorThemes,
      ],
      []
    );
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
      .map((f) => f.trim())
      .sort(() => 0.5 - Math.random())
      .join(", ");
    userConfig.update("editor.fontFamily", font, true);
  }

  const productIconThemes: {
    label: string;
    id: string;
  }[] = [
    { label: "Default", id: "Default" },
    ...vscode.extensions.all
      .map((ext) => ext.packageJSON.contributes?.productIconThemes || [])
      .reduce(
        (allProductIcons, packageIcons) => [
          ...allProductIcons,
          ...packageIcons,
        ],
        []
      ),
  ];
  const productIconTheme =
    productIconThemes[Math.floor(Math.random() * productIconThemes.length)];
  userConfig.update(
    "workbench.productIconTheme",
    productIconTheme.id || productIconTheme.label,
    true
  );

  const iconThemes: {
    label: string;
    id: string;
  }[] = vscode.extensions.all
    .map((ext) => ext.packageJSON.contributes?.iconThemes || [])
    .reduce((allIcons, packageIcons) => [...allIcons, ...packageIcons], []);
  const iconTheme = iconThemes[Math.floor(Math.random() * iconThemes.length)];
  userConfig.update(
    "workbench.iconTheme",
    iconTheme.id || iconTheme.label,
    true
  );
}

export function activate(context: vscode.ExtensionContext) {
  switchLook();

  context.subscriptions.push(
    vscode.commands.registerCommand("chameleon.switchLook", () => {
      switchLook();
    })
  );
}

export function deactivate() {}
