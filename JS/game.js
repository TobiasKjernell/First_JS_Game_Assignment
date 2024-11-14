"use strict"
/* Variables */

const INPUT_VALIDATOR = /^[a-zA-Z]{1,1}$/;
const titleEl = document.querySelector(".page-title");
const ANIMAL_POOL = ["dog", "cat", "donkey", "horse", "pig", "rabbit", "anaconda", "bat", "antelope", "dolphin", "whale", "elk", "shark", "jaguar", "orca", "tarantula", "turtle", "whale"]

let life = 8;
let pickedAnimal = "";
let wrongLettersGuessed = [];
let visualOutput = [];

/* Functions */

const randomPickAnimal = () => ANIMAL_POOL[Math.floor(Math.random() * ANIMAL_POOL.length)].toUpperCase();

const paintHangman = () => {
    switch (life) {
        case 8:
            return "\n" + "\n|" + "\n|" + "\n|" + "\n|" + "\n|" + "\n|_______________________\n";
        case 7:
            return "\n__________" + "\n|" + "\n|" + "\n|" + "\n|" + "\n|" + "\n|_______________________\n";
        case 6:
            return "\n__________" + "\n|             |" + "\n|" + "\n|" + "\n|" + "\n|" + "\n|_______________________\n";
        case 5:
            return "\n__________" + "\n|             |" + "\n|            O" + "\n|" + "\n|" + "\n|" + "\n|_______________________\n";
        case 4:
            return "\n__________" + "\n|             |" + "\n|            O" + "\n|             |" + "\n|" + "\n|" + "\n|_______________________\n";
        case 3:
            return "\n__________" + "\n|             |" + "\n|            O" + "\n|         ---|" + "\n|" + "\n|" + "\n|_______________________\n";
        case 2:
            return "\n__________" + "\n|             |" + "\n|            O" + "\n|         ---|---" + "\n|" + "\n|" + "\n|_______________________\n";
        case 1:
            return "\n__________" + "\n|             |" + "\n|            O" + "\n|         ---|---" + "\n|            /" + "\n|          /" + "\n|_______________________\n";
        case 0:
            return "\n__________" + "\n|             |" + "\n|            O" + "\n|         ---|---" + "\n|            /\\" + "\n|          /    \\" + "\n|_______________________";
        default:
            return "Error";
    }
}

const resetGame = () => {
    pickedAnimal = "";
    visualOutput.length = 0;
    wrongLettersGuessed.length = 0;
    life = 8;
}

const initSetup = () => {

    pickedAnimal = randomPickAnimal();

    for (let index = 0; index < pickedAnimal.length; index++) {
        visualOutput.push("_");
    }
}

const startGame = () => {

    initSetup();

    while (life > 0) {

        let inputLetter = prompt(`[Theme: Animals]\n\nPick a letter! (Doesn't matter if it's big or small)\nWrong guessed letters: ${wrongLettersGuessed}\nLives left: ${life}\n ${visualOutput.join(" ")}${paintHangman()}`);

        if (inputLetter === null) {
            alert("Game canceled!")
            resetGame();
            break;
        }

        if (INPUT_VALIDATOR.test(inputLetter)) {

            inputLetter = inputLetter.toUpperCase();

            if (pickedAnimal.includes(inputLetter)) {
                for (let index = 0; index < pickedAnimal.length; index++)
                    if (pickedAnimal[index] === inputLetter)  //Wanted to try something else than indexOf/search
                        visualOutput[index] = inputLetter;


                if (visualOutput.join("") === pickedAnimal) {
                    alert(`Woohoo!! You won!\nYou also had ${life} lives left!\nWinning word: ${pickedAnimal}`)
                    resetGame();
                    break;
                }
            }
            else {

                life--;

                if (life === 0) {
                    alert(`You lost! The right answer was ${pickedAnimal}!\n ${paintHangman()}`);
                    resetGame();
                    break;
                } else {

                    if (!wrongLettersGuessed.includes(inputLetter)) {
                        wrongLettersGuessed.push(inputLetter);
                        alert(`Letter '${inputLetter}' doesn't exist in this word`)
                    } else
                        alert(`Letter ${inputLetter} is wrong and you also have guessed this letter already.`)
                }

            }

        } else
            alert("Needs to be single letter and also not a number!")
    }
}

/* Events */

titleEl.addEventListener('click', () => {
    startGame();
})


