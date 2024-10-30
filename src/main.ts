// ================================
// APP SETUP AND INITIAL STYLING
import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jack-O'-Lantern Farmer!!"; // Set page title
document.title = gameName;

const header = document.createElement("h1"); // Create header element
header.innerHTML = gameName;
app.append(header);

// ================================
// GAME CONFIGURATION AND CONSTANTS
const ITEM_DETAILS = [
  {
    name: "seeds",
    cost: 10,
    rate: 0.1,
    desc: "A small bushel of pumpkin seeds... Great for beginners.",
  },
  {
    name: "patch",
    cost: 100,
    rate: 2,
    desc: "A booming pumpkin patch located in Half Moon Bay, California.",
  },
  {
    name: "farm",
    cost: 1000,
    rate: 50,
    desc: "A well-maintained pumpkin farm, for sale from Farmer Otis.",
  },
  {
    name: "lab",
    cost: 2000,
    rate: 100,
    desc: "A cutting-edge science lab where GMO pumpkins are produced.",
  },
  {
    name: "forest",
    cost: 10000,
    rate: 1000,
    desc: "A mythical forest filled with haunted spirits... and the best pumpkins.",
  },
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
  paddingTop: "70px",
};

// ================================
// INITIAL GAME STATE VARIABLES
let lanternCounter: number = 0, // Current number of lanterns
  lanternGrowthRate: number = 0; // Growth rate of lanterns per second
let timeStamp: number = 0; // Timestamp for tracking elapsed time

interface Item {
  name: string;
  cost: number;
  rate: number;
  sold: number;
  desc: string;
}

const availableItems: Item[] = ITEM_DETAILS.map((item) => ({
  ...item,
  sold: 0, // Add 'sold' property to track number of purchases
}));

// ================================
// GAME STATE DISPLAY ELEMENTS
const reportedCount = document.createElement("div"); // Displays lantern count
const reportedGrowth = document.createElement("div"); // Displays growth rate
const reportedPurchases = document.createElement("div"); // Displays item purchases
const purchasableUpgrades = document.createElement("div"); // Displays available upgrades

app.appendChild(document.createElement("div")).innerHTML = "🎃";
app.append(reportedCount);
app.append(reportedGrowth);
app.append(reportedPurchases);
app.append(purchasableUpgrades);

// ================================
// HELPER FUNCTIONS
// Generates HTML for each upgrade
function generateUpgradeInfo(item: Item, index: number): string {
  return `
    🎃 Growth Rate Upgrade lv. ${index + 1} | Cost: ${item.cost} Jack-o'-Lanterns
    <br /><em>${item.desc}</em><br />
  `;
}

// Updates the on-screen game state
function updateReportedGamestate() {
  reportedCount.innerHTML = `${lanternCounter.toFixed(2)} Jack-o'-Lanterns!`;
  reportedGrowth.innerHTML = `Current growth rate: ${lanternGrowthRate.toFixed(1)} Jack-o'-Lanterns/sec`;
  reportedPurchases.innerHTML =
    `Current purchases: ` +
    availableItems
      .map((item, index) => `lv.${index + 1}: ${item.sold}`)
      .join(", ");
  purchasableUpgrades.innerHTML =
    "PURCHASABLE UPGRADES:<br />" +
    availableItems.map(generateUpgradeInfo).join("");
}

// Updates lantern count and growth rate based on elapsed time
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

// Enables or disables upgrade buttons based on affordability
function updateButtonStatus() {
  availableItems.forEach((item, index) => {
    const button = document.querySelector(
      `#upgradeButton${index + 1}`,
    ) as HTMLButtonElement;
    button.disabled = lanternCounter < item.cost;
  });
}

// Creates an upgrade button for each item with a gradient background
function createUpgradeButton(label: string, growth: number, index: number) {
  const button = document.createElement("button");
  button.id = `upgradeButton${index + 1}`;
  button.innerHTML = label;
  button.disabled = true;

  // Calculate lightness for the background color based on index
  const lightness = 90 - index * 10; // Adjust the gradient from light to dark
  button.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`; // Lightness decreases with each button
  button.style.color = "white"; // Ensure text is visible on dark background
  button.style.border = "none";
  button.style.width = "200px";
  button.style.height = "100px";
  button.style.cursor = "pointer";
  button.style.marginBottom = "10px"; // Add margin to visually separate buttons

  button.onclick = () => {
    if (lanternCounter >= availableItems[index].cost) {
      lanternCounter -= availableItems[index].cost;
      lanternGrowthRate += growth;
      availableItems[index].sold += 1;
      availableItems[index].cost =
        Math.round(availableItems[index].cost * 1.15 * 100) / 100; // Increase cost by 15%
      updateReportedGamestate();
      updateButtonStatus();
    }
  };
  return button;
}

// ================================
// MAIN GAME LOGIC
requestAnimationFrame(updateCounter); // Start updating the counter
updateReportedGamestate(); // Initialize display

// Create upgrade buttons for each item
ITEM_DETAILS.forEach((item, index) => {
  const upgradeButton = createUpgradeButton(
    `BUY LV.${index + 1} UPGRADE - ${item.name}`,
    item.rate,
    index,
  );
  app.append(upgradeButton);
});

// Create a clickable button for manual lantern increment
const clicksButton = document.createElement("button");
Object.assign(clicksButton.style, BUTTON_STYLE);
clicksButton.innerHTML = "BOO! Click me!";
clicksButton.onclick = () => {
  lanternCounter += 1; // Increment counter by 1 on click
  updateReportedGamestate();
};

app.append(clicksButton);
