// function to get the current phase of the game based on the amount of faith the player has accumulated
export function getCurrentPhase(totalFaith) {
  if (totalFaith <= 10000) {
    return "Initiate";
  } else if (totalFaith <= 50000 && totalFaith > 10000) {
    return "Priestess";
  } else if (totalFaith <= 100000 && totalFaith > 50000) {
    return "High Priestess";
  } else if (totalFaith <= 500000 && totalFaith > 100000) {
    return "Saint";
  } else if (totalFaith <= 1000000 && totalFaith > 500000) {
    return "Demigod";
  } else if (totalFaith <= 50000000 && totalFaith > 1000000) {
    return "Goddess";
  } else {
    return "";
  }
}
