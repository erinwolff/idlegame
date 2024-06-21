export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("acolyte", "src/assets/acolyte.png");
    this.load.image("acolyteBackground", "src/assets/acolyte_bg.jpeg");
    this.load.rexWebFont({
      google: {
        families: ["Lato"],
      },
    });
  }

  create() {
    this.scene.start("CreateScene");
  }
}
