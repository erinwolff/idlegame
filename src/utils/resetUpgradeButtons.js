import { getCurrentPhaseUpgrades } from "./getCurrentPhaseUpgrades";

export function resetUpgradeButtons(currentPhase) {
  const upgrades = getCurrentPhaseUpgrades(currentPhase);
  upgrades.forEach((upgrade) => {
    upgrade.active = false;
  });
}
