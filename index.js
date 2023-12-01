function main() {
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

function game(time) {
    const initial = document.getElementById("initial");


};