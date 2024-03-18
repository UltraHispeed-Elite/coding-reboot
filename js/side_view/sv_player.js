function sv_playerMovement() {
    if(kb.pressing("a")) {
        sv_player.x -=5;
    }

    if(kb.pressing("d")) {
        sv_player.x +=5;
    }

    if(kb.presses("space") && sv_player.colliding(platform)) {
        sv_player.vel.y -= 5;
    }
}