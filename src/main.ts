import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hunter's amazing game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter variable
let counter: number = 0;

// Div that reports the counter's value
const reportedCount = document.createElement("div");
reportedCount.innerHTML = counter + " Jack-o'-Lanterns!";
app.append(reportedCount);

// Basic button that increases the counter for every click
const button = document.createElement("button");
button.innerHTML = "BOO! Click me! 🎃";
button.onclick = () => {
    counter += 1;
    reportedCount.innerHTML = counter + " Jack-o'-Lanterns!"; // Update the div with the new counter value
};
app.append(button);

// Update counter based on animation frame
// Counter increments by fractional amount (1 sec -> 1 unit)
let timeStamp: number = 0;
function updateCounter(timestamp: number) {
    if (timeStamp) {
        const elapsed = timestamp - timeStamp;
        counter += elapsed / 1000; 
        reportedCount.innerHTML = counter.toFixed(2) + " Jack-o'-Lanterns!"; 
    }
    timeStamp = timestamp;
    requestAnimationFrame(updateCounter); 
}
requestAnimationFrame(updateCounter);
