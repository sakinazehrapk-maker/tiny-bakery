let money = 0;
let score = 0;
let ordersCompleted = 0;
let currentOrder = {
    cake: "",
    decoration: ""
};
const cakes = [
    {
        name: "Vanilla Cake",
        emoji: "🍰"
    },
    {
        name: "Chocolate Cake",
        emoji: "🍫"
    },
    {
        name: "Strawberry Cake",
        emoji: "🍓"
    }
];
const decorations = [
    {
        name: "Strawberries",
        emoji: "🍓"
    },
    {
        name: "Flowers",
        emoji: "🌸"
    },
    {
        name: "Sprinkles",
        emoji: "✨"
    },
    {
        name: "Chocolate",
        emoji: "🍫"
    }
];
const moneyDisplay =
    document.getElementById("money");
const scoreDisplay =
    document.getElementById("score");
const ordersDisplay =
    document.getElementById("orders");
const orderText =
    document.getElementById("order-text");
const gameMessage =
    document.getElementById("game-message");
const cakeDisplay =
    document.getElementById("cake-display");
const bakeButton =
    document.getElementById("bake-button");
const serveButton =
    document.getElementById("serve-button");
function createOrder() {
    const randomCake =
        cakes[Math.floor(Math.random() * cakes.length)];
    const randomDecoration =
        decorations[
            Math.floor(
                Math.random() * decorations.length
            )
        ];
    currentOrder.cake =
        randomCake.name;
    currentOrder.decoration =
        randomDecoration.name;
    orderText.textContent =
        `I'd like a ${randomCake.name} with ${randomDecoration.emoji} ${randomDecoration.name}, please!`;
    cakeDisplay.textContent = "🍰";
    gameMessage.textContent =
        "A new customer has arrived!";
}
bakeButton.addEventListener("click", function() {
    gameMessage.textContent =
        `Baking the ${currentOrder.cake}...`;
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
    moneyDisplay.textContent =
        money;
    scoreDisplay.textContent =
        score;
    ordersDisplay.textContent =
        ordersCompleted;
    gameMessage.textContent =
        "Yay! Customer served!";
    setTimeout(function() {
        createOrder();
    }, 1000);
});
createOrder();