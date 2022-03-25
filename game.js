let alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
let turns = 10;
let computerScore = 0;
let userScore = 0;
let counting = 0;
let myModal = new bootstrap.Modal(document.getElementById('endAlert'), {});
let endModalBody = document.querySelector('#endAlert .modal-body p');
let endModalTitle = document.querySelector('#endAlert .modal-title');

const l4 = document.getElementById("dificultad4");
l4.addEventListener("click", function() { showWord(letras4); });
const l5 = document.getElementById("dificultad5");
l5.addEventListener("click", function() { showWord(letras5); });
const l6 = document.getElementById("dificultad6");
l6.addEventListener("click", function() { showWord(letras6); });
const l7 = document.getElementById("dificultad7");
l7.addEventListener("click", function() { showWord(letras7); });

const trash = document.getElementById('letters')

//new game when first one is done

let newGame = () => {
    let newGameModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});
    newGameModal.show();
    turns = 10;
    counting = 0;
    trash.innerHTML = '';
    endModalBody.innerHTML = '';
    endModalTitle.innerHTML = '';
}

const nuevoJuego = document.getElementById('newGame');
nuevoJuego.addEventListener("click", newGame);


//Keyword creation

const keyboard = () => {
    let myKeyboard = document.querySelector('#alphabet');
    myKeyboard.innerHTML = '';

    for (let i = 0; i < alfabeto.length; i++) {
        let list = document.createElement('li');
        let button = document.createElement('button')
        button.className = 'btn d-flex';
        button.id = 'letters_' + i
        button.innerHTML = alfabeto[i];
        list.appendChild(button);
        myKeyboard.appendChild(list);
    }


}


//Function for selecting the word 

function selectword(lista) {
    let options = lista.palabras;
    let randomNum = Math.floor(Math.random() * options.length);
    let randomWord = options[randomNum];
    events(randomWord);
}

//function that shows the word

let showWord = (lista) => {
    let myWord = document.getElementById('word');
    let myTrash = document.getElementById('trash');
    myTrash.className = 'p-2';
    let numberSpaces = lista.espacios;
    myWord.innerHTML = '';
    for (let i = 0; i < numberSpaces; i++) {
        let spaces = document.createElement('span');
        spaces.innerHTML = '__';
        spaces.className = 'mx-1'
        spaces.id = 'letter[' + i + ']'
        myWord.appendChild(spaces);
    }
    keyboard();
    selectword(lista);
    showTurns();
    showScore();
}

//function that shows the turns
let showTurns = () => {
    let sectionTurns = document.getElementById('sct-turns');
    sectionTurns.innerHTML = '';
    let pTurn = document.createElement('p');
    pTurn.id = 'p-turns'
    pTurn.innerText = 'Turnos restantes: ' + turns;
    sectionTurns.appendChild(pTurn)
}

//Function that changes the turns

let changeTurns = (word) => {
    if (turns > 0) {
        let textTurns = document.getElementById('p-turns');
        textTurns.innerHTML = '';
        textTurns.innerHTML = 'Turnos restantes: ' + turns;
    } else {
        endModalBody.innerHTML = 'Tu palabra era: ' + word.toUpperCase();
        endModalTitle.innerHTML = 'Has perdido! :(';
        computerScore = computerScore + 1;
        showScore();
        myModal.show();
        turns = 0;
    }
}

//fuction that shows score

let showScore = () => {
    let sectionScore = document.getElementById('sct-score')
    sectionScore.innerHTML = '';
    let compScore = document.createElement('p');
    compScore.innerText = 'Computadora: ' + computerScore;
    compScore.classList.add('col-6')
    let usScore = document.createElement('p');
    usScore.innerText = 'Jugador: ' + userScore;
    usScore.classList.add('col-6');
    sectionScore.appendChild(compScore);
    sectionScore.appendChild(usScore);
}

let isPresent = (letter, word) => {
    let present = false;
    let wordUpper = word.toUpperCase();
    for (let i = 0; i < word.length; i++) {
        if (letter === wordUpper[i]) {
            present = true;
        }
    }
    return present;
}

let check = (letter, word) => {
    let guessWord = word.toUpperCase();
    let lastLetter = word.length - 1;
    let present = isPresent(letter, word);
    for (let i = 0; i < word.length; i++) {
        if (letter == guessWord[i]) {
            let guess = document.getElementById('letter[' + i + ']')
            guess.innerHTML = guessWord[i];
            counting = counting + 1;
            checkWin(word);
        } else if (!present && i == lastLetter) {
            let wrongLetter = document.createElement('span');
            wrongLetter.className = 'm-1';
            wrongLetter.innerHTML = letter;
            trash.appendChild(wrongLetter);
            turns = turns - 1;
            changeTurns(word);
        }
    }
}

//function that checks if the player won

let checkWin = (word) => {
    if (counting == word.length) {
        userScore = userScore + 1
        showScore();
        endModalBody.innerHTML = 'Es correcto! La palabra era: ' + word.toUpperCase();
        endModalTitle.innerHTML = 'Has ganado! :)';
        myModal.show();
    }
}

//add event listeners
let events = (randomWord) => {
    for (let i = 0; i < alfabeto.length; i++) {
        let button = document.getElementById('letters_' + i)
        let letter = button.innerHTML;
        button.addEventListener("click", function() {
            check(letter, randomWord);
            inactive(button)
        })
    }
}

let inactive = (button) => {
    button.disabled = true;
}