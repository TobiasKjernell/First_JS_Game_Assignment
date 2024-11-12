"use strict"
/* Variables */

const INPUT_VALIDATOR = /^[a-zA-Z]{1,1}$/;
const titleEl = document.querySelector(".page-title");

let animalPool = ["dog", "cat", "donkey", "horse", "pig", "rabbit", "anaconda", "bat", "antelope", "dolphin", "whale", "elk", "shark", "jaguar", "orca", "tarantula", "turtle", "whale"]
let life = 8;
let randomAnimalPick = "";
let wrongLettersGuessed = [];
let visualOutput = [];

/* Functions */

const randomPickAnimal = () => animalPool[Math.floor(Math.random() * animalPool.length)].toUpperCase();

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
    randomAnimalPick = "";
    visualOutput.length = 0;
    wrongLettersGuessed.length = 0;
    life = 8;
}

const initSetup = () => {

    randomAnimalPick = randomPickAnimal();

    for (let index = 0; index < randomAnimalPick.length; index++) {
        visualOutput.push("_");
    }
}

const startGame = () => {

    initSetup();

    while (life > 0) {

        let choseALetter = prompt(`[Theme: Animals]\n\nPick a letter! (Doesn't matter if it's big or small)\nWrong guessed letters: ${wrongLettersGuessed}\nLives left: ${life}\n ${visualOutput.join(" ")}${paintHangman()}`);

        if (choseALetter === null) {
            alert("Game canceled!")
            resetGame();
            break;
        }

        choseALetter = choseALetter.toUpperCase();

        if (INPUT_VALIDATOR.test(choseALetter)) {

            if (randomAnimalPick.includes(choseALetter)) {
                for (let index = 0; index < randomAnimalPick.length; index++)
                    if (randomAnimalPick[index] === choseALetter)  //Wanted to try something else than indexOf/search
                        visualOutput[index] = choseALetter;


                if (visualOutput.join("") === randomAnimalPick) {
                    alert(`Woohoo!! You won!\nYou also had ${life} lives left!\nWinning word: ${randomAnimalPick}`)
                    resetGame();
                    break;
                }
            }
            else {

                life--;

                if (life === 0) {
                    alert(`You lost! The right answer was ${randomAnimalPick}!\n ${paintHangman()}`);
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


