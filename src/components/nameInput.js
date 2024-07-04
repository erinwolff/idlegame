export function nameInput(scene, sizer, playerName) {
  const name = scene.add.rexInputText(0, 0, 240, 50, {
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
    autoComplete: "off",
    text: playerName,
  });

  sizer.add(name, 0, "center", {
    top: 1040,
    left: 270,
    right: 10,
  });

  return name;
}
