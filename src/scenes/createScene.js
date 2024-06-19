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

    const acolyte = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "acolyte"
    );
    acolyte.setOrigin(0.5, 0.2);
    acolyte.setScale(0.3);

    const sidebar = this.rexUI.add
      .sizer({
        orientation: "x",
        x: 0,
        y: 0,
        width: 400,
        height: 2000,
      })
      .addBackground(this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xcc3a33));
    sidebar.layout();
  }
}
