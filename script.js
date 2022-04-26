const wordList = ['APPLE', 'FRUIT', 'GUESS', 'SHORT', 'TODAY']
const word = wordList[getRandomWord()];
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const columns = [];
let columnKeys = [];
let actualColumn = 0;
let actualKey = 0;
let actualWord = '';
initializeColumns(6);
getColumnKeys();

const wordWrite = (key) => {
    if (key === 'ENTER' && actualKey === 5) {
        checkWord();
    } else {
        if (key !== 'BACKSPACE') {
            if (actualKey < 5 && alphabet.includes(key)) {
                actualWord += key;
                document.getElementById(columnKeys[actualKey].id).innerText = key;
                actualKey++;
            }
        } else if (actualKey > 0) {
            actualWord = actualWord.substring(0, actualWord.length - 1);
            actualKey--;
            document.getElementById(columnKeys[actualKey].id).innerText = '';
        }
    }
}

window.onkeyup = (event) => {
    const key = event.key.toUpperCase();
    wordWrite(key);
}

function initializeColumns(totalColumns) {
    for (let i = 0; i < totalColumns; i++) {
        columns[i] = document.getElementById(`column-${i+1}`);
    }
}

function checkWord() {
    if (word === actualWord) {
        alert('acertou!!');
    } else {
        alert('errou');
        actualWord = '';
        actualColumn++;
        actualKey = 0;
        getColumnKeys();
    }
}

function getColumnKeys() {
    columnKeys = [];
    for (let i of columns[actualColumn].children) {
        columnKeys.push(i);
    }
}

function getRandomWord() {
    return Math.floor(Math.random() * wordList.length);
}