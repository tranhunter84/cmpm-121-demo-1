// ===================================
// BASIC APP HEADERS & STYLING
import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jack-O'-Lantern Farmer!!"; // Page title
document.title = gameName;

const header = document.createElement("h1"); // Header
header.innerHTML = gameName;
app.append(header);

// ===================================
// CONFIGURATION AND CONSTANTS
const ITEM_DETAILS = [
  { name: "seeds", cost: 10, rate: 0.1, desc: "A small busshel of pumpkin seeds...Great for beginners." },
  { name: "patch", cost: 100, rate: 2, desc: "A booming pumpkin patch located in Half Moon Bay California." },
  { name: "farm", cost: 1000, rate: 50, desc: "A well-maintained pumpkin farm, for sale from Farmer Otis." },
  { name: "lab", cost: 2000, rate: 100, desc: "A cutting-edge science lab where artificially created GMO pumpkins are produced." },
  { name: "forest", cost: 10000, rate: 1000, desc: "A mythical forest said to be filled with haunted spirits...and..the most delectable pumpkins." }
];

const BUTTON_STYLE = {
  backgroundImage: "url('images/jackolantern.png')",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "200px",
  height: "100px",
  border: "none",
  cursor: "pointer",
  color: "white",
  fontSize: "16px",
  textAlign: "center",
  paddingTop: "70px"
};

// ===================================
// INITIALIZATION OF CORE VARIABLES
let lanternCounter: number = 0,
    lanternGrowthRate: number = 0;
let timeStamp: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  sold: number;
  desc: string;
}

const availableItems: Item[] = ITEM_DETAILS.map(item => ({
  ...item,
  sold: 0
}));

// ===================================
// PAGE ELEMENTS FOR STATE-TRACKING
const reportedCount = document.createElement("div");
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
function generateUpgradeInfo(item: Item, index: number): string {
  return `
    🎃 Growth Rate Upgrade lv. ${index + 1} | Cost: ${item.cost} Jack-o'-Lanterns
    <br /><em>${item.desc}</em><br />
  `;
}

function updateReportedGamestate() {
  reportedCount.innerHTML = `${lanternCounter.toFixed(2)} Jack-o'-Lanterns!`;
  reportedGrowth.innerHTML = `Current growth rate: ${lanternGrowthRate.toFixed(1)} Jack-o'-Lanterns/sec`;
  reportedPurchases.innerHTML = `Current purchases: ` + availableItems.map((item, index) => `lv.${index + 1}: ${item.sold}`).join(', ');
  purchasableUpgrades.innerHTML = 'PURCHASABLE UPGRADES:<br />' + availableItems.map(generateUpgradeInfo).join('');
}

function updateCounter(timestamp: number) {
  if (timeStamp) {
    const elapsed = timestamp - timeStamp;
    lanternCounter += (lanternGrowthRate * elapsed) / 1000;
    updateReportedGamestate();
    updateButtonStatus();
  }
  timeStamp = timestamp;
  requestAnimationFrame(updateCounter);
}

function updateButtonStatus() {
  availableItems.forEach((item, index) => {
    const button = document.querySelector(`#upgradeButton${index + 1}`) as HTMLButtonElement;
    button.disabled = lanternCounter < item.cost;
  });
}

function createUpgradeButton(label: string, growth: number, index: number) {
  const button = document.createElement("button");
  button.id = `upgradeButton${index + 1}`;
  button.innerHTML = label;
  button.disabled = true;
  button.onclick = () => {
    if (lanternCounter >= availableItems[index].cost) {
      lanternCounter -= availableItems[index].cost;
      lanternGrowthRate += growth;
      availableItems[index].sold += 1;
      availableItems[index].cost = Math.round(availableItems[index].cost * 1.15 * 100) / 100;
      updateReportedGamestate();
      updateButtonStatus();
    }
  };
  return button;
}

// ===================================
// MAIN PROGRAM
requestAnimationFrame(updateCounter);
updateReportedGamestate();

// Create page buttons
ITEM_DETAILS.forEach((item, index) => {
  const upgradeButton = createUpgradeButton(
    `BUY LV.${index + 1} UPGRADE - ${item.name}`,
    item.rate,
    index
  );
  app.append(upgradeButton);
});

const clicksButton = document.createElement("button");
Object.assign(clicksButton.style, BUTTON_STYLE);
clicksButton.innerHTML = "BOO! Click me!";
clicksButton.onclick = () => {
  lanternCounter += 1;
  updateReportedGamestate();
};

app.append(clicksButton);