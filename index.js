// just adding event listeners 
function main() {
    console.log("loaded")
    const text = document.getElementById("text");
    const s30 = document.getElementById("30s");
    const s60 = document.getElementById("60s");
    const s90 = document.getElementById("90s");

    s30.addEventListener("click", function () {
        text.innerHTML = "MEMORY (30[s])";
        game(30);
    });
    s60.addEventListener("click", function () {
        text.innerHTML = "MEMORY (60[s])";
        game(60);
    });
    s90.addEventListener("click", function () {
        text.innerHTML = "MEMORY (90[s])";
        game(90);
    });
};

// main game functions
function game(time) {
    console.log("game start")
    const initial = document.getElementById("initial");
    const game = document.getElementById("game");

    initial.style.display = "none";
    game.style.display = "flex";


    // generating cards in size=4x4 grid in random positions
    let size = 4;

    let cardImg = []
    for (let i = 0; i < size * size; i++) {
        cardImg.splice(Math.random() * i, 0, Math.ceil((i + 1) / 2))
    };
    console.log(cardImg)

    let cards = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const div = document.createElement("div");

            div.className = "card";
            div.id = `pos-x:${i},pos-y:${j}`;
            div.style.width = 400 / size + "px";
            div.style.height = 400 / size + "px";
            div.addEventListener("click", cardClick)

            cards.push({
                "pos-x": i,
                "pos-x": j,
                "image": cardImg[(i * 4) + j]
            });
            game.appendChild(div);
        };
    };
    console.table(cards);

    // click card function
    function cardClick() {
        console.log(this.id)
    };
};
