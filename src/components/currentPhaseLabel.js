export function currentPhaseLabel(scene, sizer, currentPhase) {
  const currentPhaseLabel = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(
      0, // X position
      0, // Y position
      200, // Width
      50, // Height
      10, // Border radius
      0xf4c6c6 // Background color
    ),
    width: 200,
    height: 50,
    text: scene.add.text(0, 0, `${currentPhase}`, {
      fontSize: "18px",
      color: "#000000",
      fontFamily: "Lato",
      backgroundColor: "#F4C6C6",
      padding: {
        left: 5,
      },
    }),
  });

  sizer.add(currentPhaseLabel, 0, "center", {
    top: 20,
    left: 270,
    right: 10,
  });

  return currentPhaseLabel;
}
