import "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { upgradeButtons } from "./upgradeButtons";
import { getCurrentPhaseUpgrades } from "../utils/getCurrentPhaseUpgrades";
import { saveButton } from "./saveButton";
import { restartButton } from "./restartButton";

export default class Sidebar extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    resetGameFunction,
    topbar,
    currentPhase
  ) {
    super(scene, x, y);
    this.scene = scene;

    this.setSize(width, height);
    this.scene.add.existing(this);

    const sizer = this.scene.rexUI.add
      .sizer({
        orientation: "y",
        width,
        height,
      })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xcc3a33)
      );

    this.add(sizer);

    this.resetGameFunction = resetGameFunction;
    this.topbar = topbar;
    this.currentPhase = currentPhase;

    // Input text box for the player to name their priest
    this.nameInput = this.scene.add.rexInputText(0, 0, 240, 50, {
      type: "text",
      placeholder: "Name Your Acolyte",
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#DD9292",
      fontFamily: "Lato",
      borderRadius: "10px",
      maxLength: 20,
      paddingLeft: "10px",
      tooltip: "Your acolyte's name",
      autoComplete: "off",
    });

    sizer.add(this.nameInput, 0, "center", {
      top: 1040,
      left: 270,
      right: 10,
    });

    // Label to display the player's progression path status
    const progressionLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        0, // X position
        0, // Y position
        240, // Width
        50, // Height
        10, // Border radius
        0xdd9292 // Background color
      ),
      width: 240,
      height: 50,
      text: this.scene.add.text(0, 0, "Status", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
      space: { left: 10 },
    });

    sizer.add(progressionLabel, 0, "center", {
      top: 20,
      left: 270,
      right: 10,
    });

    // Input to display player's worship details
    this.worshipInput = this.scene.add.rexInputText(0, 0, 240, 50, {
      type: "text",
      placeholder: "Choose Your Worship",
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#DD9292",
      fontFamily: "Lato",
      borderRadius: "10px",
      maxLength: 20,
      paddingLeft: "10px",
      tooltip: "Your choice of worship",
      autoComplete: "off",
    });

    sizer.add(this.worshipInput, 0, "center", {
      top: 20,
      left: 270,
      right: 10,
    });

    // Label to display player's available upgrades
    const upgradesLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        0,
        0,
        240,
        50,
        10,
        0xdd9292
      ),
      width: 240,
      height: 50,
      text: this.scene.add.text(0, 0, "Upgrades", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
      space: { left: 10 },
    });

    sizer.add(upgradesLabel, 0, "center", {
      top: 20,
      left: 270,
      right: 10,
    });

    // Dynamically create upgrade buttons based on the player's current phase
    const upgrades = getCurrentPhaseUpgrades(this.currentPhase);
    upgradeButtons(this.scene, sizer, upgrades, this.topbar);

    // Button for player to save the game
    this.save = saveButton(this.scene, sizer);

    // Button for player to restart the game
    this.restart = restartButton(this.scene, sizer, resetGameFunction);

    sizer.layout();
  }
}
