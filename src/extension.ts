import * as vscode from 'vscode'
import chameleonSwitch from './chameleonSwitch'
import switchInterval from './switchInterval'

function switchLook() {
  const interval: number =
    vscode.workspace.getConfiguration('chameleon').get('switchInterval') || 0

  interval ? switchInterval(interval) : chameleonSwitch()
}

export function activate(context: vscode.ExtensionContext) {
  switchLook()

  context.subscriptions.push(
    vscode.commands.registerCommand('chameleon.switchLook', () => {
      switchLook()
    }),
  )
}

export function deactivate() {}
