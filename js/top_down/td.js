function td_setup() {
    if(gameState === "top_down") {
        new p5(top_down_sketch);
    }
}

function td_draw() {
    if(gameState === "top_down") {
        td_playerMovement();
    }
}

var top_down_sketch = function(sketch) {
    sketch.setup = function() {
        let td_screen = this.createCanvas(400,400);
        td_screen.position(0,0);

        td_player = new this.Sprite(200,200,50,50);
    }

    sketch.draw = function() {
        this.background("black");

        if(clear === true) {
            game_clear(sketch);
            clear = false;
        }
    }
}