const canvas = document.getElementById('fishbowl');
const pixMod = 1;
const width = canvas.width / pixMod;
const height = canvas.height / pixMod;

var runIntervalId;
var seedIntervalID;

//export{initialize}; 

var currGen;
var startColor;

function initialize(color) {
    if (currGen == null){
        currGen  = Array(width).fill().map(() => Array(height).fill(0)); 
    }
    // populate currGen
    var x = 0;
    for (i = 0; i < height; i++) {
        for (j = x; j < width; j+=18) {
           currGen[i][j] = 1; 
        }
        x = 1 ? 0 : 1;
    } 
    
    //seed(Math.floor(Math.pow(width, 2)*.6));
    draw();

    runIntervalID = window.setInterval(run, 10);
    seedIntervalID = window.setInterval(seed, 15000, 
        Math.floor(Math.pow(width,2)*.05));
}

function seed(n){
    while (n > 0){
        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        if (currGen[x][y] != 1){
            currGen[x][y] = 1;
            n--;
        }
    }
}



function run() {
    updateCells();
    draw();
}

function stop() {
    clearInterval(runIntervalID);
    clearInterval(seedIntervalID);
}


function draw() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = startColor;
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