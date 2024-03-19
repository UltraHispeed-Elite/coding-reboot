var gameState = findGameState();

var start_button;

var player;


function setup() {
    let screen = createCanvas(400,400);
    screen.position(0,0);

    if(gameState === "main_menu") {
        start_button = new Sprite(200,200, 100, 50);
        start_button.text = "Begin";
    }else if(gameState === "game") {
        player = new Sprite(200,200,50,50);
    }
}

function draw() {
    background("black");

    if(gameState === "main_menu") {
        if(start_button.mouse.hovering()) {
            start_button.color = "red";
        }else {
            start_button.color = "blue";
        }

        if(start_button.mouse.pressing()) {

        }
    }else if(gameState === "game") {
        playerMovement();
    }
}

function playerMovement() {
    if(kb.pressing('w')) {
        player.y -= 5;
    }

    if(kb.pressing('a')) {
        player.x -= 5;
    }

    if(kb.pressing('s')) {
        player.y += 5;
    }

    if(kb.pressing('d')) {
        player.x += 5;
    }
}


function findGameState() {
    let find = sessionStorage.getItem("game_state");

    if(find !== null) {
        gameState = find;
    }else {
        gameState = "main_menu";
    }
}

function setNewState(new_state) {
    sessionStorage.setItem("game_state", new_state);
    gameState = findGameState();
}