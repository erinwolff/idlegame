import "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import {
  initiateUpgrades,
  priestessUpgrades,
  highPriestessUpgrades,
  oracleUpgrades,
  saintUpgrades,
  demigodUpgrades,
  goddessUpgrades,
} from "../constants/upgrades";

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

    // Input to display player's available upgrades
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
    this.createUpgradeButtons(sizer);

    // Button for player to save the game
    const saveButton = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        0, // X position
        0, // Y position
        240, // Width
        50, // Height
        10, // Border radius
        0x64b5f6 // Background color
      ),
      width: 240,
      height: 50,
      text: this.scene.add.text(0, 0, "Save Game", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#64B5F6",
      }),
      space: { left: 10 },
    });

    sizer.add(saveButton, 0, "center", {
      top: 30,
      left: 270,
      right: 10,
    });

    // Button for player to restart the game
    const restartButton = this.scene.rexUI.add.label({
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
      text: this.scene.add.text(0, 0, "Restart Game", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
      space: { left: 10 },
    });

    sizer.add(restartButton, 0, "center", {
      top: 15,
      left: 270,
      right: 10,
    });

    saveButton.setInteractive({ useHandCursor: true });
    saveButton.on("pointerover", () => {
      saveButton.getElement("background").setFillStyle(0x2196f3);
      saveButton.getElement("text").setBackgroundColor("#2196F3");
      saveButton.getElement("background").setStrokeStyle(1, 0xffffff);
    });
    saveButton.on("pointerout", () => {
      saveButton.getElement("background").setFillStyle(0x64b5f6);
      saveButton.getElement("text").setBackgroundColor("#64B5F6");
      saveButton.getElement("background").setStrokeStyle();
    });

    restartButton.setInteractive({ useHandCursor: true });
    restartButton.on("pointerover", () => {
      restartButton.getElement("background").setFillStyle(0xf30103);
      restartButton.getElement("text").setBackgroundColor("#F30103");
      restartButton.getElement("background").setStrokeStyle(1, 0xffffff);
    });
    restartButton.on("pointerout", () => {
      restartButton.getElement("background").setFillStyle(0xdd9292);
      restartButton.getElement("text").setBackgroundColor("#DD9292");
      restartButton.getElement("background").setStrokeStyle();
    });
    restartButton.on("pointerdown", () => {
      this.resetGameFunction();
    });

    sizer.layout();
  }
  getCurrentPhaseUpgrades() {
    if (this.currentPhase === "initiate") {
      return initiateUpgrades;
    }
    if (this.currentPhase === "priestess") {
      return priestessUpgrades;
    }
    if (this.currentPhase === "highPriestess") {
      return highPriestessUpgrades;
    }
    if (this.currentPhase === "oracle") {
      return oracleUpgrades;
    }
    if (this.currentPhase === "saint") {
      return saintUpgrades;
    }
    if (this.currentPhase === "demigod") {
      return demigodUpgrades;
    }
    if (this.currentPhase === "goddess") {
      return goddessUpgrades;
    } else {
      return [];
    }
  }
  createUpgradeButtons(sizer) {
    const upgrades = this.getCurrentPhaseUpgrades();
    upgrades.forEach((upgrade) => {
      const upgradeButton = this.scene.rexUI.add.label({
        background: this.scene.rexUI.add.roundRectangle(
          0, // X position
          0, // Y position
          200, // Width
          50, // Height
          10, // Border radius
          0xf4c6c6 // Background color
        ),
        width: 200,
        height: 50,
        text: this.scene.add.text(0, 0, upgrade.name, {
          fontSize: "18px",
          color: "#000000",
          fontFamily: "Lato",
          backgroundColor: "#F4C6C6",
          padding: {
            left: 5,
          },
        }),
      });

      sizer.add(upgradeButton, 0, "center", {
        top: 20,
        left: 270,
        right: 10,
      });

      upgradeButton.setInteractive({ useHandCursor: true });

      upgradeButton.on("pointerover", () => {
        if (upgrade.active === false) {
          upgradeButton.getElement("background").setFillStyle(0x8bc34a);
          upgradeButton.getElement("text").setBackgroundColor("#8BC34A");
          upgradeButton.getElement("background").setStrokeStyle(1, 0xffffff);
          upgradeButton.getElement("text").setText(`Cost: ${upgrade.cost}
${upgrade.description}`);
          upgradeButton.getElement("text").setWordWrapWidth(220);
          upgradeButton.getElement("background").resize(240, 80);
          upgradeButton.getElement("text").setOrigin(0.05, 0.4);
        }
        if (upgrade.active === true) {
          upgradeButton.getElement("background").setFillStyle(0x8bc34a);
          upgradeButton.getElement("text").setBackgroundColor("#8BC34A");
          upgradeButton.getElement("background").setStrokeStyle(1, 0xffffff);
          upgradeButton.getElement("text").setText(`${upgrade.description}`);
          upgradeButton.getElement("text").setWordWrapWidth(220);
          upgradeButton.getElement("background").resize(240, 80);
          upgradeButton.getElement("text").setOrigin(0.05, 0.4);
        }
      });

      upgradeButton.on("pointerout", () => {
        if (upgrade.active === false) {
          upgradeButton.getElement("background").setFillStyle(0xf4c6c6);
          upgradeButton.getElement("text").setBackgroundColor("#F4C6C6");
          upgradeButton.getElement("background").setStrokeStyle();
          upgradeButton.getElement("text").setText(upgrade.name);
          upgradeButton.getElement("background").resize(200, 50);
          upgradeButton.getElement("text").setOrigin(0);
        }
        if (upgrade.active === true) {
          upgradeButton.getElement("background").setFillStyle(0x8bc34a);
          upgradeButton.getElement("text").setBackgroundColor("#8bc34a");
          upgradeButton.getElement("background").setStrokeStyle();
          upgradeButton.getElement("text").setText(`${upgrade.name} Activated`);
          upgradeButton.getElement("background").resize(220, 55);
          upgradeButton.getElement("text").setOrigin(0.05, 0.3);
        }
      });

      // Add functionality to activate the upgrades here
      upgradeButton.on("pointerdown", () => {
        if (
          upgrade.name === "Prayer Automation" &&
          this.scene.totalFaith >= 20 &&
          !this.prayerAutomationUnlocked
        ) {
          this.prayerAutomationUnlocked = true;
          upgrade.active = true;
          this.scene.totalFaith -= 20;
          this.topbar.updateFaithLabel(this.scene.totalFaith);
          upgradeButton.getElement("background").setFillStyle(0x8bc34a);
          upgradeButton.getElement("text").setBackgroundColor("#8bc34a");
          upgradeButton.getElement("background").setStrokeStyle();
          upgradeButton.getElement("text").setText(`${upgrade.name} Activated`);
          upgradeButton.getElement("background").resize(220, 55);
          upgradeButton.getElement("text").setOrigin(0.05, 0.3);

          // Start passive faith generation
          if (!this.scene.passiveFaithEvent) {
            this.scene.passiveFaithEvent = this.scene.time.addEvent({
              delay: 500, // .5 seconds
              callback: () => {
                if (this.prayerAutomationUnlocked) {
                  this.scene.totalFaith++;
                  this.topbar.updateFaithLabel(this.scene.totalFaith);
                }
              },
              loop: true,
            });
          }
        }
      });
    });
  }
  resetUpgradeButtons() {
    const upgrades = this.getCurrentPhaseUpgrades();
    upgrades.forEach((upgrade) => {
      upgrade.active = false;
    });
  }
}
