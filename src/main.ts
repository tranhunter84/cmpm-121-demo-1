import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Hunter's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Basic button that shows number of times it's been clicked
let num_clicks = 0;
const button = document.createElement("button");
button.innerHTML = "Click me! 🎃";
button.onclick = () => {
    num_clicks += 1;
    button.innerHTML = num_clicks + ' clicks so far 🎃';
};
app.append(button);