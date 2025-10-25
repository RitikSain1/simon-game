// let gameSeq = [];
// let userSeq = [];

// let started = false;
// let level = 0;
// let highScore = 0; // track highest level reached

// let h2 = document.querySelector("h2");

// let btns = ["red", "yellow", "purple", "green"];

// // Start game when any key is pressed
// document.addEventListener("keypress", function () {
//     if (!started) {
//         console.log("Game started");
//         started = true;
//         levelUp();
//     }
// });

// // Flash button (animation)
// function btnFlash(btn) {
//     btn.classList.add("flash");
//     setTimeout(() => {
//         btn.classList.remove("flash");
//     }, 250);
// }

// // Level up: add one more color to the sequence
// function levelUp() {
//     userSeq = []; // reset user input
//     level++;
//     h2.innerText = `Level ${level}`;

//     // random color (should be 0–3)
//     let randIdx = Math.floor(Math.random() * 4);
//     let randColor = btns[randIdx];
//     let randBtn = document.querySelector(`.${randColor}`);
//     gameSeq.push(randColor);

//     console.log("Game Sequence:", gameSeq);

//     // flash sequence for the player
//     playSequence();
// }

// // play entire sequence each level
// function playSequence() {
//     let i = 0;
//     let interval = setInterval(() => {
//         let color = gameSeq[i];
//         let btn = document.querySelector(`.${color}`);
//         btnFlash(btn);
//         i++;
//         if (i >= gameSeq.length) {
//             clearInterval(interval);
//         }
//     }, 600);
// }

// // when user clicks a color
// function btnPress() {
//     let btn = this;
//     btnFlash(btn);

//     let userColor = btn.classList[1];
//     userSeq.push(userColor);

//     checkAns(userSeq.length - 1);
// }

// // check the user’s answer
// function checkAns(idx) {
//     if (userSeq[idx] === gameSeq[idx]) {
//         if (userSeq.length === gameSeq.length) {
//             setTimeout(levelUp, 1000);
//         }
//     } else {
//         let score = level;
//         if (score > highScore) highScore = score;

//         h2.innerHTML = `
//             Game Over! Press any key to restart.<br>
//             Your Score: ${score}<br>
//             Highest Score: ${highScore}
//         `;

//         document.body.style.backgroundColor = "red";
//         setTimeout(() => {
//             document.body.style.backgroundColor = "white";
//         }, 200);

//         resetGame();
//     }
// }

// // reset everything for a new game
// function resetGame() {
//     started = false;
//     gameSeq = [];
//     userSeq = [];
//     level = 0;
// }

// // attach event listener to all buttons
// let allBtns = document.querySelectorAll(".btn");
// for (let btn of allBtns) {
//     btn.addEventListener("click", btnPress);
// }



let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let canClick = false; // prevent clicking during playback

let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "purple", "green"];

// Load high score from localStorage (if any)
let highScore = localStorage.getItem("highScore") || 0;

// Start game when any key is pressed
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        h1.innerText = "Simon Says Game 🎮";
        levelUp();
    }
});

// Flash effect for buttons
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Go to next level
function levelUp() {
    userSeq = [];
    level++;
    canClick = false;

    h2.innerHTML = `<b>Level ${level}</b> 🔥`;

    // Add a new random color
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    playSequence();
}

// Show the entire sequence
function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        btnFlash(btn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
            setTimeout(() => canClick = true, 500);
        }
    }, 600);
}

// Handle user clicks
function btnPress() {
    if (!canClick) return;

    let btn = this;
    btnFlash(btn);

    let userColor = btn.classList[1];
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Check user's input
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let score = level - 1;
        updateHighScore(score);

        h2.innerHTML = `
            ❌ Game Over! Press any key to restart.<br>
            Your Score: ${score}<br>
            Highest Score: ${highScore}
        `;

        h1.innerText = "Game Over 😢";
        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 400);

        resetGame();
    }
}

// Update and save high score
function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}

// Reset game state
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    canClick = false;
}

// Add event listener to buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

