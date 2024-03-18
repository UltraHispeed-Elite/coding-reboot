function findGameState() {
    let find = sessionStorage.getItem("gameState");

    console.log(find);
    if(find === null) {
        return "main_menu"
    }else {
        return find;
    }
}