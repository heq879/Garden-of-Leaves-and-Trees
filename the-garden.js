document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    const boxSize = 200;
    const padding = 10; // Padding to add some space between boxes
    let placedBoxes = [];
    let zoomedBox = null; // Track the currently zoomed box
    let isDragging = false; // Track if a drag occurred
    let startX, startY, offsetX, offsetY; // Store the starting mouse position

    // Array of GIF paths
    const gifs = [
        'assets/P9300933-ezgif.com-video-to-gif-converter.gif',
        'assets/P9300934-ezgif.com-video-to-gif-converter.gif',
        'assets/P9300936-ezgif.com-video-to-gif-converter.gif',
        'assets/P9300937-ezgif.com-video-to-gif-converter.gif',
        'assets/P9300938-ezgif.com-video-to-gif-converter.gif'
    ];

    // Array of audio sources, one for each box
    const audioSources = [
        'assets/newport green playground.mp3',
        'assets/in apartment.mp3',
        'assets/parsons st.mp3',
        'assets/st mark raku.mp3',
        'assets/home.mp3',
        'assets/by the river.mp3',
        'assets/P9300934.mp3',
        'assets/elizabeth garden.mp3'
    ];

    function isOverlapping(newBox) {
        for (let box of placedBoxes) {
            let leftDiff = Math.abs(newBox.left - box.left);
            let topDiff = Math.abs(newBox.top - box.top);

            // Check if there’s overlap by comparing the distance between boxes
            if (leftDiff < boxSize + padding && topDiff < boxSize + padding) {
                return true;
            }
        }
        return false;
    }

    // Randomly position each box without overlap
    boxes.forEach((box, index) => {
        let randomX, randomY, newBox;

        do {
            randomX = Math.floor(Math.random() * (window.innerWidth - boxSize));
            randomY = Math.floor(Math.random() * (window.innerHeight - boxSize));
            newBox = { left: randomX, top: randomY };
        } while (isOverlapping(newBox)); // Keep trying until no overlap is found

        placedBoxes.push(newBox);
        box.style.left = `${randomX}px`;
        box.style.top = `${randomY}px`;

        // Create a GIF container
        const gifContainer = document.createElement('div');
        gifContainer.classList.add('gif-container');
        box.appendChild(gifContainer);

        // Create audio element
        const audio = new Audio(audioSources[index]);

        // Enable dragging
        box.addEventListener('mousedown', function (e) {
            isDragging = false; // Reset drag flag
            startX = e.clientX; // Record initial mouse position
            startY = e.clientY;
            offsetX = e.clientX - box.offsetLeft;
            offsetY = e.clientY - box.offsetTop;
            box.style.cursor = 'grabbing';

            const mouseMoveHandler = function (e) {
                // Detect movement to set dragging state
                if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
                    isDragging = true;
                }

                if (isDragging) {
                    box.style.left = `${e.clientX - offsetX}px`;
                    box.style.top = `${e.clientY - offsetY}px`;
                }
            };

            const mouseUpHandler = function () {
                box.style.cursor = 'grab';
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        // Zoom functionality
        box.addEventListener('click', function () {
            // Only trigger zoom if no dragging occurred
            if (!isDragging) {
                // If there is already a zoomed box, reset it
                if (zoomedBox && zoomedBox !== box) {
                    zoomedBox.classList.remove('zoomed');
                    // Remove the SVG button and stop audio when closing the zoom
                    const svgButton = zoomedBox.querySelector('.svg-button');
                    if (svgButton) {
                        svgButton.remove();
                    }
                    audio.pause();
                    audio.currentTime = 0;
                }

                // Toggle zoom on the clicked box
                if (box.classList.contains('zoomed')) {
                    box.classList.remove('zoomed');
                    zoomedBox = null;
                    const svgButton = box.querySelector('.svg-button');
                    if (svgButton) {
                        svgButton.remove();
                    }
                    audio.pause();
                    audio.currentTime = 0;
                } else {
                    box.classList.add('zoomed');
                    zoomedBox = box;

                    // Insert the SVG button as a play button for audio
                    const svgButton = document.createElement('img');
                    svgButton.src = 'assets/Polygon 1.svg'; // Correct SVG path here
                    svgButton.classList.add('svg-button');
                    svgButton.style.width = '50px'; // Adjust button size
                    svgButton.style.height = '50px';
                    svgButton.style.cursor = 'pointer';
                    svgButton.style.pointerEvents = 'all'; // Make sure it's clickable

                    // Append SVG button to the zoomed box
                    box.appendChild(svgButton);

                    // Add click event to play/pause audio
                    svgButton.addEventListener('click', function (event) {
                        event.stopPropagation(); // Prevent click event from bubbling up to the box
                        if (audio.paused) {
                            audio.play();
                            svgButton.style.opacity = '0.5'; // Visual feedback for playing
                        } else {
                            audio.pause();
                            svgButton.style.opacity = '1'; // Visual feedback for paused
                        }
                    });
                }
            }
        });

        // Show random GIF on hover, only if the box is not zoomed
        box.addEventListener('mouseenter', function () {
            if (!box.classList.contains('zoomed')) {
                const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
                gifContainer.innerHTML = `<img src="${randomGif}" alt="GIF" style="width: 320px; height: 240px;">`; // Set GIF size
            }
        });

        // Hide GIF on mouse leave
        box.addEventListener('mouseleave', function () {
            gifContainer.innerHTML = ''; // Clear the GIF when not hovering
        });
    });
});

//this is for the svg button
const svgButton = document.createElement('img');
svgButton.src = 'assets/Polygon 1.svg'; // Correct SVG path here
svgButton.classList.add('svg-button');

// Append SVG button to the zoomed box
box.appendChild(svgButton);
