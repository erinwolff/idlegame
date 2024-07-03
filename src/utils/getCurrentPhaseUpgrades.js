import {
  initiateUpgrades,
  priestessUpgrades,
  highPriestessUpgrades,
  oracleUpgrades,
  saintUpgrades,
  demigodUpgrades,
  goddessUpgrades,
} from "../constants/upgrades";

export function getCurrentPhaseUpgrades(currentPhase) {
  if (currentPhase === "Initiate") {
    return initiateUpgrades;
  }
  if (currentPhase === "Priestess") {
    return priestessUpgrades;
  }
  if (currentPhase === "High Priestess") {
    return highPriestessUpgrades;
  }
  if (currentPhase === "Oracle") {
    return oracleUpgrades;
  }
  if (currentPhase === "Saint") {
    return saintUpgrades;
  }
  if (currentPhase === "Demigod") {
    return demigodUpgrades;
  }
  if (currentPhase === "Goddess") {
    return goddessUpgrades;
  } else {
    return [];
  }
}
