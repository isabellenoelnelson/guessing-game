/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
  }
  
  function shuffle(arr) {
    //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
    for (let i = arr.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
    return arr;
  }
  
  class Game {
    constructor() {
      this.playersGuess = null;
      this.winningNumber = generateWinningNumber();
      this.pastGuesses = [];
    }
  
    difference() {
      return Math.abs(this.playersGuess - this.winningNumber);
    }
  
    isLower() {
      if (this.playersGuess < this.winningNumber) {
        return true;
      } else {
        return false;
      }
    }
  
    playersGuessSubmission(guess) {
      if (typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw 'That is an invalid guess.'
      } 
  
      this.playersGuess = guess;
  
      return this.checkGuess();
      }
    
    checkGuess() {
  
      let feedbackText = '';
  
      if (this.playersGuess === this.winningNumber) {
        feedbackText = 'You Win!';
      } else if (this.pastGuesses.includes(this.playersGuess)) {
        feedbackText = 'You have already guessed that number.';
      } else {
        this.pastGuesses.push(this.playersGuess);
        if (this.pastGuesses.length === 5) {
          feedbackText = 'You Lose.';
        } else {
          let diff = this.difference();
          if (diff < 10) feedbackText = "You're burning up!";
          else if (diff < 25) feedbackText = "You're lukewarm.";
          else if (diff < 50) feedbackText = "You're a bit chilly.";
          else feedbackText = "You're ice cold!";
        }
      }
     
       return feedbackText;
    }
  
    provideHint() {
      const hintArray = [
        this.winningNumber, 
        generateWinningNumber(),
        generateWinningNumber()
      ];
  
      return shuffle(hintArray);
    }
  }
  
  function newGame() {
    return new Game();
  }
  
  function playGame() {
    let game = newGame();
    document.getElementById("textBox").value = "";
    let submitButton = document.getElementById("submit");
    let hintButton = document.getElementById("hint");
    let resetButton = document.getElementById("reset");
  
    submitButton.addEventListener("click", () => {
      let guess = +document.getElementById("textBox").value;
      document.getElementById("textBox").value = "";
  
      document.getElementById("message").innerHTML = game.playersGuessSubmission(
        guess
      );
    });
  
    hintButton.addEventListener("click", () => {
      hintArr = game.provideHint();
      document.getElementById(
        "message"
      ).innerHTML = `One of these is correct number! ${hintArr[0]}, ${hintArr[1]}, ${hintArr[2]}`;
    });
  
    resetButton.addEventListener("click", () => {
      document.location.reload();
    });
  }
  playGame();