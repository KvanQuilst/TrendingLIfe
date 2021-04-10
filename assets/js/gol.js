const width = 10;
const height = 10;
const pixMod = 100;

//export{initialize}; 

var currGen;

function initialize() {
    if (currGen == null){
        currGen  = Array(width).fill().map(() => Array(height).fill(0)); 
    }
    // populate currGen
    currGen[4][4] = 1;
    currGen[5][5] = 1;
    currGen[5][3] = 1;
    draw();

    run();
}



function run() {
    while (i = 0; i < 2; i++) {
        updateCells();
        draw();
    }
}


function draw() {
    const canvas = document.getElementById('fishbowl');

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
}

// updates each cell
function updateCells() {
    var nextGen = JSON.parse(JSON.stringify(currGen));
    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            var neighbors = checkNeighbors(i, j);
            if (currGen[i][j] == 1) {
                if (neighbors != 2 && neighbors != 3) {
                    nextGen[i][j] = 0;
                }
            } else if (neighbors == 3) {
                nextGen[i][j] = 1;
            }
        }
    }
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
        if (i < height-1 && currGen[i+1][j-1] == 1) {
            count++;
        }
    }

    if (i > 0 && currGen[i-1][j] == 1) {
        count++;
    }
    if (i < height-1 && currGen[i+1][j] == 1) {
        count++;
    }

    if (j < width-1) {
        if (i > 0 && currGen[i-1][j+1] == 1) {
            count++;
        }
        if (currGen[i][j+1] == 1) {
            count++;
        }
        if (i < height-1 && currGen[i+1][j+1] == 1) {
            count++; 
        }
    }
    return count;
}