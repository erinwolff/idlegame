import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { getCurrentPhaseUpgrades } from "../utils/getCurrentPhaseUpgrades";
import { resetUpgradeButtons } from "../utils/resetUpgradeButtons";

export default class CreateScene extends Phaser.Scene {
  constructor() {
    super("CreateScene");
    this.resetGame = this.resetGame.bind(this);
  }

  create() {
    let scaleX =
      this.cameras.main.width /
      this.textures.get("acolyteBackground").getSourceImage().width;
    let scaleY =
      this.cameras.main.height /
      this.textures.get("acolyteBackground").getSourceImage().height;

    this.currentPhase = "initiate"; // Game begins in the initiate phase

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "acolyteBackground"
      )
      .setOrigin(0.5, 0.5)
      .setScale(scaleX, scaleY);
    this.cameras.main.setBackgroundColor("#ffffff");
    this.input.enabled = true;

    this.totalFaith = 0;
    this.prayerAutomationFaithEvent = false; // passiveFaithEvent
    this.recruitFollowersFaithEvent = false;
    this.basicRitualsFaithEvent = false;
    this.totalFollowers = 0;

    this.acolyte = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "acolyte"
    );
    this.acolyte.setOrigin(0.5, 0.2);
    this.acolyte.setScale(0.3);
    this.acolyte.setDepth(5);
    this.acolyte.setInteractive({ useHandCursor: true });

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
      this.currentPhase
    );

    this.acolyte.on("pointerdown", () => {
      this.totalFaith += 1;
      this.topbar.updateFaithLabel(this.totalFaith);
    });
  }
  resetGame() {
    this.totalFaith = 0;
    this.totalFollowers = 0;
    this.currentPhase = "initiate";
    if (this.topbar) {
      // Check if the topbar exists before updating it
      this.topbar.updateFaithLabel(this.totalFaith);
      this.topbar.updateFollowersLabel(this.totalFollowers);
    }

    if (this.sidebar) {
      this.nameInput;
      this.worshipInput;
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
}
