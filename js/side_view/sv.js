function sv_setup() {
    if(gameState === "side_view") {
        new p5(side_view_sketch);
    }
}

function sv_draw() {
    if(gameState === "side_view") {
        sv_playerMovement();
    }
}

var side_view_sketch = function(sketch) {
    sketch.setup = function() {
        let sv_screen = this.createCanvas(400,400);
        sv_screen.position(0,0);

        this.world.gravity.y = 20;

        sv_player = new this.Sprite(200,200,50,50);
        sv_player.rotationLock = true;

        platform = new this.Sprite(200,400, 800, 25);
        platform.collider = 's';
    }

    sketch.draw = function() {
        this.background("black");

        if(clear === true) {
            game_clear(sketch);
            clear = false;
        }
    }
}