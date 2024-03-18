// System Variables
var gameState = findGameState();

// Game Variables
var screen;
    // Main Menu Variables
    var start_button;

    // Top Down Variables
    var td_player;

function setup() {
    screen = createCanvas(400,400);
    screen.position(0,0);

    if(gameState === "main_menu") {
        sessionStorage.setItem("gameState", gameState);
        mm_setup();
    }else if(gameState === "top_down") {
        sessionStorage.setItem("gameState", gameState);
        td_setup();
    }
}

function draw() {
    mm_draw();
    td_draw();
}

function game_clear(sketch) {
    //ONLY USE WHEN CHANGING SCENES
    sketch.remove();
}

function gameSwitch(newScene){
    sessionStorage.setItem("gameState", newScene);
    gameState = findGameState();
    clear = true;
    setup();
}