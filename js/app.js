/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, lastDice2;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

init();

// kocka se ne prikazuje dok ne pocne igra
function hideDice() {
    document.getElementById('dice_1').style.display = 'none';
    document.getElementById('dice_2').style.display = 'none';
}

function nextPlayer() {
    // vrati na nulu i nek sljedeci igra
    roundScore = 0;
    lastDice = 0;
    lastDice2 = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    /* next player, može sa if else al je bolje sa ternary operator */
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    // postavljanje aktive na drugog playera
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. kocka se zavrti kad se klikne tipka roll
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // 2. prikazivanje kocke
        var dice1DOM = document.getElementById('dice_1');
        var dice2DOM = document.getElementById('dice_2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'images/dice-' + dice1 + '.png';
        dice2DOM.src = 'images/dice-' + dice2 + '.png';

        // 3. apdejtanje rezultata runde 
        
        if ((dice1 === 6 && dice2 === 6)) {
            // ukupni rezultat mu postane 0, i to se prikaže, te je igrati sljedećeg igraća
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2; // dodaj rezultat
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            lastDice1 = dice1;
            lastDice2 = dice2;
        } else {
            nextPlayer();
        }

    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // dodati trenutni score u totalni score
        scores[activePlayer] += roundScore;
        roundScore = 0;

        // update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = 0;


        var input = document.getElementById('final-score').value;
        var winningScore;
        // Undefined, 0, null, "" are coerced to false.
        // Anythin else is COERSED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }



        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            // hide the dice and show the winner
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        // next player
            nextPlayer();
            hideDice();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);