import { upgradeButtonStyleUpdate } from "./buttonStyles";

export function loadGameData(scene, upgrades, topbar, upgradeButtons) {
  const saveData = JSON.parse(localStorage.getItem("mySaveData"));
  if (saveData) {
    scene.totalFollowers = saveData.totalFollowers;
    scene.totalFaith = saveData.totalFaith;
    scene.currentPhase = saveData.currentPhase;
    // scene.sidebar.worshipInput.setText(saveData.worshipName);
    scene.sidebar.nameInput.setText(saveData.playerName);

    // Reactivate upgrades based on saved data
    if (saveData.upgrades) {
      upgrades.forEach((upgrade, index) => {
        const savedUpgrade = saveData.upgrades.find(
          (u) => u.name === upgrade.name
        );
        if (savedUpgrade && savedUpgrade.active) {
          upgrade.active = true;
          upgradeButtonStyleUpdate(upgradeButtons[index], upgrade); // Update button style

          // Restart Prayer Efficiency upgrade
          if (upgrade.name === "Prayer Efficiency") {
            scene.acolyte.off("pointerdown");
            scene.acolyte.on("pointerdown", () => {
              if (upgrade.active === true) {
                scene.totalFaith += 2;
              } else {
                scene.totalFaith += 1;
              }
              topbar.updateFaithLabel(scene.totalFaith);
            });
          }

          // Restart passive faith generation if needed
          if (upgrade.name === "Prayer Automation") {
            // restart prayerAutomationFaithEvent
            scene.prayerAutomationFaithEvent = scene.time.addEvent({
              delay: 1000, // 1 seconds
              callback: () => {
                if (upgrade.active) {
                  scene.totalFaith++;
                  topbar.updateFaithLabel(scene.totalFaith);
                }
              },
              loop: true,
            });
          }
          if (upgrade.name === "Basic Rituals") {
            // restart basicRitualsFaithEvent
            scene.basicRitualsFaithEvent = scene.time.addEvent({
              delay: 50, // .05 seconds
              callback: () => {
                scene.totalFaith++;
                topbar.updateFaithLabel(scene.totalFaith);
              },
              loop: true,
            });
            scene.time.delayedCall(60000, () => {
              scene.basicRitualsFaithEvent.remove();
              scene.basicRitualsFaithEvent = null;
              upgrade.active = false;
              upgradeButtonStyleUpdate(upgradeButtons[index], upgrade);
            });
          }
          if (upgrade.name === "Recruit Followers") {
            //restart recruitFollowersFaithEvent
            scene.recruitFollowersFaithEvent = scene.time.addEvent({
              delay: 1000, // 1 second
              callback: () => {
                if (upgrade.active) {
                  scene.totalFaith += 50;
                  topbar.updateFaithLabel(scene.totalFaith);
                }
              },
              loop: true,
            });
          }
        }
      });
    }
    topbar.updateFaithLabel(scene.totalFaith);
    topbar.updateFollowersLabel(scene.totalFollowers);
    // ... load other game data
  }
}
