export function upgradesLabel(scene, sizer) {
  const upgrades = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 240, 50, 10, 0xdd9292),
    width: 240,
    height: 50,
    text: scene.add.text(0, 0, "Upgrades", {
      fontSize: "20px",
      color: "#000000",
      fontFamily: "Lato",
      backgroundColor: "#DD9292",
    }),
    space: { left: 10 },
  });

  sizer.add(upgrades, 0, "center", {
    top: 20,
    left: 270,
    right: 10,
  });

  return upgrades;
}
