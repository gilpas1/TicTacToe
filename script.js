const gameBoard = (() => {
    let gameboard = ["","","","","","","","",""];
    
    const getBoard = () => {
        return gameboard;
    }
    
    const setBox = (index, sign) => {
        gameboard[index] = sign;
    }

    const clearBoard = () => {
        gameboard = ["","","","","","","","",""];
    }

    return{
        getBoard,
        setBox,
        clearBoard
    }
})();

const gameFlow = (() => {
    let players = [];
    let curPlayer = 1; //first player's turn
    let gameEnded = false;

    const getPlayers = () => {
        return players;
    }

    const startGame = () => {
        //create two players
        const names = displayController.getNames();
        player1 = Player(names[0], "X");
        player2 = Player(names[1], "O");
        players = [player1,player2];
        displayController.renderBoard();
    }

    const turn = ($box, $pAnnouncer) => {
        //if box already have a sign, ignore
        if($box.textContent != "" || gameEnded) return;
    
        const curSign = curPlayer==1?"X":"O";
        const boxIndex = $box.dataset.index;

        $box.textContent = curSign;
        gameBoard.setBox(boxIndex, curSign);
        

        const status = checkBoard();
        announce(status, $pAnnouncer);
        if(status != "continue"){
            gameEnded = true;
        }

        curPlayer = curPlayer==1?2:1;
    }

    const checkBoard = () => {
        const gameboard = gameBoard.getBoard();
        //check rows
        for(let i = 0; i <= 6; i+=3){
            if (gameboard[i] != "" && gameboard[i] == gameboard[i+1] && gameboard[i+1] == gameboard[i+2]){
                return gameboard[i];
            }
        }
        //check columns
        for(let i=0; i<=2; i++){
            if(gameboard[i] != "" && gameboard[i] == gameboard[i+3] && gameboard[i+3] == gameboard[i+6]){
                return gameboard[i];
            }
        }
        //check diagonals
        if((gameboard[4] != "" && gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8]) || 
            (gameboard[4] != "" && gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6])){
                return gameboard[4];
            }
        //check tie
        if(gameboard.indexOf("") == -1){
            return "tie";
        }
        return "continue"; //continue game
    }

    const announce = (status, $pAnnouncer) => {
        nextPlayer = curPlayer==1?2:1;
        console.log($pAnnouncer);
        switch (status){
            case "continue": 
                $pAnnouncer.textContent = `${players[nextPlayer-1].getName()}'s turn`;
                break;
            case "X":
                $pAnnouncer.textContent = `${players[0].getName()} WON`;
                break;
            case "O":
                $pAnnouncer.textContent = `${players[1].getName()} WON`;
                break;
            case "tie":
                $pAnnouncer.textContent = `It's a TIE`;
                break;
            default:
                prompt("ERROR in Announce");

        }
    }

    const clear = () => {
        console.log("DFDF");
        gameBoard.clearBoard();
        displayController.renderBoard();
        curPlayer = 1;
        gameEnded = false;
    }

    return{
        getPlayers,
        startGame,
        turn,
        clear
    }
})();

const displayController = (() => {
    let $content;
    let $pAnnouncer; 
    const cacheDom = () => {
        $content = document.getElementById("content");
    }

    const renderStartForm = () => {
        $content.innerHTML = 
        '<div id="start-form">\n' + 
        '   <p>Enter your names:</p>\n' +
        '   <label for="player1">Player 1</label>\n' + 
        '   <input id="player1" type="text"><br>\n' +
        '   <label for="player2">Player 2</label>\n' +
        '   <input id="player2" type="text"><br><br>\n' +
        '   <button id="start-btn">Start Game!</button>\n' +
        '   </div>';
    }

    const renderBoard = () => {
        $content.innerHTML = `<p id="announcer">${gameFlow.getPlayers()[0].getName()} starts</p>\n`;
        let gameboard = gameBoard.getBoard();
        $content.innerHTML += 
        `<div id="board">\n` +
        `    <div class="box", data-index="0">${gameboard[0]}</div>\n` +
        `    <div class="box", data-index="1">${gameboard[1]}</div>\n` +
        `    <div class="box", data-index="2">${gameboard[2]}</div>\n` +
        `    <div class="box", data-index="3">${gameboard[3]}</div>\n` +
        `    <div class="box", data-index="4">${gameboard[4]}</div>\n` +
        `    <div class="box", data-index="5">${gameboard[5]}</div>\n` +
        `    <div class="box", data-index="6">${gameboard[6]}</div>\n` +
        `    <div class="box", data-index="7">${gameboard[7]}</div>\n` +
        `    <div class="box", data-index="8">${gameboard[8]}</div>\n` +
        `</div>\n`;
        $content.innerHTML += '<button id="clearBtn">clear</button>'
        bindBoxes();
    }

    const bindStartBtn = () => {
        const startBtn = document.getElementById("start-btn");
        startBtn.addEventListener("click", gameFlow.startGame);
    }

    const bindBoxes = () => {
        $pAnnouncer = document.querySelector("p[id='announcer']");

        const boxes = document.querySelectorAll(".box");
        boxes.forEach($box => $box.addEventListener("click", boxClicked));   
        
        const $clearBtn = document.querySelector("button[id=clearBtn]");
        $clearBtn.addEventListener("click", gameFlow.clear);
    };
    
    const boxClicked = (event) => {
        const $box = event.target;
        gameFlow.turn($box, $pAnnouncer);
    }

    const getNames = () => {
        const name1 = document.getElementById("player1").value;
        const name2 = document.getElementById("player2").value;
        return [name1, name2];
    }

    cacheDom();
    renderStartForm();
    bindStartBtn();
    return{
        getNames,
        renderBoard,
    };
})();

const Player = (name, sign) => {
    const getName = () => {
        return name;
    }
    const getSign = () => {
        return sign;
    }
    return{
        getName,
        getSign
    }
}
