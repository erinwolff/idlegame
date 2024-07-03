import { saveButtonPointerEvents } from "../utils/buttonStyles";

export function saveButton(scene, sizer) {
  const save = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(
      0, // X position
      0, // Y position
      240, // Width
      50, // Height
      10, // Border radius
      0x64b5f6 // Background color
    ),
    width: 240,
    height: 50,
    text: scene.add.text(0, 0, "Save Game", {
      fontSize: "20px",
      color: "#000000",
      fontFamily: "Lato",
      backgroundColor: "#64B5F6",
    }),
    space: { left: 10 },
  });

  sizer.add(save, 0, "center", {
    top: 15,
    left: 270,
    right: 10,
  });

  save.setInteractive({ useHandCursor: true });

  saveButtonPointerEvents(save);

  return save;
}
