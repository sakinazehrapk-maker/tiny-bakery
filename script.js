let money = 0;
let score = 0;
let ordersCompleted = 0;
let currentOrder = {
    cake: "",
    decoration: ""
};
let bakedCake = "";
let chosenDecoration = "";
let isBaking = false;
let bakingComplete = false;
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
const bakingProgress =
    document.getElementById("baking-progress");
const bakingStatus =
    document.getElementById("baking-status");
const serveButton =
    document.getElementById("serve-button");
const decorationButtons =
    document.querySelectorAll(".decoration");
function createOrder() {
    const randomCake =
        cakes[
            Math.floor(
                Math.random() * cakes.length
            )
        ];
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
    cakeDisplay.textContent =
        "🍰";
    gameMessage.textContent =
        "A new customer has arrived!";
}
bakeButton.addEventListener("click", function() {
    if (isBaking) {
        return;
    }
    isBaking = true;
    bakingComplete = false;
    bakedCake =
        currentOrder.cake;
    let progress = 0;
    bakingProgress.style.width =
        "0%";
    bakingStatus.textContent =
        "Baking...";
    gameMessage.textContent =
        `Your ${bakedCake} is baking!`;
    bakeButton.disabled = true;
    const bakingTimer =
        setInterval(function() {
            progress += 5;
            bakingProgress.style.width =
                progress + "%";
            if (progress >= 100) {
                clearInterval(
                    bakingTimer
                );
                isBaking = false;
                bakingComplete = true;
                bakingStatus.textContent =
                    "Cake is ready!";
                gameMessage.textContent =
                    `Your ${bakedCake} is ready!`;
                const finishedCake =
                    cakes.find(function(cake) {
                        return cake.name === bakedCake;
                    });
                cakeDisplay.textContent =
                    finishedCake.emoji;
                bakeButton.disabled =
                    false;
            }
        }, 100);
});
decorationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (!bakingComplete) {
            gameMessage.textContent =
                "Bake the cake first!";
            return;
        }
        const decoration =
            button.dataset.decoration;
        chosenDecoration =
            decoration;
        const decorationEmoji =
            button.textContent;
        cakeDisplay.textContent =
            `${cakeDisplay.textContent} ${decorationEmoji}`;
        gameMessage.textContent =
            `You added ${decorationEmoji} to the cake!`;
    });
});
serveButton.addEventListener("click", function() {
    if (!bakingComplete) {
        gameMessage.textContent =
            "Wait! The cake isn't ready yet!";
        return;
    }
    const correctCake =
        bakedCake === currentOrder.cake;
    const correctDecoration =
        chosenDecoration ===
        currentOrder.decoration;
    if (
        correctCake &&
        correctDecoration
    ) {
        money += 20;
        score += 100;
        ordersCompleted++;
        moneyDisplay.textContent =
            money;
        scoreDisplay.textContent =
            score;
        ordersDisplay.textContent =
            ordersCompleted;
        gameMessage.textContent =
            "PERFECT ORDER! Customer is happy!";
    }
    else {
        gameMessage.textContent =
            "Oh no! That's not what the customer ordered!";
    }
    bakingComplete = false;
    bakedCake = "";
    chosenDecoration = "";
    bakingProgress.style.width =
        "0%";
    bakingStatus.textContent =
        "Oven is ready!";
    setTimeout(function() {
        createOrder();
    }, 1000);
});
createOrder();