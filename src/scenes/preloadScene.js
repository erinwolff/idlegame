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
    this.load.plugin(
      "rexbbcodetextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js",
      true
    );
  }

  create() {
    this.scene.start("CreateScene");
  }
}
