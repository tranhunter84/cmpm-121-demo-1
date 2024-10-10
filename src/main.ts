// ===================================
// BASIC APP HEADERS & STYLING
import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jack-O'-Lantern Clicker!!"; // Page title
document.title = gameName;

const header = document.createElement("h1"); // Header
header.innerHTML = gameName;
app.append(header);

// ===================================
// INITIALIZATION OF CORE VARIABLES
let lanternCounter: number = 0, // Track current total clicks & growth rate
  lanternGrowthRate: number = 0;
let timeStamp: number = 0;
interface Item {  // Define new interface
  name: string,
  cost: number,
  rate: number,
  sold: number
};
const availableItems : Item[] = [ 
  {name: "seeds", cost: 10, rate: 0.1, sold: 0},
  {name: "patch", cost: 100, rate: 2, sold: 0},
  {name: "farm", cost: 1000, rate: 50, sold: 0},
];

// ===================================
// PAGE ELEMENTS FOR STATE-TRACKING
const reportedCount = document.createElement("div"); // DIVs to report different states to user
const reportedGrowth = document.createElement("div");
const reportedPurchases = document.createElement("div");
const purchasableUpgrades = document.createElement("div");
app.appendChild(document.createElement("div")).innerHTML = "🎃";
app.append(reportedCount);
app.append(reportedGrowth);
app.append(reportedPurchases);
app.append(purchasableUpgrades);

// ===================================
// HELPER FUNCTIONS
function updateReportedGamestate() {
  // Updates page elements for tracking gamestate
  reportedCount.innerHTML = lanternCounter.toFixed(2) + " Jack-o'-Lanterns!";
  reportedGrowth.innerHTML =
    "Current growth rate: " +
    lanternGrowthRate.toFixed(1) +
    " Jack-o'-Lanterns/sec";
  reportedPurchases.innerHTML =
    "Current purchases: [lv.1: " +
    availableItems[0]['sold'] +
    ", lv.2: " +
    availableItems[1]['sold'] +
    ", lv.3: " +
    availableItems[2]['sold'] +
    "]";
  purchasableUpgrades.innerHTML =
    "PURCHASABLE UPGRADES:" +
    "<br />" +
    "Growth Rate Upgrade lv. 1 | Cost: " +
    availableItems[0]["cost"] +
    " Jack-o'-Lanterns" +
    "<br />" +
    "Growth Rate Upgrade lv. 2 | Cost: " +
    availableItems[1]["cost"] +
    " Jack-o'-Lanterns" +
    "<br />" +
    "Growth Rate Upgrade lv. 3 | Cost: " +
    availableItems[2]["cost"] +
    " Jack-o'-Lanterns";
}

function updateCounter(timestamp: number) {
  // Allows upgrades to increase counter using animation frames
  if (timeStamp) {
    const elapsed = timestamp - timeStamp;
    lanternCounter += (lanternGrowthRate * elapsed) / 1000;
    updateReportedGamestate();
    updateButtonStatus();
  }
  timeStamp = timestamp;
  requestAnimationFrame(updateCounter); // Loop
}

function updateButtonStatus() {
  // Keeps purchase upgrade buttons statuses updated
  const upgrades = [
    // with current costs of each upgrade
    { button: upgradeButton1, cost: availableItems[0]["cost"] },
    { button: upgradeButton2, cost: availableItems[1]["cost"] }, // Buttons with costs > user's current count set to DISABLED
    { button: upgradeButton3, cost: availableItems[2]["cost"] }, // Otherwise set to ENABLED
  ];
  upgrades.forEach(({ button, cost }) => {
    button.disabled = lanternCounter < cost;
  });
}

function createUpgradeButton( // Creates an upgrade button with given:
  label: string, // 1. label, 2. initial growth rate, 3. availableItems integer index
  growth: number,
  index: number
) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.disabled = true;
  button.onclick = () => {
    if (lanternCounter >= availableItems[index]['cost']) {
      lanternCounter -= availableItems[index]['cost'];
      lanternGrowthRate += growth;
      availableItems[index]['sold'] = availableItems[index]['sold'] + 1;
      availableItems[index]['cost'] = Math.round(availableItems[index]['cost'] * 1.15 * 100) / 100;
      updateReportedGamestate();
      updateButtonStatus();
    }
  };
  return button;
}

// ===================================
// MAIN PROGRAM
requestAnimationFrame(updateCounter); // Request animation frame for updateCounter()
updateReportedGamestate(); // Initializng page elements for tracking gamestate

// Create page buttons
const upgradeButton1 = createUpgradeButton(
  // 3 upgrade buttons with different levels
  "BUY LV.1 UPGRADE - busshel of pumpkin seeds", // of increase in growth rate
  0.1,
  0,
);
const upgradeButton2 = createUpgradeButton(
  "BUY LV.2 UPGRADE - pumpkin patch",
  2,
  1,
);
const upgradeButton3 = createUpgradeButton(
  "BUY LV.3 UPGRADE - huge pumpkin farm",
  50,
  2,
);
const clicksButton = document.createElement("button"); // Main button to increase count with mouse clicks
clicksButton.style.backgroundImage = "url('images/jackolantern.png')";
clicksButton.style.backgroundSize = "contain";
clicksButton.style.backgroundRepeat = "no-repeat";
clicksButton.style.backgroundPosition = "center";
clicksButton.style.width = "200px";
clicksButton.style.height = "100px";
clicksButton.style.border = "none";
clicksButton.style.cursor = "pointer";
clicksButton.style.color = "white";
clicksButton.style.fontSize = "16px";
clicksButton.style.textAlign = "center";
clicksButton.innerHTML = "BOO! Click me!";
clicksButton.style.paddingTop = "70px";
clicksButton.onclick = () => {
  lanternCounter += 1;
  updateReportedGamestate();
};

app.append(clicksButton);
app.append(upgradeButton1);
app.append(upgradeButton2);
app.append(upgradeButton3);