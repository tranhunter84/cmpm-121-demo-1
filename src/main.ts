import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hunter's amazing game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter and growth rate variables
let clicksCounter: number = 0;
let growthRate: number = 0; 

// Counter variables for upgrade purchases made 
let upgrade1Count: number = 0;
let upgrade2Count: number = 0;
let upgrade3Count: number = 0;

// Div that reports the counter's value
const reportedCount = document.createElement("div");
reportedCount.innerHTML = clicksCounter + " Jack-o'-Lanterns!";
app.append(reportedCount);

// Div that reports the current growth rate
const reportedGrowth = document.createElement("div");
reportedGrowth.innerHTML = "Current growth rate: " + growthRate + " Jack-o'-Lanterns/sec";
app.append(reportedGrowth);

// Div that reports the numbers of each upgrade purchased
const reportedPurchases = document.createElement("div");
reportedPurchases.innerHTML = "Current purchases: [lv.1: " +upgrade1Count+ ", lv.2: " +upgrade2Count+ ", lv.3: " +upgrade3Count+ "]";
app.append(reportedPurchases) 

// Basic button that increases the counter for every click
const button = document.createElement("button");
button.innerHTML = "BOO! Click me! 🎃";
button.onclick = () => {
    clicksCounter += 1;
    updateReportedValues(); // Update the div with the new counter value
};
app.append(button);

// 3 Upgrade buttons for increasing growth rate
const upgradeButton1 = document.createElement("button");
const upgradeButton2 = document.createElement("button");
const upgradeButton3 = document.createElement("button");
upgradeButton1.innerHTML = "Buy growth rate upgrade lv. 1 (Cost: 10 Jack-o'-Lanterns)";
upgradeButton2.innerHTML = "Buy growth rate upgrade lv. 2 (Cost: 100 Jack-o'-Lanterns)";
upgradeButton3.innerHTML = "Buy growth rate upgrade lv. 3 (Cost: 1000 Jack-o'-Lanterns)";
upgradeButton1.disabled = true; 
upgradeButton2.disabled = true; 
upgradeButton3.disabled = true; 
upgradeButton1.onclick = () => {
    if (clicksCounter >= 10) {
        clicksCounter -= 10; 
        growthRate += 0.1;
        upgrade1Count += 1; 
        updateReportedValues(); 
        updateUpgradeButton(); 
    }
};
upgradeButton2.onclick = () => {
    if (clicksCounter >= 100) {
        clicksCounter -= 100; 
        growthRate += 2; 
        upgrade2Count += 1;
        updateReportedValues(); 
        updateUpgradeButton(); 
    }
};
upgradeButton3.onclick = () => {
    if (clicksCounter >= 1000) {
        clicksCounter -= 1000; 
        growthRate += 50; 
        upgrade3Count += 1;
        updateReportedValues(); 
        updateUpgradeButton(); 
    }
};
app.append(upgradeButton1);
app.append(upgradeButton2);
app.append(upgradeButton3);

function updateReportedValues() {
    reportedCount.innerHTML = clicksCounter.toFixed(2) + " Jack-o'-Lanterns!";
    reportedGrowth.innerHTML = "Current growth rate: " + growthRate + " Jack-o'-Lanterns/sec";
    reportedPurchases.innerHTML = "Current purchases: [lv.1: " +upgrade1Count+ ", lv.2: " +upgrade2Count+ ", lv.3: " +upgrade3Count+ "]";
}

function updateUpgradeButton() {
    if (clicksCounter < 10) {
        upgradeButton1.disabled = true;
    }
    else {
        upgradeButton1.disabled = false;
    }
    if (clicksCounter < 100) {
      upgradeButton2.disabled = true;
    }
    else {
      upgradeButton2.disabled = false;
    }
    if (clicksCounter < 1000) {
      upgradeButton3.disabled = true;
    }
    else {
      upgradeButton3.disabled = false;
    }
}

// Update counter based on animation frame
// Counter increments by fractional amount (1 sec -> 1 unit)
let timeStamp: number = 0;
function updateCounter(timestamp: number) {
    if (timeStamp) {
        const elapsed = timestamp - timeStamp;
        clicksCounter += (growthRate * elapsed) / 1000;
        updateReportedValues();
        updateUpgradeButton(); 
    }
    timeStamp = timestamp;
    requestAnimationFrame(updateCounter); // Loop
}
requestAnimationFrame(updateCounter);