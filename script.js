const gameBoard = (() => {
    let gameboard = ["","","","","","","","","",""];
    
    const getBoard = () => {
        return gameboard;
    }
    
    return{
        getBoard
    }
})();

const gameFlow = (() => {

    const startGame = () => {
        //create two players
        const names = displayController.getNames();
        console.log(names);
        player1 = Player()
    }

    return{
        startGame
    }
})();

const displayController = (() => {
    const cacheDom = () => {
        this.$content = document.getElementById("content");
    }

    const renderStartForm = () => {
        this.$content.innerHTML = 
        '<div id="start-form">\n' + 
        '   <p>Enter your names:</p>\n' +
        '   <label for="player1">Player 1</label>\n' + 
        '   <input id="player1" type="text"><br>\n' +
        '   <label for="player2">Player 2</label>\n' +
        '   <input id="player2" type="text"><br><br>\n' +
        '   <button id="start-btn">Start Game!</button>\n' +
        '   </div>';
    }

    const renderBoard = (gameboard) => {
        this.$content.innerHTML = 
        `<div id="board">\n` +
        `    <div class="box">${gameboard[0]}</div>\n` +
        `    <div class="box">${gameboard[1]}</div>\n` +
        `    <div class="box">${gameboard[2]}</div>\n` +
        `    <div class="box">${gameboard[3]}</div>\n` +
        `    <div class="box">${gameboard[4]}</div>\n` +
        `    <div class="box">${gameboard[5]}</div>\n` +
        `    <div class="box">${gameboard[6]}</div>\n` +
        `    <div class="box">${gameboard[7]}</div>\n` +
        `    <div class="box">${gameboard[8]}</div>\n` +
        `</div>\n`;
    }

    const bindStartBtn = () => {
        const startBtn = document.getElementById("start-btn");
        startBtn.addEventListener("click", gameFlow.startGame);
    }

    const getNames = () => {
        const name1 = document.getElementById("player1").value;
        console.log(name1);
        const name2 = document.getElementById("player2").value;
        return [name1, name2];
    }
    cacheDom();
    renderStartForm();
    bindStartBtn();
    return{getNames};
})();

const Player = (name, sign) => {
    return{}
}
