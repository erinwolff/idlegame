import { getCurrentPhaseUpgrades } from "./getCurrentPhaseUpgrades";

export function saveGameData(scene) {
  const upgrades = getCurrentPhaseUpgrades(scene.currentPhase);
  const saveData = {
    totalFollowers: scene.totalFollowers,
    totalFaith: scene.totalFaith,
    currentPhase: scene.currentPhase,
    upgrades: upgrades.map((upgrade) => ({
      name: upgrade.name,
      active: upgrade.active,
    })),
  };
  localStorage.setItem("mySaveData", JSON.stringify(saveData));
}
