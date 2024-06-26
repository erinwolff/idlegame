import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default class CreateScene extends Phaser.Scene {
  constructor() {
    super("CreateScene");
  }

  create() {
    let scaleX =
      this.cameras.main.width /
      this.textures.get("acolyteBackground").getSourceImage().width;
    let scaleY =
      this.cameras.main.height /
      this.textures.get("acolyteBackground").getSourceImage().height;

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

    const acolyte = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "acolyte"
    );
    acolyte.setOrigin(0.5, 0.2);
    acolyte.setScale(0.3);
    acolyte.setDepth(5);
    acolyte.setInteractive({ useHandCursor: true });

    const sidebar = new Sidebar(this, 0, 0, 400, 2000);
    this.topbar = new Topbar(this, 0, 20, 4000, 45, this.totalFaith);

    acolyte.on("pointerdown", () => {
      this.totalFaith += 1;
      this.topbar.updateFaithLabel(this.totalFaith);
    });
  }
}
