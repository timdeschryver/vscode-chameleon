import * as vscode from "vscode";
import chameleonSwitch from "./chameleonSwitch";
import initInterval from "./initInterval";

function switchLook() {
  const interval: number | undefined = vscode.workspace
    .getConfiguration("chameleon")
    .get("interval");

  interval && interval !== 0 ? initInterval(interval) : chameleonSwitch();
}

export function activate(context: vscode.ExtensionContext) {
  switchLook();

  context.subscriptions.push(
    vscode.commands.registerCommand("chameleon.switchLook", () => {
      switchLook();
    }),

    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration("chameleon")) {
        switchLook();
      }
      return;
    })
  );
}

export function deactivate() {}
