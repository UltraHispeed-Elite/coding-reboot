//initial start to find the current game state (good for when window is reloaded)

var gameState = findGameState();

function findGameState() {
    let find = sessionStorage.getItem("game_state");

    if(find !== null) {
        return find;
    }else {
        return "main_menu";
    }
}

var load = false;
var saveFile;

var packetSender = {
    "x": 0, // player.x
    "y": 0, // player.y
}

var see_console = false;
// core setup and draw functions
var screen;

function setup() {
    screen = createCanvas(800,450);
    screen.position(0,0);

    if(gameState === "main_menu") {
        sessionStorage.setItem("game_state", gameState);
        mm_setup();
    }else if(gameState === "game") {
        sessionStorage.setItem("game_state", gameState);
        game_setup();
        ui_setup();
    }
}

function draw() {
    if(kb.presses('c')) {
        see_console = true;
    }else if (kb.presses('v')){
        see_console = false;
    }
    if(gameState === "main_menu") {
        mm_draw();
    }else if(gameState === "game") {
        game_draw();
        ui_draw();
    }
}

function game_clear(sketch) {
    //ONLY USE WHEN CHANGING SCENES
    sketch.remove();
}

function gameSwitch(newScene){
    sessionStorage.setItem("game_state", newScene);
    gameState = findGameState();
    clear = true;
    setup();
}

// main menu functions and variables
var start_button;
var continue_button;

function mm_setup() {
    new p5(main_menu_sketch);
}

function mm_draw() {
    if(start_button.mouse.hovering()){
        start_button.color = "red";
    }else {
        start_button.color = "blue";
    }

    if(continue_button.mouse.hovering()){
        continue_button.color = "red";
    }else {
        continue_button.color = "blue";
    }

    if(start_button.mouse.pressing()) {
        gameSwitch("game");
    }

    if(continue_button.mouse.pressing()) {
        load = true;
        gameSwitch("game");
    }
}

var main_menu_sketch = function(sketch) {
    sketch.setup = function() {
        let mm_screen = this.createCanvas(800,450);
        mm_screen.position(0,0);

        start_button = new this.Sprite(100,200,100,50);
        start_button.text = "New Game";

        continue_button = new this.Sprite(300,200,100,50);
        continue_button.text = "Load Game";
    }

    sketch.draw = function() {
        this.background("black");

        this.camera.x = 200;
        this.camera.y = 200;

        if(clear === true) {
            game_clear(sketch);
            clear = false;
        }
    }
}

// game functions and variables
var player;

function game_setup() {
    new p5(game_sketch);
    if(load === true) {
        checkSavedGame();
        load = false;
    }
    checkPacketData();
}

function game_draw() {
    if(kb.presses('p')) {
        sessionStorage.removeItem("packet");
        gameSwitch("main_menu");
    }
    player_movement();
    sendData();
    saveGame();
}

function player_movement() {

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

    packetSender["x"] = player.x;
    packetSender["y"] = player.y;

    saveFile = packetSender;
}

function sendData() {
    if(frameCount % 100 === 0) {
        sessionStorage.setItem("packet", JSON.stringify(packetSender));
        if(see_console === true) {
            console.log("packet sent");
        }
    }
}

function saveGame() {
    if(kb.pressed("m")) {
        localStorage.setItem("save_file", JSON.stringify(saveFile));
        if(see_console === true) {
            console.log("saved");
        }
    }
}

function checkPacketData() {
    let find = sessionStorage.getItem("packet");
    let isPacket = JSON.parse(find);

    if(isPacket !== null) {
        player.x = isPacket["x"];
        player.y = isPacket["y"];
    }else {
        if(see_console === true) {
            console.log("no packet available");
        }
    }
}

function checkSavedGame() {
    let find = localStorage.getItem("save_file");
    let isFile = JSON.parse(find);

    if(isFile !== null) {
        player.x = isFile["x"];
        player.y = isFile["y"];
    }else {
        if(see_console === true) {
            console.log("no File available");
        }
    }
}

var game_sketch = function(sketch) {
    sketch.setup = function() {
        let game_screen = this.createCanvas(800,450);
        game_screen.position(0,0);

        player = new this.Sprite(200,200,50,50);
    }

    sketch.draw = function() {
        this.background("black");

        this.camera.x = player.x;
        this.camera.y = player.y;

        if(clear === true) {
            game_clear(sketch);
            clear = false;
        }
    }
}

// user interface functions and variables

var player_stats;

function ui_setup() {
    new p5(user_interface_sketch);
}

function ui_draw() {
    
}

var user_interface_sketch = function(sketch) {
    sketch.setup =  function() {
        let ui_screen = this.createCanvas(800,450);
        ui_screen.position(0,0);

        player_stats = new this.Sprite(100,100,25,25);
    }

    sketch.draw = function() {
        if(frameCount % 2 === 0) {
            sketch.clear();
        }
    }
}