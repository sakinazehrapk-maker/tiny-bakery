let money = 0;
let score = 0;
let ordersCompleted = 0;
const moneyDisplay = document.getElementById("money");
const scoreDisplay = document.getElementById("score");
const ordersDisplay = document.getElementById("orders");
const orderText = document.getElementById("order-text");
const gameMessage = document.getElementById("game-message");
const cakeDisplay = document.getElementById("cake-display");
const bakeButton = document.getElementById("bake-button");
const serveButton = document.getElementById("serve-button");
bakeButton.addEventListener("click", function () {
    gameMessage.textContent = "Your cake is baking!";
});
const decorationButtons =
    document.querySelectorAll(".decoration");
decorationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const decoration =
            button.dataset.decoration;
        gameMessage.textContent =
            `You added ${decoration} to the cake!`;
    });
});
serveButton.addEventListener("click", function() {
    money += 10;
    score += 100;
    ordersCompleted++;
    moneyDisplay.textContent = money;
    scoreDisplay.textContent = score;
    ordersDisplay.textContent = ordersCompleted;
    gameMessage.textContent =
        "Yay! Customer served!";
});