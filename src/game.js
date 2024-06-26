import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin.js";
import WebFontLoaderPlugin from "phaser3-rex-plugins/plugins/webfontloader-plugin.js";
import PreloadScene from "./scenes/preloadScene.js";
import CreateScene from "./scenes/createScene.js";
import UpdateScene from "./scenes/updateScene.js";

const divId = "game-container";

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
  parent: divId,
  fullscreenTarget: divId,
  dom: {
    createContainer: true,
  },
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false,
    debug: true,
  },
  plugins: {
    global: [
      {
        key: "rexInputTextPlugin",
        plugin: InputTextPlugin,
        start: true,
      },
      {
        key: "rexWebFontLoader",
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
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
