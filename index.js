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
        game(9999999);
    });
};

// main game functions
function game(time) {
    console.log("game start")
    console.log(time + " seconds");
    const initial = document.getElementById("initial");
    const game = document.getElementById("game");

    initial.style.display = "none";
    game.style.display = "flex";


    // generating cards in size=4x4 grid in random positions
    let size = 4;

    let cardImg = []
    for (let i = 0; i < size * size; i++) {
        cardImg.splice(Math.random() * (i + 1), 0, Math.ceil((i + 1) / 2))
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
                "pos-y": j,
                "image": cardImg[(i * size) + j],
                "found": false
            });
            game.appendChild(div);
        };
    };
    console.table(cards);


    // click card function
    let clickedPrev = [];
    let clickedAmnt = 0;
    let foundPairs = 0;

    function cardClick() {
        // console.warn("click");
        // console.log(this.id);
        const posX = this.id.split(",")[0].split(":")[1];
        const posY = this.id.split(",")[1].split(":")[1];
        let clickedCard = this;

        // check card image
        for (let i = 0; i < cards.length; i++) {
            if (posX == cards[i]["pos-x"] &&
                posY == cards[i]["pos-y"] &&
                clickedAmnt <= 1 &&
                clickedPrev[3] != clickedCard.id &&
                cards[i].found == false &&
                lost != true &&
                won != true) {

                console.log(clickedAmnt);
                clickedAmnt++;

                clickedCard.style.backgroundImage = `url(img/${cards[i]["image"]}.jpg)`;
                console.log(`Clicked card position:\nx = ${posX}, y = ${posY}`);
                console.log(cards[i]["image"]);

                if (timerOn != true) {
                    timer();
                };

                // check if card is same as previous one
                if (clickedPrev.length > 0) {
                    (function (next) {
                        if (cards[i]["image"] == clickedPrev[2]) {
                            console.log("same");
                            cards[i].found = true;
                            cards[clickedPrev[4]].found = true;
                            foundPairs++;
                            if (foundPairs >= size * 2) {
                                document.getElementById("win").style.display = "flex";
                                won = true;
                            };
                            next()

                        } else {
                            console.log("different");
                            setTimeout(() => {
                                console.log("dissapear");
                                document.getElementById(clickedPrev[3]).style.backgroundImage = "url(img/0.jpg)";
                                clickedCard.style.backgroundImage = "url(img/0.jpg)";
                                next()
                            }, 750);

                        };
                    }(function () {
                        console.log("timer reset");
                        clickedPrev = [];
                        clickedAmnt = 0;
                    })
                    );
                    break;
                };

                clickedPrev = [posX, posY, cards[i]["image"], clickedCard.id, i];
            };
        };

    };

    // timer counting time to losing game
    let timerOn = false;
    let won = false;
    let lost = false;

    function timer() {
        timerOn = true;

        const timer = document.getElementById("timer")
        const timerText = document.getElementById("timerText");
        const lose = document.getElementById("lose");

        timer.style.display = "flex"

        const timeStart = new Date();
        console.log("timer start", timeStart);

        const timeInterval = setInterval(() => {
            const timeNow = new Date();
            const timeDelta = timeNow - timeStart;
            // console.log(timeDelta)

            // timer itself with minutes:secounds.milisecounds
            let timeMil = (1000 - (timeDelta % 1000)).toString();
            let timeSek = ((time - Math.ceil(timeDelta / 1000)) % 60).toString();
            let timeMin = (Math.floor((Math.floor(time - (timeDelta / 1000))) / 60)).toString();

            while (timeMil.length < 4) {
                timeMil = "0" + timeMil;
            };
            timeMil = timeMil.substring(1, 4);
            while (timeSek.length < 2) {
                timeSek = "0" + timeSek;
            };
            while (timeMin.length < 2) {
                timeMin = "0" + timeMin;
            };

            console.log(`${timeMin} ${timeSek} ${timeMil}`)
            timerText.innerText = `${timeMin}:${timeSek}.${timeMil}`

            // checking if time has ran out or player has won
            if (timeDelta >= time * 1000) {
                lost = true;
                clearInterval(timeInterval);
                timerText.innerText = null;
                lose.style.display = "flex";
            };
            if (won == true) {
                clearInterval(timeInterval);
            };

        }, 13);
    };
};

// reseting the game
function again() {
    const game = document.getElementById("game");
    const initial = document.getElementById("initial");
    const win = document.getElementById("win");
    const lose = document.getElementById("lose");
    const text = document.getElementById("text");
    const timer = document.getElementById("timer");

    win.style.display = "none";
    lose.style.display = "none";
    game.style.display = "none";
    timer.style.display = "none";
    initial.style.display = "flex";

    text.innerText = "MEMORY"
    game.innerHTML = null;

    return console.log("game reset");
};