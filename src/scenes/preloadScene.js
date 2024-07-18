import { phaseData } from "../constants/phaseData";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    phaseData.forEach((phase) => {
      this.load.image(
        phase.backgroundKey,
        `src/assets/${phase.backgroundKey}.jpg`
      );
      this.load.image(phase.spritePhase, `src/assets/${phase.spritePhase}.png`);
    });
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
