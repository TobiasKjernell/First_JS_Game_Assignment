"use strict"
/* Variables */

const INPUT_VALIDATOR = /^[a-zA-Z]{1,1}$/;
const titleEl = document.querySelector(".page-title");

let animalPool = ["dog", "cat", "donkey", "horse", "pig", "rabbit", "anaconda", "bat", "antelope", "dolphin", "whale", "elk", "shark", "jaguar", "orca", "tarantula", "turtle", "whale"]
let life = 7;
let randomPick = "";
let wrongLettersGuessed = [];
let outputString = [];

/* Functions */

const randomPickAnimal = () => animalPool[Math.floor(Math.random() * animalPool.length)].toUpperCase();

const resetGame = () => {
    randomPick = "";
    outputString.length = 0;
    wrongLettersGuessed.length = 0;
    life = 7;
}

const initSetup = () => {

    randomPick = randomPickAnimal();

    for (let index = 0; index < randomPick.length; index++) {
        outputString.push("_");
    }
}

const startGame = () => {

    initSetup();

    while (life > 0) {

        let choseALetter = prompt(`[Theme: Animals]\n\nPick a letter! (Doesn't matter if it's big or small)\nWrong guessed letters: ${wrongLettersGuessed}\nLives left: ${life}\n\n\n${outputString.join(" ")}`);

        if (choseALetter === null) {
            alert("Game canceled!")
            resetGame();
            break;
        }

        choseALetter = choseALetter.toUpperCase();

        if (INPUT_VALIDATOR.test(choseALetter)) {

            if (randomPick.includes(choseALetter)) {
                for (let index = 0; index < randomPick.length; index++) {
                    if (randomPick[index] === choseALetter)  //Wanted to try something else than indexOf
                        outputString[index] = choseALetter;

                }
                if (outputString.join("") === randomPick) {
                    alert(`Woohoo!! You won!\nYou also had ${life} lives left!\nWinning word: ${randomPick}`)
                    resetGame();
                    break;
                }
            }
            else {

                life--;

                if (life === 0) {
                    alert(`You lost! The right answer was ${randomPick}!`);
                    resetGame();
                    break;
                }

                if (!wrongLettersGuessed.includes(choseALetter)) {
                    wrongLettersGuessed.push(choseALetter);
                    alert(`Letter '${choseALetter}' doesn't exist in this word`)
                } else
                    alert(`Letter ${choseALetter} is wrong and you also have guessed this letter already.`)
            }

        } else
            alert("Needs to be single letter and also not a number!")
    }
}

/* Events */

titleEl.addEventListener('click', () => {
    startGame();
})


