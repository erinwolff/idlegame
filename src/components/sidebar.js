import "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export default class Sidebar extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);
    this.scene = scene;

    this.setSize(width, height);
    this.scene.add.existing(this);

    const sizer = this.scene.rexUI.add
      .sizer({
        orientation: "y",
        width,
        height,
      })
      .addBackground(
        this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xcc3a33)
      );

    this.add(sizer);

    // Input text box for the player to name their priest
    const inputText = this.scene.add.rexInputText(0, 0, 240, 50, {
      type: "text",
      placeholder: "Name Your Acolyte",
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#DD9292",
      fontFamily: "Lato",
      borderRadius: "10px",
      maxLength: 20,
      paddingLeft: "10px",
      tooltip: "Your acolyte's name",
    });

    sizer.add(inputText, 0, "center", {
      top: 1040,
      left: 270,
      right: 10,
    });

    // Label to display the player's progression path status
    const progressionLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        0, // X position
        0, // Y position
        240, // Width
        50, // Height
        10, // Border radius
        0xdd9292 // Background color
      ),
      width: 240,
      height: 50,
      text: this.scene.add.text(0, 0, "Status", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
      space: { left: 10 },
    });

    sizer.add(progressionLabel, 0, "center", {
      top: 20,
      left: 270,
      right: 10,
    });

    // Input to display player's worship details
    const worshipInput = this.scene.add.rexInputText(0, 0, 240, 50, {
      type: "text",
      placeholder: "Choose Your Worship",
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#DD9292",
      fontFamily: "Lato",
      borderRadius: "10px",
      maxLength: 20,
      paddingLeft: "10px",
      tooltip: "Your choice of worship",
    });

    sizer.add(worshipInput, 0, "center", {
      top: 20,
      left: 270,
      right: 10,
    });

    // Input to display player's available upgrades
    const upgradesLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        0,
        0,
        240,
        50,
        10,
        0xdd9292
      ),
      width: 240,
      height: 50,
      text: this.scene.add.text(0, 0, "Upgrades", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
      space: { left: 10 },
    });

    sizer.add(upgradesLabel, 0, "center", {
      top: 20,
      left: 270,
      right: 10,
    });

    sizer.layout();
  }
}
