const text = "Gardens of Leaves and Trees";
const revealText = document.getElementById("reveal-text");
let i = 0;

function revealLetter() {
  if (i < text.length) {
    revealText.innerHTML += text[i];
    i++;
    setTimeout(revealLetter, 100);
  } else {
    // After the original text is revealed, add a line break and the new text
    let subText = document.createElement('span');
    subText.className = 'sub-text'; // Add the correct class
    revealText.appendChild(document.createElement('br')); // Add line break
    revealText.appendChild(subText); // Add sub-text span
    revealSubText(subText); // Reveal the sub-text with animation
  }
}

function revealSubText(subTextElement) {
  const subText = "<catch a dot to enter>";
  let j = 0;

  function revealNextLetter() {
    if (j < subText.length) {
      subTextElement.innerHTML += subText[j];
      j++;
      setTimeout(revealNextLetter, 100);
    }
  }

  revealNextLetter(); // Start revealing the sub-text
}

revealLetter(); // Start revealing the main text

// Dots Configuration
const dotConfigurations = [
    { size: 500, colors: ["#3C4E3D", "#5E9C4D", "#BCCAA7"] },
    { size: 300, colors: ["#3C4E3D", "#5E9C4D", "#BCCAA7"] },
    { size: 500, colors: ["#3C4E3D", "#5E9C4D", "#BCCAA7"] },
    { size: 300, colors: ["#3C4E3D", "#5E9C4D", "#BCCAA7"] },
    { size: 500, colors: ["#3C4E3D", "#5E9C4D", "#BCCAA7"] },
    { size: 300, colors: ["#3C4E3D", "#5E9C4D", "#BCCAA7"] },
];

const dots = [];
const margin = 50; // Margin from the edges of the screen

function createRadialGradient(colors) {
    return `radial-gradient(circle at 50% 50%, ${colors[0]}, ${colors[1]} 45%, ${colors[2]})`;
}

function createDot(config) {
    // Create an anchor element that wraps the dot
    const link = document.createElement('a');
    link.href = "the-garden.html"; // Link to the desired page
    link.target = "_blank"; // Open the link in a new tab
    document.body.appendChild(link);

    // Create the dot element
    const dot = document.createElement("div");
    dot.className = "dot";
    link.appendChild(dot); // Append the dot inside the anchor

    const x = Math.random() * (window.innerWidth - config.size - 2 * margin) + margin;
    const y = Math.random() * (window.innerHeight - config.size - 2 * margin) + margin;

    dot.style.width = `${config.size}px`;
    dot.style.height = `${config.size}px`;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.background = createRadialGradient(config.colors);
    dot.style.position = 'absolute';
    dot.style.transition = 'all 0.3s ease';

    const speed = {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
    };

    const dotObject = { element: dot, x, y, size: config.size, speed };
    dots.push(dotObject);
}

function updateDots() {
    dots.forEach((dot) => {
        dot.x += dot.speed.x;
        dot.y += dot.speed.y;

        // Check boundary collision
        if (dot.x - dot.size / 2 < margin || dot.x + dot.size / 2 > window.innerWidth - margin) {
            dot.speed.x *= -1;
            dot.x += dot.speed.x;
        }
        if (dot.y - dot.size / 2 < margin || dot.y + dot.size / 2 > window.innerHeight - margin) {
            dot.speed.y *= -1;
            dot.y += dot.speed.y;
        }

        dot.element.style.left = `${dot.x - dot.size / 2}px`;
        dot.element.style.top = `${dot.y - dot.size / 2}px`;
    });

    requestAnimationFrame(updateDots);
}

dotConfigurations.forEach((config) => {
    createDot(config);
});

updateDots();

window.addEventListener("resize", () => {
    dots.forEach((dot) => {
        const config = dotConfigurations[dots.indexOf(dot)];
        dot.x = Math.random() * (window.innerWidth - config.size - 2 * margin) + margin;
        dot.y = Math.random() * (window.innerHeight - config.size - 2 * margin) + margin;
        dot.element.style.left = `${dot.x - dot.size / 2}px`;
        dot.element.style.top = `${dot.y - dot.size / 2}px`;
    });
});




