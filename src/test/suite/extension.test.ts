import { expect } from "chai";
import { describe, it, before } from "mocha";

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
    await vscode.workspace
      .getConfiguration("chameleon")
      .update("interval", 1, true);
    expect(
      vscode.workspace.getConfiguration("chameleon").get("interval")
    ).to.equal(1);
  });
});
