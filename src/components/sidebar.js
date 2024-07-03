import "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { upgradeButtons } from "./upgradeButtons";
import { getCurrentPhaseUpgrades } from "../utils/getCurrentPhaseUpgrades";
import { saveButton } from "./saveButton";
import { restartButton } from "./restartButton";
import { nameInput } from "./nameInput";
import { progressionLabel } from "./progressionLabel";
import { worshipInput } from "./worshipInput";

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
    this.nameInput = nameInput(this.scene, sizer);

    // Label to display the player's progression path status
    this.progressionLabel = progressionLabel(this.scene, sizer);

    // Input to display player's worship details
    this.worshipInput = worshipInput(this.scene, sizer);

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
    this.upgrades = getCurrentPhaseUpgrades(this.currentPhase);
    upgradeButtons(this.scene, sizer, this.upgrades, this.topbar);

    // Button for player to save the game
    this.save = saveButton(this.scene, sizer);

    // Button for player to restart the game
    this.restart = restartButton(this.scene, sizer, resetGameFunction);

    sizer.layout();
  }
}
