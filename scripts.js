
let possibleWords = "Actor Gold Painting Advertisement Grass Parrot Afternoon Greece Pencil Airport Guitar Piano Ambulance Hair Pillow Animal Hamburger Pizza Answer Helicopter Planet Apple Helmet Plastic Army Holiday Portugal Australia Honey Potato Balloon Horse Queen Banana Hospital Quil Battery House Rain Beach Hydrogen Rainbow Beard Ice Raincoat Bed Insect Refrigerator Belgium Insurance Restaurant Boy Iron River Branch Island Rocket Breakfast Jackal Room Brother Jelly Rose Camera Jewellery Russia Candle Jordan Sandwich Car Juice School Caravan Kangaroo Scooter Carpet King	Shampoo Cartoon	Kitchen	Shoe China Kite	Soccer Church Knife	Spoon Crayon Lamp Stone Crowd Lawyer Sugar Daughter	Leather	Sweden Death Library Teacher Denmark Lighter Telephone Diamond Television Dinner Lizard Disease Thailand Doctor	London Tomato Lunch	Toothbrush Dream Machine Traffic Dress Magazine	Trail Easter Magician Truck Manchester Uganda Eggplant Market Umbrella Egypt Match Elephant Microphone Vase Energy Monkey Vegetable Engine Morning Vulture England Motorcycle Wall Evening Nail Whale"

possibleWords = possibleWords.replaceAll('\t', ' ');
possibleWords = possibleWords.split(' ');

for (let i = 0; i < possibleWords.length; i++) {
    if (possibleWords[i] === '') {
        possibleWords.splice(i, 1);
    }
    if (possibleWords[i].length < 5) {
        possibleWords.splice(i, 1);
    }
}





let word = randomWord();
const title = document.getElementById('win');
const reset = document.getElementById('reset');

// arrays of divs
let wordLetters = Array.from(document.getElementsByClassName('word-letter'));
const letterBoxes = Array.from(document.getElementsByClassName('letter-box'));
const letterButtons = Array.from(document.getElementsByClassName('letter-btn'));

// arrays of strings
let wordArray = Array.from(word);
let filledWord = new Array(wordArray.length).fill(null);
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const notInWord = document.getElementById('not-in-word');

console.log(word);

function fillWord() {    
    for (let i = 0; i < wordArray.length; i++) {
        wordLetters[i].innerHTML = wordArray[i];
    }
    for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i].innerHTML === '') {
            letterBoxes[i].style.display = 'none';
        } else {
            letterBoxes[i].style.display = 'flex';
        }
    }
}

fillWord()

function randomWord() {
    return possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
}


function resetGame() {
    word = randomWord();
    console.log(word);
    wordArray = Array.from(word);
    wordLetters.forEach(element => element.innerHTML = '');
    fillWord();
    filledWord = Array(wordArray.length).fill(null);
    wordLetters.forEach(letter => letter.style.display = 'none');
    letterButtons.forEach(button => button.style.backgroundColor = 'indigo');
    title.innerHTML = 'Word Guess';
    title.style.color = 'black';
    while (notInWord.firstChild) {
        notInWord.removeChild(notInWord.lastChild);
    }
}

reset.addEventListener('click', resetGame);


letterButtons.forEach(letter => letter.addEventListener('click', reveal));

function reveal(e) {
    let buttonLetter = alphabet[letterButtons.indexOf(e.target)];
    
    if (filledWord.includes(null)) {
        if (wordArray.includes(buttonLetter)) {
            for (let i = 0; i < wordArray.length; i++) {
                if (wordArray[i] === buttonLetter) {
                    wordLetters[i].style.display = 'block';
                    e.target.style.backgroundColor = 'orange';
                    filledWord[i] = wordArray[i];
                }
            }
        } else {
            let add = document.createElement('p');
            let notLetter = document.createTextNode(buttonLetter);
            add.appendChild(notLetter);
            notInWord.appendChild(add);
            e.target.style.backgroundColor = 'gray';
        }
    }
    if (!filledWord.includes(null)) {
        title.innerHTML = 'You win!';
        title.style.color = 'lightgreen';
    }
}

