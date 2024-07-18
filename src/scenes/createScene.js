import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { getCurrentPhaseUpgrades } from "../utils/getCurrentPhaseUpgrades";
import { resetUpgradeButtons } from "../utils/resetUpgradeButtons";
import { getCurrentPhase } from "../utils/getCurrentPhase";
import { phaseData } from "../constants/phaseData";

export default class CreateScene extends Phaser.Scene {
  constructor() {
    super("CreateScene");
    this.resetGame = this.resetGame.bind(this);
  }

  create() {
    this.totalFaith = 0;
    this.currentPhase = getCurrentPhase(this.totalFaith); // Use your function

    // Find the index of the initial phase in phaseData
    this.currentPhaseIndex = phaseData.findIndex(
      (phase) => phase.name === this.currentPhase
    );

    let scaleX =
      this.cameras.main.width /
      this.textures
        .get(phaseData[this.currentPhaseIndex].backgroundKey)
        .getSourceImage().width;
    let scaleY =
      this.cameras.main.height /
      this.textures
        .get(phaseData[this.currentPhaseIndex].backgroundKey)
        .getSourceImage().height;

    // Load initial background and acolyte images
    this.background = this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        phaseData[this.currentPhaseIndex].backgroundKey
      )
      .setOrigin(0.5, 0.5)
      .setScale(scaleX, scaleY);

    this.acolyte = this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        phaseData[this.currentPhaseIndex].spritePhase
      )
      .setOrigin(0.5, 0.2) // Make sure to reset origin for the new images
      .setScale(0.3)
      .setDepth(5)
      .setInteractive({ useHandCursor: true });
    this.cameras.main.setBackgroundColor("#ffffff");
    this.input.enabled = true;

    this.prayerAutomationFaithEvent = false; // passiveFaithEvent
    this.recruitFollowersFaithEvent = false;
    this.basicRitualsFaithEvent = false;
    this.totalFollowers = 0;
    this.playerName = "";

    this.topbar = new Topbar(
      this,
      0,
      20,
      4000,
      45,
      this.totalFaith,
      this.totalFollowers
    );
    this.sidebar = new Sidebar(
      this,
      0,
      0,
      400,
      2000,
      this.resetGame,
      this.topbar,
      this.currentPhase,
      this.playerName
    );

    this.acolyte.on("pointerdown", () => {
      this.totalFaith += 10000;
      this.topbar.updateFaithLabel(this.totalFaith);
      this.playerName = this.sidebar.nameInput.text;
    });
  }

  resetGame() {
    this.totalFaith = 0;
    this.totalFollowers = 0;
    this.currentPhase = getCurrentPhase(this.totalFaith);

    this.currentPhaseIndex = phaseData.findIndex(
      (phase) => phase.name === this.currentPhase
    );
    let scaleX =
      this.cameras.main.width /
      this.textures
        .get(phaseData[this.currentPhaseIndex].backgroundKey)
        .getSourceImage().width;
    let scaleY =
      this.cameras.main.height /
      this.textures
        .get(phaseData[this.currentPhaseIndex].backgroundKey)
        .getSourceImage().height;
    this.background
      .setTexture(phaseData[this.currentPhaseIndex].backgroundKey)
      .setOrigin(0.5, 0.5)
      .setScale(scaleX, scaleY);
    this.acolyte
      .setTexture(phaseData[this.currentPhaseIndex].spritePhase)
      .setOrigin(0.5, 0.2)
      .setScale(0.3)
      .setDepth(5)
      .setInteractive({ useHandCursor: true });
    this.cameras.main.setBackgroundColor("#ffffff");
    this.input.enabled = true;

    if (this.topbar) {
      // Check if the topbar exists before updating it
      this.topbar.updateFaithLabel(this.totalFaith);
      this.topbar.updateFollowersLabel(this.totalFollowers);
    }

    if (this.sidebar) {
      this.sidebar.nameInput.text = "";
      // this.worshipInput;
      const upgrades = getCurrentPhaseUpgrades(this.currentPhase);
      upgrades.forEach((upgrade) => {
        upgrade.active = false;
      });
      resetUpgradeButtons(this.currentPhase); // Reset upgrade buttons
    }

    // Stop the passive faith generation loops if they exist
    if (this.prayerAutomationFaithEvent) {
      this.prayerAutomationFaithEvent.destroy();
      this.prayerAutomationFaithEvent = false;
    }
    if (this.recruitFollowersFaithEvent) {
      this.recruitFollowersFaithEvent.destroy();
      this.recruitFollowersFaithEvent = false;
    }
    if (this.basicRitualsFaithEvent) {
      this.basicRitualsFaithEvent.destroy();
      this.basicRitualsFaithEvent = false;
    }

    this.scene.restart();
  }
  // function to listen for totalFaith updates and update the currentPhase. Update the sidebar with the new phase and reset the upgrade buttons
  update() {
    const newPhase = getCurrentPhase(this.totalFaith);
    const newPhaseIndex = phaseData.findIndex(
      (phase) => phase.name === newPhase
    );

    if (newPhase !== this.currentPhase) {
      console.log("Phase changed from: ", this.currentPhase, " to: ", newPhase);

      this.currentPhaseIndex = newPhaseIndex;
      this.currentPhase = newPhase;

      let scaleX =
        this.cameras.main.width /
        this.textures
          .get(phaseData[this.currentPhaseIndex].backgroundKey)
          .getSourceImage().width;
      let scaleY =
        this.cameras.main.height /
        this.textures
          .get(phaseData[this.currentPhaseIndex].backgroundKey)
          .getSourceImage().height;
      // Update background and acolyte images using keys from phaseData
      this.background
        .setTexture(phaseData[this.currentPhaseIndex].backgroundKey)
        .setOrigin(0.5, 0.5)
        .setScale(scaleX, scaleY);
      this.acolyte
        .setTexture(phaseData[this.currentPhaseIndex].spritePhase)
        .setOrigin(0.5, 0.2)
        .setScale(0.3)
        .setDepth(5)
        .setInteractive({ useHandCursor: true });
      this.cameras.main.setBackgroundColor("#ffffff");
      this.input.enabled = true;
      this.sidebar.currentPhaseLabel.text = this.currentPhase;
      this.sidebar.upgrades = getCurrentPhaseUpgrades(this.currentPhase);
      resetUpgradeButtons(this.currentPhase);
      this.sidebar.destroy(true);
      this.sidebar = new Sidebar(
        this,
        0,
        0,
        400,
        2000,
        this.resetGame,
        this.topbar,
        this.currentPhase,
        this.playerName
      );
    }
  }
}
