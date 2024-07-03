// Length of text must be less than 87 characters to prevent overflow.

const initiateUpgrades = [
  {
    name: "Prayer Efficiency",
    description: "Generate 2 faith per manual prayer.",
    cost: 50,
    active: false,
  },
  {
    name: "Prayer Automation",
    description: `Begins passive faith generation, 1 faith per second.`,
    cost: 20,
    active: false,
  },
  {
    name: "Basic Rituals",
    description:
      "Perform a simple ritual and boost faith generation for 1 minute.",
    cost: 200,
    active: false,
  },
  {
    name: "Recruit Followers",
    description: "Recruit 50 followers who each passively generate 1 faith.",
    cost: 300,
    active: false,
  },
];

const priestessUpgrades = [
  {
    name: "Potent Prayer Types",
    description: "Placeholder text.",
    cost: 100,
    active: false,
  },
  {
    name: "Construct Places of Worship",
    description: "Placeholder text.",
    cost: 200,
    active: false,
  },
];

const highPriestessUpgrades = [
  {
    name: "Rituals",
    description: "Placeholder text.",
    cost: 500,
    active: false,
  },
  {
    name: "Recruitment",
    description: "Ascend to godhood and gain unlimited faith.",
    cost: 1000,
    active: false,
  },
];

const oracleUpgrades = [
  {
    name: "Divine Intervention",
    description: "Placeholder text.",
    cost: 1000,
    active: false,
  },
  {
    name: "Conversions",
    description: "Placeholder text.",
    cost: 2000,
    active: false,
  },
];

const saintUpgrades = [
  {
    name: "Relics & Artifacts",
    description: "Placeholder text.",
    cost: 5000,
    active: false,
  },
];

const demigodUpgrades = [
  {
    name: "Celestial Interventions",
    description: "Placeholder text.",
    cost: 10000,
    active: false,
  },
];

const goddessUpgrades = [
  {
    name: "Transcendence",
    description: "Placeholder text.",
    cost: 100000,
    active: false,
  },
];

export {
  initiateUpgrades,
  priestessUpgrades,
  highPriestessUpgrades,
  oracleUpgrades,
  saintUpgrades,
  demigodUpgrades,
  goddessUpgrades,
};
