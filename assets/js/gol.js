const width = 100;
const height = 100;
const pixMod = 10;

var currGen = Array(width).fill().map(() => Array(height).fill(0));
var length = currGen.length;

function initialize() {

}

function generation() {
    currGen = updateCells();
}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

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
    let nextGen = JSON.parse(JSON.stringify(currGen));
    for (i = 0; i < width; i++) {
        for (j=0; j < height; j++) {
            let neighbors = checkNeighbors(i, j);
            if (currGen[i][j] == 1) {
                if (neighbors != 2 || neighbors != 3) {
                    currGen[i][j] = 0;
                }
            } else {
                if (neighbors == 3) {
                    currGen[i][j] = 1;
                }
            }
        }
    }
    return nextGen;
}

// returns count of neighbors
function checkNeighbors(i, j) {
    let count = 0;

    if (j >= 0) {
        if (currGen[i-1][j-1] == 1 && i >= 0) {
            count++;
        }
        if (currGen[i][j-1] == 1) {
            count++;
        }
        if (currGen[i+1][j-1] == 1 && i < length) {
            count++;
        }
    }

    if (currGen[i-1][j] == 1 && i >= 0) {
        count++;
    }
    if (currGen[i+1][j] == 1 && i < length) {
        count++;
    }

    if (j < length) {
        if (currGen[i-1][j+1] == 1) {
            count++;
        }
        if (currGen[i][j+1] == 1) {
            count++;
        }
        if (currGen[i+1][j+1] == 1) {
            count++; 
        }
    }

    return count;
}