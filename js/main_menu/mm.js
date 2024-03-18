function mm_setup() {
    if(gameState === "main_menu") {
        new p5(main_menu_sketch);
    }
}

function mm_draw() {
    if(gameState === "main_menu") {
        console.log("main menu screen");
    }
}

var main_menu_sketch = function(sketch) {
    sketch.setup = function() {
        let mm_screen = this.createCanvas(400,400);
        mm_screen.position(0,0);

        start_button = new this.Sprite(200,200,50,50);
    }

    sketch.draw = function() {
        this.background("black");

        if(start_button.mouse.hovering()) {
            start_button.color = "red";
        }else {
            start_button.color = "blue";
        }

        if(start_button.mouse.pressing()) {
            gameSwitch("top_down");
        }

        if(clear === true) {
            game_clear(sketch);
            clear = false;
        }
    }
}