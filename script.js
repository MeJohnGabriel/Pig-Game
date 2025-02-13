'use strict';

//Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
let score0Element = document.querySelector('#score--0');
let score1Element = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const newGameButtonElement = document.querySelector('.btn--new');
const rollDiceButtonElement = document.querySelector('.btn--roll');
const holdButtonElement = document.querySelector('.btn--hold');
// PUT it as DEAFEULT VARIABLES
let scores, currentScore, activePlayer, playing;
//Starting conditions
const init = function () {
  // THIS CONTAIN THE SCORE OF THE PLAYERS THAT WILL START AT 0
  // PLAYER 1 AT POSITION 0 , PLAYER 2 AT POSITION 1
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceElement.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
// CALLING THE FUNCTION SO IT'S ALREADY WORKING WHEN THE USER OPENS THE GAME
init();

// this is going to work like a switch: if activeplayer is 0(player--0) "and the number ONE"(else
// block does that job, to indetify when number 1 hits), then it's 1(player--1)'s turn ,
// if hits num ONE when it's player--1, switch back to zero.
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
  console.log(`Now its player ${activePlayer}'s turn`);
};

//Rolling the dice functionality

rollDiceButtonElement.addEventListener('click', function () {
  // 1. Generates a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`Dice rolled at number: ${dice}`);

    // 2. Display this random dice
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dice-${dice}.png`;

    // 3. Check if the number of the dice is 1, if it is, switch to the other player.

    // Add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      //Changin the currentScore by player, in this case player 1
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(`still player--${activePlayer}`);
    } else {
      //Switch players
      switchPlayer();
    }
  }
});

holdButtonElement.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    // scores will be like: scores[0] or scores[1] because the activePlayer that switches like that
    //will sum the currentscore with the score in the current position of the array score
    scores[activePlayer] += currentScore; // --> scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if the player's score is >= 100 if it is finish the game
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //If it's not switch to the next player
      switchPlayer();
    }
  }
});

newGameButtonElement.addEventListener('click', init);
/*    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  scores = 0;
  currentScore = 0;
  document.getElementById(`score--0`).textContent = scores;
  document.getElementById(`score--1`).textContent = scores;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
*/
