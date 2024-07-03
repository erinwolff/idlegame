import { saveGameData } from "./saveGame";
import { loadGameData } from "./loadGame";

export function upgradeButtonPointerEvents(button, upgrade) {
  const background = button.getElement("background");
  const text = button.getElement("text");

  // Clear any existing pointerover/pointerout listeners
  button.off("pointerover");
  button.off("pointerout");

  // Style for activated upgrades
  if (upgrade.active === true) {
    updateActivatedDescriptionStyle(background, text, upgrade);
    button.on("pointerover", () => {
      updateActivatedDescriptionStyle(background, text, upgrade);
    });

    button.on("pointerout", () => {
      upgradeButtonStyleUpdate(button, upgrade);
    });
  } else {
    // Style for unactivated upgrades
    button.on("pointerover", () => {
      updateUnactivatedDescriptionHoverStyle(background, text, upgrade);
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
    updateActivatedNameStyle(background, text, upgrade);
    button.on("pointerover", () => {
      updateActivatedDescriptionStyle(background, text, upgrade);
    });
  } else {
    // Style for unactivated upgrades (or pointerout events)
    updateUnactivatedNameHoverStyle(background, text, upgrade);
    button.on("pointerover", () => {
      updateUnactivatedDescriptionHoverStyle(background, text, upgrade);
    });
  }
}

// Helper function to consolidate activated upgrade name style updates
function updateActivatedNameStyle(background, text, upgrade) {
  background.setFillStyle(0x8bc34a);
  text.setBackgroundColor("#8BC34A");
  text.setText(`${upgrade.name} Activated`);
  background.setStrokeStyle();
  text.setWordWrapWidth(200);
  background.resize(220, 55);
  text.setOrigin(0.05, 0.3);
}

// Helper function to consolidate activated description style updates
function updateActivatedDescriptionStyle(background, text, upgrade) {
  background.setFillStyle(0x8bc34a);
  text.setBackgroundColor("#8BC34A");
  text.setText(`${upgrade.description}`);
  background.setStrokeStyle(1, 0xffffff);
  text.setWordWrapWidth(220);
  background.resize(240, 80);
  text.setOrigin(0.05, 0.4);
}

// Helper function to consolidate unactivated description style updates
function updateUnactivatedDescriptionHoverStyle(background, text, upgrade) {
  background.setFillStyle(0xf4c6c6);
  text.setBackgroundColor("#F4C6C6");
  background.setStrokeStyle(1, 0xffffff);
  text.setText(`Cost: ${upgrade.cost}\n${upgrade.description}`);
  text.setWordWrapWidth(220);
  background.resize(240, 80);
  text.setOrigin(0.05, 0.4);
}

// Helper function to consolidate unactivated name style updates
function updateUnactivatedNameHoverStyle(background, text, upgrade) {
  background.setFillStyle(0xf4c6c6);
  text.setBackgroundColor("#F4C6C6");
  text.setText(upgrade.name);
  background.setStrokeStyle();
  text.setWordWrapWidth(190);
  background.resize(200, 50);
  text.setOrigin(0);
}

export function saveButtonPointerEvents(button, scene) {
  const background = button.getElement("background");
  const text = button.getElement("text");

  button.on("pointerover", () => {
    background.setFillStyle(0x2196f3);
    text.setBackgroundColor("#2196F3");
    background.setStrokeStyle(1, 0xffffff);
  });

  button.on("pointerout", () => {
    background.setFillStyle(0x64b5f6);
    text.setBackgroundColor("#64B5F6");
    background.setStrokeStyle();
  });
  button.on("pointerdown", () => {
    background.setFillStyle(0x64b5f6);
    text.setBackgroundColor("#64B5F6");
    saveGameData(scene);
  });
}

export function loadButtonPointerEvents(
  button,
  scene,
  phaseUpgrades,
  topbar,
  upgradeButtons
) {
  const background = button.getElement("background");
  const text = button.getElement("text");

  button.on("pointerover", () => {
    background.setFillStyle(0xffff66);
    text.setBackgroundColor("#FFFF66");
    background.setStrokeStyle(1, 0xffffff);
  });

  button.on("pointerout", () => {
    background.setFillStyle(0xffff99);
    text.setBackgroundColor("#FFFF99");
    background.setStrokeStyle();
  });

  button.on("pointerdown", () => {
    background.setFillStyle(0xffff99);
    text.setBackgroundColor("#FFFF99");
    loadGameData(scene, phaseUpgrades, topbar, upgradeButtons);
  });
}

export function restartButtonPointerEvents(button, resetGameFunction) {
  const background = button.getElement("background");
  const text = button.getElement("text");
  button.on("pointerover", () => {
    background.setFillStyle(0xf30103);
    text.setBackgroundColor("#F30103");
    background.setStrokeStyle(1, 0xffffff);
  });
  button.on("pointerout", () => {
    background.setFillStyle(0xdd9292);
    text.setBackgroundColor("#DD9292");
    background.setStrokeStyle();
  });
  button.on("pointerdown", () => {
    resetGameFunction();
  });
}
