import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hunter's amazing game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter and growth rate variables
let clicksCounter: number = 0,
  growthRate: number = 0;

// Counter variables for upgrade purchases made
// let upgrade1Count: number = 0, upgrade2Count: number = 0, upgrade3Count: number = 0;
const upgradeCounts = {
  upgrade1: 0,
  upgrade2: 0,
  upgrade3: 0,
};

const costs = { upgrade1: 10, upgrade2: 100, upgrade3: 1000 };

// Add DIVs to report different values to the user
// (ex. Current Clicks Count, Growth Rate, etc.)
const reportedCount = document.createElement("div");
const reportedGrowth = document.createElement("div");
const reportedPurchases = document.createElement("div");
app.append(reportedCount);
app.append(reportedGrowth);
app.append(reportedPurchases);

// Function to keep the DIVs updated with current values
function updateReportedValues() {
  reportedCount.innerHTML = clicksCounter.toFixed(2) + " Jack-o'-Lanterns!";
  reportedGrowth.innerHTML =
    "Current growth rate: " + growthRate.toFixed(1) + " Jack-o'-Lanterns/sec";
  reportedPurchases.innerHTML =
    "Current purchases: [lv.1: " +
    upgradeCounts["upgrade1"] +
    ", lv.2: " +
    upgradeCounts["upgrade2"] +
    ", lv.3: " +
    upgradeCounts["upgrade3"] +
    "]";
}
updateReportedValues();

// 3 Upgrade buttons for increasing growth rate
// Helper function to create an upgrade button
function createUpgradeButton(
  label: string,
  initialCost: number,
  growth: number,
  upgradeKey: keyof typeof upgradeCounts,
) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.disabled = true;
  button.onclick = () => {
    if (clicksCounter >= costs[upgradeKey]) {
      clicksCounter -= costs[upgradeKey];
      growthRate += growth;
      upgradeCounts[upgradeKey] += 1;
      costs[upgradeKey] = Math.floor(costs[upgradeKey] * 1.15);
      updateReportedValues();
      updateUpgradeButtons();
    }
  };
  return button;
}

// Define individual upgrade buttons using the respective upgrade counts
const upgradeButton1 = createUpgradeButton(
  "Buy growth rate upgrade lv. 1 (Cost: 10 Jack-o'-Lanterns)",
  10,
  0.1,
  "upgrade1",
);

const upgradeButton2 = createUpgradeButton(
  "Buy growth rate upgrade lv. 2 (Cost: 100 Jack-o'-Lanterns)",
  100,
  2,
  "upgrade2",
);

const upgradeButton3 = createUpgradeButton(
  "Buy growth rate upgrade lv. 3 (Cost: 1000 Jack-o'-Lanterns)",
  1000,
  50,
  "upgrade3",
);

// Basic button that increases the counter for every click
const clicksButton = document.createElement("button");
clicksButton.innerHTML = "BOO! Click me! 🎃";
clicksButton.onclick = () => {
  clicksCounter += 1;
  updateReportedValues(); // Updates the DIV with new counter value
};

// Adding the buttons
app.append(clicksButton);
app.append(upgradeButton1);
app.append(upgradeButton2);
app.append(upgradeButton3);

function updateUpgradeButtons() {
  const upgrades = [
    { button: upgradeButton1, cost: costs["upgrade1"] },
    { button: upgradeButton2, cost: costs["upgrade2"] },
    { button: upgradeButton3, cost: costs["upgrade3"] },
  ];

  upgrades.forEach(({ button, cost }) => {
    button.disabled = clicksCounter < cost;
  });

  //upgradeButton1.innerHTML = "Buy growth rate upgrade lv. 1 (Cost: " +costs['upgrade1']+ " Jack-o'-Lanterns)";
  //upgradeButton2.innerHTML = "Buy growth rate upgrade lv. 2 (Cost: " +costs['upgrade2']+ " Jack-o'-Lanterns)";
  //upgradeButton3.innerHTML = "Buy growth rate upgrade lv. 3 (Cost: " +costs['upgrade3']+ " Jack-o'-Lanterns)";
}

// Update counter based on animation frame
// Counter increments by fractional amount (1 sec -> 1 unit)
let timeStamp: number = 0;
function updateCounter(timestamp: number) {
  if (timeStamp) {
    const elapsed = timestamp - timeStamp;
    clicksCounter += (growthRate * elapsed) / 1000;
    updateReportedValues();
    updateUpgradeButtons();
  }
  timeStamp = timestamp;
  requestAnimationFrame(updateCounter); // Loop
}
requestAnimationFrame(updateCounter);
