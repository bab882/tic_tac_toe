"USE_STRICT";
document.onkeypress = function (evt) {
    evt = evt || window.event;
    let modal = document.getElementsByClassName("modal")[0];
    if (evt.keycode === 27) {
        modal.style.display = none;
    }
};
window.onclick = function (evt) {
    let modal = document.getElementsByClassName("modal")[0];
    if (evt.target === modal) {
        modal.style.display = none;
    }
};
function sumArray(array){
    let sum = 0, i = 0;
    for(i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
};
function isInArray(elements, array){
    if(array.indexOf(elements) > -1) {
        return true;
    }
    return false;
};
function intRandom(min, max){
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
};
function shuffleArray(array){
    let counter = array.length, temp, index;
    while(counter > 0){
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};
//variables globales
let moves = 0,
    winner = 0,
    x = 1,
    o = 3,
    player = x,
    computer = o,
    whoseTurn = x,
    gameOver = false,
    score = {
        ties: 0,
        player: 0,
        computer: 0
    },
    xText = "<span class=\"x\"></span>&times;</span>",
    oText = "<span class=\"o\"></span>o</span>",
    playerText = xText,
    computerText = oText,
    difficulty = 1,
    myGrid = null;

function Grid() {
    this.cells = new Array(9);
}
Grid.prototype.getFreeCellIndices = function () {
    let i = 0, resultArray = [];
    for (i = 0; i < this.cells.length; i++) {
        if (this.cells[i] === 0) {
            resultArray.push(i);
        }
    }
    console.log("resultArray" + resultArray.toString);
    debugger;
    return resultArray;
};
Grid.prototype.getRowValues = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("mauvais arguments dans la fonction");
        return undefined;
    }
    let i = index * 3;
    return this.cells.slice(i, i + 3);
};
Grid.prototype.getRowIndices = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowIndices!");
        return undefined;
    }
    var row = [];
    index = index * 3;
    row.push(index);
    row.push(index + 1);
    row.push(index + 2);
    return row;
};
Grid.prototype.getColumnValues = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("mauvais arguments dans la fonction");
        return undefined;
    }
    let i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(this.cells[i]);
    }
    return column;
};
Grid.prototype.getColumnIndices = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("mauvais arguments dans la fonction");
        return undefined;
    }
    let i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(i);
    }
    return column;
};
Grid.prototype.getDiagValues = function (arg) {
    let cell = [];
    if (arg !== 0 && arg !== 1) {
        console.error("mauvais arguments dans la fonction");
        return undefined;
    } else if (arg === 0) {
        cell.push(this.cells[0]);
        cell.push(this.cells[4]);
        cell.push(this.cells[8]);
    } else {
        cell.push(this.cells[2]);
        cell.push(this.cells[4]);
        cell.push(this.cells[4]);
    }
};
Grid.prototype.getDiagIndices = function (arg) {
    if (arg !== 0 && arg !== 1) {
        console.error("mauvais arguments dans la fonction");
        return undefined;
    } else if (arg === 0) {
        return [0, 4, 8];
    } else {
        return [2, 4, 6]
    }
};
Grid.prototype.getFirstWithTwoInArrow = function (agent) {
    if (agent !== computer && agent !== player) {
        console.error("aucun joueur n'est défini");
        return undefined;
    }
    let sum = agent * 2;
    freeCells = shuffleArray(this.getFreeCellIndices());
    for (let i = 0; i < freeCells.length; i++) {
        for (let j = 0; j < 3; j++) {
            let rowV = this.getRowValues(j);
            let rowI = this.getRowIndices(j);
            let colV = this.getColumnValues(j);
            let colI = this.getColumnIndices(j);
            if (sumArray(rowV) == sum && isInArray(freeCells[i], rowI)) {
                return freeCells[i];
            } else if (sumArray(colV) == sum && isInArray(freeCells[i], colI)) {
                return freeCells[i];
            }
        }
        for (j = 0; j < 2; j++) {
            var diagV = this.getDiagValues(j);
            var diagI = this.getDiagIndices(j);
            if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
                return freeCells[i];
            }
        }
    }
    return false;
};
Grid.prototype.reset = function () {
    for (let i = 0; i < this.cells.length; i++) {
        this.cells[i] = 0;
    }
    return true;
};

function initialize() {
    myGrid = new Grid();
    moves = 0;
    winner = 0;
    gameOver = false;
    whoseTurn = player;
    for (let i = 0; i <= myGrid.cells.length - 1; i++) {
        myGrid.cells[i] = 0;
    }
    //setTimeout(showOptions, 500);
    debugger;
};