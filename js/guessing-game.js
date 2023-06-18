// vvvvvvv I took this script from an online generator to help me animate the header tag vvvvvvv // 

var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml3 .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1)
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });


// new game function
const newGame = () => {
    return location.reload();
}

const playAgnBnt = document.querySelector("#play-agn-button")
playAgnBnt.addEventListener('click', newGame)

// winning num func 
const generateWinningNumber = () => {
    return Math.floor(Math.random() * 100);
}

// store data into object --- this is all data: winning num; player guesses; shuffled hints; 
const GAME_DATA_STORAGE = {
    targetNum: generateWinningNumber(),
    guesses: [],
    hints: []
}

// console.log(GAME_DATA_STORAGE.targetNum)


// ---------------------------------- Helper functions ---------------------------------- //


// shuffle function for hints 
const shuffle = () => {
    let WINNING_NUM = GAME_DATA_STORAGE.targetNum;
    let randomIndex = Math.floor(Math.random() * 5);
    for (let i = 7; i >= GAME_DATA_STORAGE.hints.length - 1; i--) {
        if (WINNING_NUM >= 50) {
            GAME_DATA_STORAGE.hints.push(Math.floor(Math.random() * (100 - 50) + 50))
        } else if (WINNING_NUM < 50) {
            GAME_DATA_STORAGE.hints.push(Math.floor(Math.random() * 50 + 1))
        }
    }
    GAME_DATA_STORAGE.hints[randomIndex] = WINNING_NUM;
    const currentDiv = document.getElementById("display-hints");
    currentDiv.innerHTML = `Maybe one of these? ${GAME_DATA_STORAGE.hints[0]} ${GAME_DATA_STORAGE.hints[1]} ${GAME_DATA_STORAGE.hints[2]} ${GAME_DATA_STORAGE.hints[3]} ${GAME_DATA_STORAGE.hints[4]} `;
    document.querySelector("#hint-button").disabled = true;
    return GAME_DATA_STORAGE.hints;
}

const HINT_BUTTON = document.querySelector("#hint-button");
HINT_BUTTON.addEventListener('click', shuffle)

const inputField = document.querySelector("#plr-guess-field");
const SUB_BUTTON = document.querySelector("#submit-button");


// duplicate guess function 
const duplicateGuessCheck = () => {
    for (let i = 0; i <= GAME_DATA_STORAGE.guesses.length; i++) {
        if (GAME_DATA_STORAGE.guesses[i] === inputField.value) {
            const guessPop = document.querySelector("#guess-pop-up")
            guessPop.innerHTML = "You guessed this already. Try Again."
            return true;
        }
    }
    return false;

}

// winning alert pop up  function
const winnerPopup = () => {
    if (GAME_DATA_STORAGE.targetNum == inputField.value) {
        const guessPop = document.querySelector("#guess-pop-up")
        document.querySelector("#plr-guess-field").value = '';
        document.querySelector("#submit-button").disabled = true;
        document.querySelector("#hint-button").disabled = true;
        return guessPop.innerHTML = `Nice guess! The winning number was ${GAME_DATA_STORAGE.targetNum}!`
    }
}


// high or lower function hints 
const difference = () => {
    if (inputField.value > GAME_DATA_STORAGE.targetNum) {
        let sub = inputField.value - GAME_DATA_STORAGE.targetNum;
        if (sub >= 1 && sub <= 5) {
            const lowerPop = document.querySelector("#guess-pop-up");
            lowerPop.innerHTML = "try going just a lil' lower";
        } else {
            const lowerPop = document.querySelector("#guess-pop-up");
            lowerPop.innerHTML = "try going lower";
        }

    } else if (inputField.value < GAME_DATA_STORAGE.targetNum) {
        let sub = GAME_DATA_STORAGE.targetNum - inputField.value;
        if (sub >= 1 && sub <= 5) {
            const lowerPop = document.querySelector("#guess-pop-up");
            lowerPop.innerHTML = "try going just a lil' higher";
        } else {
            const lowerPop = document.querySelector("#guess-pop-up");
            lowerPop.innerHTML = "try going higher lol";
        }
    }
}

// ---------------------------------- Guess func / main func ---------------------------------- // 

const playerGuesses = () => {
    if (isNaN(inputField.value) || inputField.value < 1 || inputField.value > 100) {
        const guessPop = document.querySelector("#guess-pop-up")
        document.querySelector("#plr-guess-field").value = '';
        return guessPop.innerHTML = "Invalid guess, try again."
    }

    let deferenceValue = difference();
    let duplicateInput = duplicateGuessCheck();
    console.log(duplicateInput)
    let winningGuessValue = winnerPopup();
    console.log(winningGuessValue)

    if (GAME_DATA_STORAGE.guesses.length === 0) {
        let plGuessOne = document.querySelector("#plr-guess-one");
        GAME_DATA_STORAGE.guesses.push(inputField.value)
        plGuessOne.innerHTML = inputField.value;
        document.querySelector("#plr-guess-field").value = '';
    } else if (GAME_DATA_STORAGE.guesses.length === 1 && duplicateInput !== true) {
        let plGuessTwo = document.querySelector("#plr-guess-two");
        GAME_DATA_STORAGE.guesses.push(inputField.value)
        plGuessTwo.innerHTML = inputField.value;
        document.querySelector("#plr-guess-field").value = '';
    } else if (GAME_DATA_STORAGE.guesses.length === 2 && duplicateInput !== true) {
        let plGuessThree = document.querySelector("#plr-guess-three");
        GAME_DATA_STORAGE.guesses.push(inputField.value)
        plGuessThree.innerHTML = inputField.value;
        document.querySelector("#plr-guess-field").value = '';
    } else if (GAME_DATA_STORAGE.guesses.length === 3 && duplicateInput !== true) {
        let plGuessFour = document.querySelector("#plr-guess-four");
        GAME_DATA_STORAGE.guesses.push(inputField.value)
        plGuessFour.innerHTML = inputField.value;
        document.querySelector("#plr-guess-field").value = '';
    } else if (GAME_DATA_STORAGE.guesses.length === 4 && duplicateInput !== true) {
        let plGuessfive = document.querySelector("#plr-guess-five");
        GAME_DATA_STORAGE.guesses.push(inputField.value)
        plGuessfive.innerHTML = inputField.value;
        document.querySelector("#plr-guess-field").value = '';
        document.querySelector("#submit-button").disabled = true;
        if (!winningGuessValue) {
            const lowerPop = document.querySelector("#guess-pop-up");
            lowerPop.innerHTML = `tough luck, the winning number was ${GAME_DATA_STORAGE.targetNum}!`;
            document.querySelector("#hint-button").disabled = true;
        }
    }
}

SUB_BUTTON.addEventListener('click', playerGuesses)




