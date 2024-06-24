import "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export default class Topbar extends Phaser.GameObjects.Container {
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
      .addBackground(this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0));

    this.add(sizer);

    // Label to display the player's total number of followers
    const followersLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        90, // X position
        10, // Y position
        200, // Width
        30, // Height
        10, // Border radius
        0xdd9292 // Background color
      ),
      text: this.scene.add.text(0, 0, "Number of Followers", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
    });
    followersLabel.x = 1400;

    // Label to display the player's total Faith currency
    const faithLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        105, // X position
        10, // Y position
        230, // Width
        30, // Height
        10, // Border radius
        0xdd9292 // Background color
      ),
      text: this.scene.add.text(0, 0, "Faith Currency Amount", {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
    });
    faithLabel.x = 1615;

    // Add labels to the sizer or directly to the scene depending on your layout needs
    this.add(followersLabel);
    this.add(faithLabel);

    sizer.layout();
  }
}
