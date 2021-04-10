const width = 10;
const height = 10;
const pixMod = 100;

var currGen = Array(width).fill().map(() => Array(height).fill(0));

function initialize() {
    // populate currGen
    currGen[4][4] = 1;
    currGen[5][5] = 1;
    currGen[5][3] = 1;
    draw();

    run();
}

function run() {
    for (i = 0; i < 2; i++) {
        console.log("Gen " + i);
        generation();
    }
}

function generation() {
    console.log(currGen[4]);
    updateCells();
    console.log(currGen[4]);
    draw();
}

function draw() {
    console.log("Draw");
    const canvas = document.getElementById('canvas');

    
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                if (currGen[i][j] == 1) {
                    ctx.fillRect(i*pixMod, j*pixMod, pixMod, pixMod);
                }
            }
        }
    }
    console.log("DrawEnd");
}

// updates each cell
function updateCells() {
    console.log("Update");
    var nextGen = JSON.parse(JSON.stringify(currGen));
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            var neighbors = checkNeighbors(i, j);
            if (currGen[i][j] == 1) {
                if (neighbors != 2 || neighbors != 3) {
                    nextGen[i][j] = 0;
                }
            } else {
                if (neighbors == 3) {
                    nextGen[i][j] = 1;
                }
            }
        }
    }
    console.log(nextGen[4]);
    console.log("UpdateEnd");
    currGen = nextGen; 
}

// returns count of neighbors
function checkNeighbors(i, j) {
    let count = 0;

    if (j > 0) {
        if (i > 0 && currGen[i-1][j-1] == 1) {
            count++;
        }
        if (currGen[i][j-1] == 1) {
            count++;
        }
        if (i < width-1 && currGen[i+1][j-1] == 1) {
            count++;
        }
    }

    if (i < 0 && currGen[i-1][j] == 1) {
        count++;
    }
    if (i < width-1 && currGen[i+1][j] == 1) {
        count++;
    }

    if (j < height-1) {
        if (i > 0 && currGen[i-1][j+1] == 1) {
            count++;
        }
        if (currGen[i][j+1] == 1) {
            count++;
        }
        if (i < width-1 && currGen[i+1][j+1] == 1) {
            count++; 
        }
    }

    return count;
}