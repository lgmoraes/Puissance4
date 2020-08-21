var readline = require('readline-sync');

var p1Char = "o";
var p2Char = "x";
var nbCols = 7;
var nbRows = 6;

var puissance4 = getTableau(nbCols, nbRows, 0);
var chosenCol = 0;
var currentPlayer = 1;
var winner = 0;

afficherPuissance4();
main();

function main() {
    while (true) {
        chosenCol = questionCol();
        putToken(chosenCol - 1);
        afficherPuissance4();

        if (checkEndGame())
            break;

        currentPlayer = (currentPlayer === 1) ? 2 : 1;
    }

    console.log("Le joueur %d a gagné!", currentPlayer);
}

function checkEndGame() {
    return checkRows() || checkCols() || checkDiagonals();
}

function checkRows() {
    var p = currentPlayer;

    for (var row = 0; row < nbRows; row++) {
        for (var col = 0; col < nbCols-3 ; col++) {
            if (puissance4[row][col] === p
                && puissance4[row][col+1] === p
                && puissance4[row][col+2] === p
                && puissance4[row][col+3] === p
            ) {
                return true
            }
        }
    }

    return false;
}

function checkCols() {
    var p = currentPlayer;

    for (var row = 0; row < nbRows-3; row++) {
        for (let col = 0; col < nbCols; col++) {
            if (puissance4[row][col] === p
                && puissance4[row+1][col] === p
                && puissance4[row+2][col] === p
                && puissance4[row+3][col] === p
            ) {
                return true
            }
        }
    }

    return false;
}

function checkDiagonals() {
    var p = currentPlayer;

    // Vers la droite
    for (var row = 0; row < nbRows-3; row++) {
        for (let col = 0; col < nbCols-3; col++) {
            if (puissance4[row][col] === p
                && puissance4[row+1][col+1] === p
                && puissance4[row+2][col+2] === p
                && puissance4[row+3][col+3] === p
            ) {
                return true
            }
        }
    }

    // Vers la gauche
    for (var row = 0; row < nbRows-3; row++) {
        for (let col = 3; col < nbCols; col++) {
            if (puissance4[row][col] === p
                && puissance4[row+1][col-1] === p
                && puissance4[row+2][col-2] === p
                && puissance4[row+3][col-3] === p
            ) {
                return true
            }
        }
    }

    return false;
}

function questionCol() {
    var col = null;

    while (isNaN(col) || col < 1 || col > nbCols || firstAvailableRow(col - 1) === -1)
        col = parseInt(readline.question("Quelle colonne ? : "));

    return col;
}

function getTableau(width, height, car) {
    var tab = [];

    for (var i = 0; i < height; i++) {
        var row = [];

        for (var j = 0; j < width; j++) {
            row.push(car);
        }

        tab.push(row);
    }

    return tab;
}

function afficherPuissance4() {
    var tab = puissance4;

    for (var i = 0; i < tab.length; i++) {
        var str = "||";

        for (let j = 0; j < tab[i].length; j++) {
            var Char = tab[i][j];

            str += " ";

            if (Char === 1) {
                str += p1Char;
            }
            else if (Char === 2)
                str += p2Char;
            else {
                str += " ";
            }

            str += " |";
        }
        str += "|";

        console.log(str);
    }


}

function putToken(col) {
    console.log(firstAvailableRow(col));
    puissance4[firstAvailableRow(col)][col] = currentPlayer;
}

function firstAvailableRow(col) {
    for (var i = nbRows - 1; i > -1; i--) {
        var frame = puissance4[i][col];

        if (frame === 0)
            return i;
    }

    return -1;
}