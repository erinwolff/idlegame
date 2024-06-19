import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import PreloadScene from "./scenes/preloadScene.js";
import CreateScene from "./scenes/createScene.js";
import UpdateScene from "./scenes/updateScene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "100%",
    height: "100%",
  },
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI",
      },
    ],
  },
  scene: [PreloadScene, CreateScene, UpdateScene],
};

var game = new Phaser.Game(config);
