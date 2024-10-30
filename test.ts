// Creates an upgrade button for each item with a gradient background
function createUpgradeButton(label: string, growth: number, index: number) {
    const button = document.createElement("button");
    button.id = `upgradeButton${index + 1}`;
    button.innerHTML = label;
    button.disabled = true;
  
    const lightness = 90 - index * 10; 
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
  