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
    this.followersTotalDisplay = this.scene.add.rexBBCodeText(
      0,
      0,
      "Number of Followers",
      {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
        wrap: {
          mode: "char",
          width: 230,
        },
        backgroundCornerRadius: 10,
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      }
    );
    this.followersTotalDisplay.x = 1350;

    // Label to display the player's total Faith currency
    this.faithCurrencyDisplay = this.scene.add.rexBBCodeText(
      0,
      0,
      `Faith: ${initialFaith}`,
      {
        fontSize: "20px",
        color: "#000000",
        fontFamily: "Lato",
        backgroundColor: "#DD9292",
        wrap: {
          mode: "char",
          width: 230,
        },
        backgroundCornerRadius: 10,
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      }
    );
    this.faithCurrencyDisplay.x = 1600;

    // Add labels to the sizer or directly to the scene depending on your layout needs
    this.add(this.followersTotalDisplay);
    this.add(this.faithCurrencyDisplay);

    sizer.layout();
  }
  updateFaithLabel(newFaith) {
    this.faithCurrencyDisplay.setText(`Faith: ${newFaith}`);
  }
}
