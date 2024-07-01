import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

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
    this.passiveFaithEvent = false;

    const acolyte = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "acolyte"
    );
    acolyte.setOrigin(0.5, 0.2);
    acolyte.setScale(0.3);
    acolyte.setDepth(5);
    acolyte.setInteractive({ useHandCursor: true });

    this.topbar = new Topbar(this, 0, 20, 4000, 45, this.totalFaith);
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

    acolyte.on("pointerdown", () => {
      this.totalFaith += 1;
      this.topbar.updateFaithLabel(this.totalFaith);
    });
  }
  resetGame() {
    this.totalFaith = 0;
    this.currentPhase = "initiate";
    this.topbar.updateFaithLabel(this.totalFaith);
    this.sidebar.nameInput.setText("");
    this.sidebar.worshipInput.setText("");
    this.sidebar.prayerAutomationUnlocked = false;

    // Stop the passive faith generation loop
    if (this.passiveFaithEvent) {
      this.scene.passiveFaithEvent.destroy();
      this.passiveFaithEvent = false;
    }
  }
}
