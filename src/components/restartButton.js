import { restartButtonPointerEvents } from "../utils/buttonStyles";

export function restartButton(scene, sizer, resetGameFunction) {
  const restart = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(
      0, // X position
      0, // Y position
      240, // Width
      50, // Height
      10, // Border radius
      0xdd9292 // Background color
    ),
    width: 240,
    height: 50,
    text: scene.add.text(0, 0, "Restart Game", {
      fontSize: "20px",
      color: "#000000",
      fontFamily: "Lato",
      backgroundColor: "#DD9292",
    }),
    space: { left: 10 },
  });

  sizer.add(restart, 0, "center", {
    top: 15,
    left: 270,
    right: 10,
  });

  restart.setInteractive({ useHandCursor: true });

  restartButtonPointerEvents(restart, resetGameFunction);

  return restart;
}
