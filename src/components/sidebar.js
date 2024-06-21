import "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export default class Sidebar extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);
    this.scene = scene;

    this.setSize(width, height);
    this.scene.add.existing(this);

    const sizer = this.scene.rexUI.add
      .sizer({
        orientation: "x",
        width,
        height,
      })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xcc3a33)
      );

    const inputText = this.scene.add.rexInputText(0, 0, 240, 50, {
      type: "text",
      placeholder: "Name Your Priest",
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#DD9292",
      fontFamily: "Lato",
      borderRadius: "10px",
      maxLength: 20,
    });

    sizer.add(inputText, 0, "center", {
      top: 100,
      bottom: 20,
      left: 270,
      right: 10,
    });

    this.add(sizer);
    sizer.layout();
  }
}
