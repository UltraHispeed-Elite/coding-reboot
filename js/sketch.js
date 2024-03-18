// System Variables
var gameState = findGameState();

// Game Variables
var screen;
    // Main Menu Variables
    var start_button;

function setup() {
    screen = createCanvas(400,400);
    screen.position(0,0);

    if(gameState === "main_menu") {
        sessionStorage.setItem("gameState", gameState);
        mm_setup();
    }
}

function draw() {
    mm_draw();
}