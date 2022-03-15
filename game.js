let alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]


const l4 = document.getElementById("dificultad4");
l4.addEventListener("click", function() { showWord(letras4); });
const l5 = document.getElementById("dificultad5");
l5.addEventListener("click", function() { showWord(letras5); });
const l6 = document.getElementById("dificultad6");
l6.addEventListener("click", function() { showWord(letras6); });
const l7 = document.getElementById("dificultad7");
l7.addEventListener("click", function() { showWord(letras7); });

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
    //let selectedWord = selectword(lista);
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
}

let check = (letter, word) => {
    let guessWord = word.toUpperCase();
    for (let i = 0; i < word.length; i++) {
        if (letter == guessWord[i]) {
            let guess = document.getElementById('letter[' + i + ']')
            guess.innerHTML = guessWord[i];
        }
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
    console.log(button);
    button.disabled = true;
}

// remove event listeners