const title = document.querySelector('.container').firstElementChild;
const dice = document.querySelectorAll(".dice");

if(performance.navigation.type){
    var player1 = randomize(player1, 0);
    var player2 = randomize(player2, 1);
    displayWinner(player1, player2);
}

function randomize(player, num){
    player = Math.floor(Math.random() * 6) + 1;
    dice[num].lastElementChild.setAttribute('src', 'images/dice'+player+'.png');
    return player;
}

function displayWinner(player1, player2){
    if(player1 == player2){
        title.innerText = 'Draw';
    }
    else if(player1 > player2){
        title.innerText = "🚩Player 1 Wins!"
    }
    else{
        title.innerText = "Player 2 Wins!🚩";
    }
}