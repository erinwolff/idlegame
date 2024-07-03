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
  if (currentPhase === "initiate") {
    return initiateUpgrades;
  }
  if (currentPhase === "priestess") {
    return priestessUpgrades;
  }
  if (currentPhase === "highPriestess") {
    return highPriestessUpgrades;
  }
  if (currentPhase === "oracle") {
    return oracleUpgrades;
  }
  if (currentPhase === "saint") {
    return saintUpgrades;
  }
  if (currentPhase === "demigod") {
    return demigodUpgrades;
  }
  if (currentPhase === "goddess") {
    return goddessUpgrades;
  } else {
    return [];
  }
}
