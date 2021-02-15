import * as vscode from "vscode";

function switchTheme() {
  const userConfig = vscode.workspace.getConfiguration();

  const userThemes: {
    label: string;
    uiTheme: string;
  }[] =
    vscode.extensions.all
      .map((ext) => ext.packageJSON.contributes?.themes || [])
      .reduce(
        (allThemes, packageThemes) => [...allThemes, ...packageThemes],
        []
      ) || [];
  const newTheme = userThemes[Math.floor(Math.random() * userThemes.length)];
  userConfig.update("workbench.colorTheme", newTheme.label, true);

  const userFont: string = userConfig.get("editor.fontFamily") || "";
  const newUserFonts = userFont
    .split(",")
    .map((f) => f.trim())
    .sort(() => 0.5 - Math.random())
    .join(", ");
  userConfig.update("editor.fontFamily", newUserFonts, true);
}

export function activate(context: vscode.ExtensionContext) {
  switchTheme();

  context.subscriptions.push(
    vscode.commands.registerCommand("chameleon.switchTheme", () => {
      switchTheme();
    })
  );
}

export function deactivate() {}
