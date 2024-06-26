import "phaser3-rex-plugins/templates/ui/ui-plugin.js";

export default class Topbar extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, initialFaith) {
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
    this.faithLabel = this.scene.rexUI.add.label({
      background: this.scene.rexUI.add.roundRectangle(
        105, // X position
        10, // Y position
        230, // Width
        30, // Height
        10, // Border radius
        0xdd9292 // Background color
      ),
      text: this.scene.add.text(0, 0, `Total Faith: ${initialFaith}`, {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
      }),
    });
    this.faithLabel.x = 1615;

    // Add labels to the sizer or directly to the scene depending on your layout needs
    this.add(followersLabel);
    this.add(this.faithLabel);

    sizer.layout();
  }
  updateFaithLabel(newFaith) {
    let textObject = this.faithLabel.getElement("text");
    textObject.setText(`Total Faith: ${newFaith}`);
  }
}
