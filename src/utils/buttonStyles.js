export function pointerEventStyleUpdates(button, upgrade) {
  const background = button.getElement("background");
  const text = button.getElement("text");

  // Clear any existing pointerover/pointerout listeners
  button.off("pointerover");
  button.off("pointerout");

  // Style for activated upgrades
  if (upgrade.active) {
    button.on("pointerover", () => {
      background.setFillStyle(0x8bc34a);
      text.setBackgroundColor("#8BC34A");
      text.setText(`${upgrade.description}`);
      background.setStrokeStyle(1, 0xffffff);
      text.setWordWrapWidth(220);
      background.resize(240, 80);
      text.setOrigin(0.05, 0.4);
    });

    button.on("pointerout", () => {
      upgradeButtonStyleUpdate(button, upgrade);
    });
  } else {
    // Style for unactivated upgrades
    button.on("pointerover", () => {
      background.setFillStyle(0xf4c6c6);
      text.setBackgroundColor("#F4C6C6");
      background.setStrokeStyle(1, 0xffffff);
      text.setText(`Cost: ${upgrade.cost}\n${upgrade.description}`);
      text.setWordWrapWidth(220);
      background.resize(240, 80);
      text.setOrigin(0.05, 0.4);
    });

    button.on("pointerout", () => {
      upgradeButtonStyleUpdate(button, upgrade); // Go back to the initial style
    });
  }
}

export function upgradeButtonStyleUpdate(button, upgrade) {
  const background = button.getElement("background");
  const text = button.getElement("text");

  if (upgrade.active === true) {
    // Style for activated upgrades
    background.setFillStyle(0x8bc34a);
    text.setBackgroundColor("#8BC34A");
    text.setText(`${upgrade.name} Activated`);
    background.setStrokeStyle();
    text.setWordWrapWidth(200);
    background.resize(220, 55);
    text.setOrigin(0.05, 0.3);
    button.on("pointerover", () => {
      background.setFillStyle(0x8bc34a);
      text.setBackgroundColor("#8BC34A");
      text.setText(`${upgrade.description}`);
      background.setStrokeStyle(1, 0xffffff);
      text.setWordWrapWidth(220);
      background.resize(240, 80);
      text.setOrigin(0.05, 0.4);
    });
  } else {
    // Style for unactivated upgrades (or pointerout events)
    background.setFillStyle(0xf4c6c6);
    text.setBackgroundColor("#F4C6C6");
    text.setText(upgrade.name);
    background.setStrokeStyle();
    text.setWordWrapWidth(190);
    background.resize(200, 50);
    text.setOrigin(0);
    button.on("pointerover", () => {
      background.setFillStyle(0xf4c6c6);
      text.setBackgroundColor("#F4C6C6");
      background.setStrokeStyle(1, 0xffffff);
      text.setText(`Cost: ${upgrade.cost}\n${upgrade.description}`);
      text.setWordWrapWidth(220);
      background.resize(240, 80);
      text.setOrigin(0.05, 0.4);
    });
  }
}
