import { expect } from 'chai'
import { describe, it, before } from 'mocha'
import { useFakeTimers } from 'sinon'

import * as vscode from 'vscode'

describe('vscode-chameleon extension tests', () => {
  before(() => {
    vscode.window.showInformationMessage('Start all tests.')
  })

  it('should be present', () =>
    expect(vscode.extensions.getExtension('timdeschryver.vscode-chameleon')).to
      .be.ok)

  it('should be activated', function () {
    this.timeout(1 * 60 * 1000)
    const isActive = vscode.extensions.getExtension(
      'timdeschryver.vscode-chameleon',
    )?.isActive

    expect(isActive).to.be.true
  })

  it('should register all chameleon commands', async () => {
    const commands = await vscode.commands.getCommands(true)
    const COMMANDS = ['vscode-chameleon.switchLook']
    const foundChameleonCommands = commands.filter(
      (value) => COMMANDS.indexOf(value) >= 0 || value.startsWith('chameleon.'),
    )
    expect(foundChameleonCommands.length).to.deep.equal(COMMANDS.length)
  })

  it('should allow users specify what themes to exclude', () =>
    expect(vscode.workspace.getConfiguration('chameleon').has('excludedThemes'))
      .to.be.true)

  it('should allow users to configure the ui theme', () =>
    expect(vscode.workspace.getConfiguration('chameleon').has('uiTheme')).to.be
      .true)

  it('should allow users configure the theme switch interval', async () => {
    const chameleonConfig = vscode.workspace.getConfiguration('chameleon')

    expect(chameleonConfig.has('switchInterval')).to.be.true

    await chameleonConfig.update('switchInterval', 1, true)
    expect(
      vscode.workspace.getConfiguration('chameleon').get('switchInterval'),
    ).to.equal(1)

    await chameleonConfig.update('switchInterval', undefined, true)
  })

  it('should switch to the next theme after specified interval', async function () {
    this.timeout(1 * 2 * 1000 + 500)
    const chameleonConfig = vscode.workspace.getConfiguration('chameleon')
    const workbenchConfig = vscode.workspace.getConfiguration('workbench')

    const prevColorTheme = workbenchConfig.get('colorTheme')
    let nextColorTheme!: string | undefined

    const allColorThemes = vscode.extensions.all
      .map((ext) => ext.packageJSON.contributes?.themes || [])
      .reduce(
        (allColorThemes, packageColorTheme) => [
          ...allColorThemes,
          ...packageColorTheme,
        ],
        [],
      )

    const randomGen = () =>
      allColorThemes[Math.floor(Math.random() * allColorThemes.length)].label
    const randomColorThemes = [randomGen(), randomGen()]

    await chameleonConfig.update('switchInterval', 1, true)
    await chameleonConfig.update('excludedThemes', randomColorThemes, true)

    const clock = useFakeTimers()
    setTimeout(() => {
      nextColorTheme = workbenchConfig.get('colorTheme')
    }, 1 * 60 * 60 * 1000 + 1 * 2 * 1000)

    await clock.tickAsync('01:00:00')
    expect(nextColorTheme).to.not.equal(prevColorTheme)

    await chameleonConfig.update('switchInterval', undefined, true)
    await chameleonConfig.update('excludedThemes', undefined, true)
  })
})
