import { expect } from "chai";
import { describe, it, before } from "mocha";
import { useFakeTimers } from "sinon";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

describe("vscode-chameleon extension tests", () => {
  before(() => {
    vscode.window.showInformationMessage("Start all tests.");
  });

  it("should be present", () =>
    expect(vscode.extensions.getExtension("timdeschryver.vscode-chameleon")).to
      .be.ok);

  it("should be activated", function () {
    this.timeout(1 * 60 * 1000);
    const isActive = vscode.extensions.getExtension(
      "timdeschryver.vscode-chameleon"
    )?.isActive;

    expect(isActive).to.be.true;
  });

  it("should register all chameleon commands", async () => {
    const commands = await vscode.commands.getCommands(true);
    const COMMANDS = ["vscode-chameleon.switchLook"];
    const foundChameleonCommands = commands.filter(
      value => COMMANDS.indexOf(value) >= 0 || value.startsWith("chameleon.")
    );
    expect(foundChameleonCommands.length).to.deep.equal(COMMANDS.length);
  });

  it("should allow users to define themes to switch to", () =>
    expect(vscode.workspace.getConfiguration("chameleon").has("exclude.themes"))
      .to.be.true);

  it("should have interval section", () =>
    expect(vscode.workspace.getConfiguration("chameleon").has("interval")).to.be
      .true);

  it("should allow users specify interval to switch to the next theme", async () => {
    const chameleonConfig = vscode.workspace.getConfiguration("chameleon");

    await chameleonConfig.update("interval", 1, true);
    expect(
      vscode.workspace.getConfiguration("chameleon").get("interval")
    ).to.equal(1);

    await chameleonConfig.update("interval", undefined, true);
  });

  it("should switch to the next theme after specified interval", async function () {
    this.timeout(1 * 3 * 1000);
    const chameleonConfig = vscode.workspace.getConfiguration("chameleon");
    const workbenchConfig = vscode.workspace.getConfiguration("workbench");

    const prevColorTheme = workbenchConfig.get("colorTheme");
    let nextColorTheme!: string | undefined;

    const allColorThemes = vscode.extensions.all
      .map(ext => ext.packageJSON.contributes?.themes || [])
      .reduce(
        (allColorThemes, packageColorTheme) => [
          ...allColorThemes,
          ...packageColorTheme
        ],
        []
      );

    const randomGen = () =>
      allColorThemes[Math.floor(Math.random() * allColorThemes.length)].label;
    const randomColorThemes = [randomGen(), randomGen()];

    await chameleonConfig.update("interval", 1, true);
    await chameleonConfig.update("exclude.themes", randomColorThemes, true);

    const clock = useFakeTimers();
    setTimeout(() => {
      nextColorTheme = workbenchConfig.get("colorTheme");
    }, 1 * 60 * 60 * 1000 + 1 * 2 * 1000);

    await clock.tickAsync("01:00:00");
    expect(nextColorTheme).to.not.equal(prevColorTheme);

    await chameleonConfig.update("interval", undefined, true);
    await chameleonConfig.update("exclude.themes", undefined, true);
  });
});
