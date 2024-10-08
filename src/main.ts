import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hunter's amazing game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter and growth rate variables
let counter: number = 0;
let growthRate: number = 0; 

// Div that reports the counter's value
const reportedCount = document.createElement("div");
reportedCount.innerHTML = counter + " Jack-o'-Lanterns!";
app.append(reportedCount);

// Basic button that increases the counter for every click
const button = document.createElement("button");
button.innerHTML = "BOO! Click me! 🎃";
button.onclick = () => {
    counter += 1;
    updateReportedCount(); // Update the div with the new counter value
};
app.append(button);

// Upgrade button for increasing growth rate
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase Growth Rate Upgrade (Cost: 10 Jack-o'-Lanterns)";
upgradeButton.disabled = true; 
upgradeButton.onclick = () => {
    if (counter >= 10) {
        counter -= 10; 
        growthRate += 1; 
        updateReportedCount(); 
        updateUpgradeButton(); 
    }
};
app.append(upgradeButton);

function updateReportedCount() {
    reportedCount.innerHTML = counter.toFixed(2) + " Jack-o'-Lanterns!";
}

function updateUpgradeButton() {
    if (counter < 10) {
        upgradeButton.disabled = true;
    }
    else {
        upgradeButton.disabled = false;
    }
}

// Update counter based on animation frame
// Counter increments by fractional amount (1 sec -> 1 unit)
let timeStamp: number = 0;
function updateCounter(timestamp: number) {
    if (timeStamp) {
        const elapsed = timestamp - timeStamp;
        counter += (growthRate * elapsed) / 1000;
        updateReportedCount();
        updateUpgradeButton(); 
    }
    timeStamp = timestamp;
    requestAnimationFrame(updateCounter); // Loop
}
requestAnimationFrame(updateCounter);
