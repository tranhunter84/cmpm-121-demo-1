// ===================================
// BASIC APP HEADERS & STYLING
import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hunter's amazing game!!";                           // Page title
document.title = gameName;

const header = document.createElement("h1");                          // Header 
header.innerHTML = gameName;
app.append(header);


// ===================================
// INITIALIZATION OF CORE VARIABLES 
let lanternCounter: number = 0,                                       // Track current total clicks & growth rate     
  lanternGrowthRate: number = 0;
const upgradePurchaseCounts = {                                       // Dictionary of counters for # of purchases made 
  upgrade1: 0,                                                          // for each of the upgrade options
  upgrade2: 0,
  upgrade3: 0,
};
const costs = { upgrade1: 10, upgrade2: 100, upgrade3: 1000 };        // Track current costs of each upgrade
let timeStamp: number = 0;


// ===================================
// PAGE ELEMENTS FOR STATE-TRACKING
const reportedCount = document.createElement("div");                  // DIVs to report different states to user
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
function updateReportedGamestate() {                                  // Updates page elements for tracking gamestate
  reportedCount.innerHTML = lanternCounter.toFixed(2) + " Jack-o'-Lanterns!";
  reportedGrowth.innerHTML =
    "Current growth rate: " + lanternGrowthRate.toFixed(1) + " Jack-o'-Lanterns/sec";
  reportedPurchases.innerHTML =
    "Current purchases: [lv.1: " +
    upgradePurchaseCounts["upgrade1"] +
    ", lv.2: " +
    upgradePurchaseCounts["upgrade2"] +
    ", lv.3: " +
    upgradePurchaseCounts["upgrade3"] +
    "]";
  purchasableUpgrades.innerHTML =
    "PURCHASABLE UPGRADES:" +
    "<br />" +
    "Growth Rate Upgrade lv. 1 | Cost: " +
    costs["upgrade1"] +
    " Jack-o'-Lanterns" +
    "<br />" +
    "Growth Rate Upgrade lv. 2 | Cost: " +
    costs["upgrade2"] +
    " Jack-o'-Lanterns" +
    "<br />" +
    "Growth Rate Upgrade lv. 3 | Cost: " +
    costs["upgrade3"] +
    " Jack-o'-Lanterns";
}

function updateCounter(timestamp: number) {                           // Allows upgrades to increase counter using animation frames
  if (timeStamp) {                                                    
    const elapsed = timestamp - timeStamp;  
    lanternCounter += (lanternGrowthRate * elapsed) / 1000;
    updateReportedGamestate();
    updateButtonStatus();
  }
  timeStamp = timestamp;
  requestAnimationFrame(updateCounter); // Loop
}

function updateButtonStatus() {                                       // Keeps purchase upgrade buttons statuses updated               
  const upgrades = [                                                    // with current costs of each upgrade
    { button: upgradeButton1, cost: costs["upgrade1"] },
    { button: upgradeButton2, cost: costs["upgrade2"] },              // Buttons with costs > user's current count set to DISABLED
    { button: upgradeButton3, cost: costs["upgrade3"] },                // Otherwise set to ENABLED
  ];
  upgrades.forEach(({ button, cost }) => {
    button.disabled = lanternCounter < cost;
  });
}

function createUpgradeButton(                                         // Creates an upgrade button with given:
  label: string,                                                        // 1. label, 2. initial growth rate, 3. upgrade dict key
  growth: number,
  upgradeKey: keyof typeof upgradePurchaseCounts,
) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.disabled = true;
  button.onclick = () => {
    if (lanternCounter >= costs[upgradeKey]) {
      lanternCounter -= costs[upgradeKey];
      lanternGrowthRate += growth;
      upgradePurchaseCounts[upgradeKey] += 1;
      costs[upgradeKey] = Math.round(costs[upgradeKey] * 1.15 * 100) / 100;
      updateReportedGamestate();
      updateButtonStatus();
    }
  };
  return button;
}


// ===================================
// MAIN PROGRAM
requestAnimationFrame(updateCounter);                                 // Request animation frame for updateCounter()
updateReportedGamestate();                                            // Initializng page elements for tracking gamestate

// Create page buttons
const upgradeButton1 = createUpgradeButton(                           // 3 upgrade buttons with different levels
  "Buy growth rate upgrade lv. 1",                                      // of increase in growth rate
  0.1,
  "upgrade1",
);
const upgradeButton2 = createUpgradeButton(
  "Buy growth rate upgrade lv. 2",
  2,
  "upgrade2",
);
const upgradeButton3 = createUpgradeButton(
  "Buy growth rate upgrade lv. 3",
  50,
  "upgrade3",
);
const clicksButton = document.createElement("button");                // Main button to increase count with mouse clicks
clicksButton.innerHTML = "BOO! Click me! 🎃";
clicksButton.onclick = () => {
  lanternCounter += 1;
  updateReportedGamestate(); 
};

app.append(clicksButton);
app.append(upgradeButton1);
app.append(upgradeButton2);
app.append(upgradeButton3);