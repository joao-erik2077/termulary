let wordList;
let word;
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const columns = [];
let columnKeys = [];
let actualColumn = 0;
let actualKey = 0;
let actualWord = '';
let gameRunning = true;
getWordsFromApi();
initializeColumns(6);
getColumnKeys();

const wordWrite = (key) => {
    if (gameRunning) {
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
}

window.onkeyup = (event) => {
    const key = event.key.toUpperCase();
    wordWrite(key);
}

async function getWordsFromApi() {
    const url = 'https://api.datamuse.com/words?max=1000&sp=?????';

    let response = await fetch(url);
    let data = await response.json();
    wordList = data;
    word = wordList[getRandomWord()].word.toUpperCase();

    if (word.includes(' ')) getWordsFromApi();
}

function initializeColumns(totalColumns) {
    for (let i = 0; i < totalColumns; i++) {
        columns[i] = document.getElementById(`column-${i+1}`);
    }
}

function checkWord() {
    if (word === actualWord) {
        checkWordKey();
        disableOthersColumns();
        gameRunning = false;
    } else {
        checkWordKey();
        actualWord = '';
        actualColumn++;
        actualKey = 0;
        getColumnKeys();
    }
}

function disableOthersColumns() {
    for (let i = actualColumn; i < 6; i++) {
        actualColumn++;
        getColumnKeys();
        columnKeys.forEach((i) => {
            i.style.backgroundColor = '#c2b691';
        });
    }
}

function checkWordKey() {
    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < word.length; j++) {
            if (word[i] === actualWord[j]) {
                columnKeys[j].style.backgroundColor = '#d5eb34';
            }
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (word[i] === actualWord[i]) {
            columnKeys[i].style.backgroundColor = '#13d63e';
        }
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