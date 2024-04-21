const words = [
  'Brasil',
  'Estados Unidos',
  'Canada',
  'Mexico',
  'Argentina',
  'Reino Unido',
  'França',
  'Alemanha',
  'China',
  'Japao',
  'India',
  'Australia',
];

let word = words[Math.floor(Math.random() * words.length)].toUpperCase();

let wrongLetters = [];
let errors = 0;
let letter = '';
let correctWord = [];
const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const errorsDisplay = document.getElementById('errors');
const button = document.getElementById('verifyButton');

function updateWrongLettersDisplay() {
  wrongLettersDisplay.innerText = wrongLetters.join(' ');
}

function updateErrorsDisplay() {
  errorsDisplay.innerText = `Erros: ${errors}`;
}

function checkLetter() {
  if (word.includes(letter)) {
    showLetter();
  } else {
    handleWrongLetters();
  }
}

function handleWrongLetters() {
  wrongLetters.push(letter);
  updateWrongLettersDisplay();

  errors++;
  updateErrorsDisplay();
}

function displayWord() {
  const wordArray = word.split('');
  for (let i = 0; i < wordArray.length; i++) {
    const spanWord = document.createElement('span');
    spanWord.className = 'letterSpan';
    spanWord.id = `letter${i}`;
    spanWord.innerHTML = '_';
    spanWord.innerHTML = word[i] === ' ' ? '&nbsp;' : '_';
    wordDisplay.appendChild(spanWord);
  }
}

function showLetter() {
  const wordArray = word.split('');
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === letter) {
      document.getElementById(`letter${i}`).innerHTML = letter;
      correctWord[i] = letter;
    } else if (wordArray[i] === ' ') {
      correctWord[i] = ' ';
    }
  }

  console.log(correctWord.join(''));

  if (correctWord.join('') === word) {
    setTimeout(() => {
      alert('Parabéns! Você ganhou!');
      resetGame();
    }, 100);
  }
}

function verifyLetter() {
  if (!letter.match(/[A-ZÇÇ]/)) {
    alert('Por favor, insira apenas letras do alfabeto');
    return;
  } else if (wrongLetters.includes(letter)) {
    alert('Você ja tentou esta letra. Tente outra.');
  } else {
    checkLetter(letter);
  }
}

function verifyButton() {
  letter = inputLetter.value.toUpperCase();
  inputLetter.value = '';

  verifyLetter();
}

const inputLetter = document.getElementById('inputLetter');
inputLetter.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    letter = inputLetter.value.toUpperCase();
    inputLetter.value = '';

    verifyLetter();
  }
});

function resetGame() {
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  correctWord = [];
  wrongLetters = [];
  errors = 0;

  document.querySelectorAll('.letterSpan').forEach((w) => {
    w.remove();
  });

  displayWord();
  updateWrongLettersDisplay();
  updateErrorsDisplay();
}

resetGame();
