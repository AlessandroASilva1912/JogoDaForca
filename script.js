const categories = {
    animais: ['gato', 'cachorro', 'elefante', 'girafa', 'leão'],
    frutas: ['maçã', 'banana', 'laranja', 'uva', 'abacaxi'],
    cores: ['azul', 'vermelho', 'verde', 'amarelo', 'roxo'],
};

let selectedCategory = '';
let selectedWord = '';
let guessedLetters = [];
let attemptsLeft = 6;

document.addEventListener('DOMContentLoaded', function () {
    displayAlphabet();
    startGame();
});

function startGame() {
    guessedLetters = [];
    attemptsLeft = 6;
    document.getElementById('hangman').style.background = `url('hangman-0.png') center/contain no-repeat`;

    selectedCategory = getRandomProperty(categories);
    selectedWord = getRandomWord(selectedCategory);
    
    displayWord();
    displayCategory(selectedCategory);
    displayMessage('');

    updateAlphabetButtons();
}

function getRandomProperty(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomWord(category) {
    const words = categories[category];
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function displayCategory(category) {
    document.getElementById('category').textContent = `Categoria: ${category}`;
}

function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    if (!wordDisplay.textContent.includes('_')) {
        displayMessage('Parabéns! Você venceu!');
    }
}

function displayMessage(message) {
    document.getElementById('message').textContent = message;
}

function displayAlphabet() {
    const alphabetContainer = document.getElementById('alphabet');
    alphabetContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = function () {
            guessLetter(letter);
        };
        alphabetContainer.appendChild(button);
    }
}

function updateAlphabetButtons() {
    const alphabetButtons = document.querySelectorAll('#alphabet button');
    alphabetButtons.forEach(button => {
        button.disabled = guessedLetters.includes(button.textContent);
    });
}

function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            attemptsLeft--;
            updateHangmanImage();
        }
        displayWord();
        updateAlphabetButtons();
        checkGameStatus();
    }
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById('hangman');
    const hangmanIndex = 6 - attemptsLeft;
    hangmanImage.style.background = `url('hangman-${hangmanIndex}.png') center/contain no-repeat`;

    if (attemptsLeft === 0) {
        displayMessage(`Você perdeu! A palavra era "${selectedWord}".`);
        updateAlphabetButtons();
    }
}

function checkGameStatus() {
    if (attemptsLeft === 0 || !document.getElementById('word-display').textContent.includes('_')) {
        updateAlphabetButtons();
    }
}
