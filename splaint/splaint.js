const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

const image = new Image();
image.crossOrigin = "anonymous";
image.src = "crosspooter.jpeg"; // Replace with your image URL

let grids = []; // Store each grid level

image.onload = () => {
    const size = Math.min(image.width, image.height);
    let gridSize = 1;
    while (gridSize * 3 <= size) {
        gridSize *= 3;
    }

    canvas.width = gridSize;
    canvas.height = gridSize;
    ctx.drawImage(image, 0, 0, gridSize, gridSize);

    let grid = createGrid(gridSize);
    grids.push(grid);

    while (grid.length > 3) {
        grid = downscaleGrid(grid);
        grids.push(grid);
    }

    grids.pop(); // Remove the highest resolution grid
    drawStylizedImage();
};

function createGrid(size) {
    const imageData = ctx.getImageData(0, 0, size, size).data;
    const grid = [];

    for (let y = 0; y < size; y++) {
        grid[y] = [];
        for (let x = 0; x < size; x++) {
            const idx = (y * size + x) * 4;
            const r = imageData[idx];
            const g = imageData[idx + 1];
            const b = imageData[idx + 2];
            grid[y][x] = { r, g, b };
        }
    }
    return grid;
}

function downscaleGrid(grid) {
    const newSize = grid.length / 3;
    const newGrid = [];

    for (let y = 0; y < newSize; y++) {
        newGrid[y] = [];
        for (let x = 0; x < newSize; x++) {
            let sumR = 0, sumG = 0, sumB = 0;
            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    const cell = grid[y * 3 + dy][x * 3 + dx];
                    sumR += cell.r;
                    sumG += cell.g;
                    sumB += cell.b;
                }
            }
            newGrid[y][x] = {
                r: Math.round(sumR / 9),
                g: Math.round(sumG / 9),
                b: Math.round(sumB / 9)
            };
        }
    }
    return newGrid;
}

async function drawStylizedImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const grid of grids.reverse()) {
        const size = grid.length;
        const cellSize = canvas.width / size;

        let cells = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                cells.push({ x, y });
            }
        }

        // Shuffle the order of cells
        cells.sort(() => Math.random() - 0.5);

        for (const { x, y } of cells) {
            const color = grid[y][x];
            const r = Math.min(255, Math.max(0, color.r + (Math.random() * 20 - 10)));
            const g = Math.min(255, Math.max(0, color.g + (Math.random() * 20 - 10)));
            const b = Math.min(255, Math.max(0, color.b + (Math.random() * 20 - 10)));

            const offsetX = (Math.random() * 0.4 - 0.2) * cellSize;
            const offsetY = (Math.random() * 0.4 - 0.2) * cellSize;

            const centerX = x * cellSize + cellSize / 2 + offsetX;
            const centerY = y * cellSize + cellSize / 2 + offsetY;
            const radius = (Math.random() * 0.2 + 0.5) * cellSize / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fill();
            ctx.closePath();

            const delay = Math.max(5, 50 - (radius * 100)); // Larger circles pause longer, smaller circles pause shorter
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
