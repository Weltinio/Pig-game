/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let inGame, isPlaying, dice, rolled, currentTotal, scores, goal

const limit = document.querySelector('.threshold-score')
const set = document.querySelector('.btn-score')
const newGame = document.querySelector('.btn-new')
const roll = document.querySelector('.btn-roll')
const hold = document.querySelector('.btn-hold')
const die = document.querySelector('.dice')
const score = document.querySelector('.score-input')
limit.textContent = goal


const Player1 = {
    panel: document.querySelector('.player-0-panel'),
    playerName: document.getElementById('name-0'),
    current: document.getElementById('current-0'),
    score: document.getElementById('score-0')
};

const Player2 = {
    panel: document.querySelector('.player-1-panel'),
    playerName: document.getElementById('name-1'),
    current: document.getElementById('current-1'),
    score: document.getElementById('score-1')
};



// Functions //

// New game
function start() {
    Player1.panel.classList.add('active');
    Player1.panel.classList.remove('winner');
    Player1.current.textContent = 0;
    Player1.score.textContent = 0;
    Player1.playerName.textContent = 'Player 1';
    Player2.playerName.textContent = 'Player 2';
    Player2.current.textContent = 0;
    Player2.score.textContent = 0;
    Player2.panel.classList.remove('active');
    Player2.panel.classList.remove('winner');
    inGame = true;
    currentTotal = 0;
    scores = [0, 0];
    isPlaying = 1;
    die.style.display = 'none';
    roll.style.display = 'block';
    hold.style.display = 'block';
    goal = score.value == '' ? 50 : parseInt(score.value);
    limit.textContent = goal;
};

// Dice random number
function rollDice() {
    dice =  Math.floor(Math.random() * 6) + 1;
    die.style.display = 'block';
    die.src = 'dice-'+dice+'.png';
};

// To swap players
function changePlayer() {
    if(isPlaying == 1){
        isPlaying = 0;
        Player1.current.textContent = 0;
        Player1.panel.classList.remove('active');
        Player2.panel.classList.add('active');
    }
    else {
        isPlaying = 1;
        Player2.current.textContent = 0;
        Player1.panel.classList.add('active');
        Player2.panel.classList.remove('active');
    }
};

// For Roll Function
function rick() {
    if (inGame)
        rollDice();
        console.log(dice)
        if (dice === 1) {
            changePlayer();
            currentTotal = 0;
        }
        else {
            currentTotal += dice;
            isPlaying ? Player1.current.textContent = currentTotal : Player2.current.textContent = currentTotal;
        }
};

// For Hold function
function keep() {
    if (inGame) {
        scores[isPlaying] += currentTotal;
        if(isPlaying === 1) {
            Player1.score.textContent = scores[isPlaying];
        }
            else {
                Player2.score.textContent = scores[isPlaying];
            }
            console.log(goal)
        currentTotal = 0;
        if(Player1.score.textContent >= goal){
            document.querySelector('.player-0-panel').classList.add("winner");
            document.getElementById('name-0').textContent = 'WINNER !';
            document.querySelector('.player-0-panel').classList.remove("active");
            die.style.display = 'none';
            inGame = false;
            roll.style.display = 'none';
            hold.style.display = 'none';
        }
        else if (Player2.score.textContent >= goal) {
            console.log(isPlaying)
            document.querySelector('.player-1-panel').classList.add("winner");
            document.getElementById('name-1').textContent = 'WINNER !';
            document.querySelector('.player-1-panel').classList.remove("active")
            die.style.display = 'none';
            inGame = false;
            roll.style.display = 'none';
            hold.style.display = 'none';
        }
        else
            changePlayer();
    }
};

function insert() {
    goal = parseInt(score.value)
    limit.textContent = goal
};


// Program Flow


start();

/* New game button */
newGame.addEventListener('click', function() {
    start();
});


/* Roll button */
roll.addEventListener('click', function() {
    rick();
});


/* Hold button */
hold.addEventListener('click', function() {
    keep();        
});

score.addEventListener('change', function () {
    insert();
});