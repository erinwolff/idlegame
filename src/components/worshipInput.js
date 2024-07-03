export function worshipInput(scene, sizer) {
  const worshipInput = scene.add.rexInputText(0, 0, 240, 50, {
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
    autoComplete: "off",
  });

  sizer.add(worshipInput, 0, "center", {
    top: 20,
    left: 270,
    right: 10,
  });

  return worshipInput;
}
