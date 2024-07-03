import { loadButtonPointerEvents } from "../utils/buttonStyles";

export function loadButton(scene, sizer) {
  const load = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(
      0, // X position
      0, // Y position
      240, // Width
      50, // Height
      10, // Border radius
      0xffff99 // Background color
    ),
    width: 240,
    height: 50,
    text: scene.add.text(0, 0, "Load Game", {
      fontSize: "20px",
      color: "#000000",
      fontFamily: "Lato",
      backgroundColor: "#FFFF99",
    }),
    space: { left: 10 },
  });

  sizer.add(load, 0, "center", {
    top: 30,
    left: 270,
    right: 10,
  });

  load.setInteractive({ useHandCursor: true });

  loadButtonPointerEvents(load);

  return load;
}
