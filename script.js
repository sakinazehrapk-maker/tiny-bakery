let money = 0;
let score = 0;
let ordersCompleted = 0;
let betterOven = false;
let fancyFrosting = false;
let extraCounter = false;
let currentOrder = {
    cake: "",
    decoration: ""
};
let bakedCake = "";
let chosenDecoration = "";
let isBaking = false;
let bakingComplete = false;
let patience = 20;
let patienceTimer;
let customerWaiting = false;
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
const patienceProgress =
    document.getElementById("patience-progress");
const patienceTime =
    document.getElementById("patience-time");
const ovenUpgrade =
    document.getElementById("oven-upgrade");
const frostingUpgrade =
    document.getElementById("frosting-upgrade");
const counterUpgrade =
    document.getElementById("counter-upgrade");
const decorationButtons =
    document.querySelectorAll(".decoration");
function resetCakeDisplay() {
    const cake =
        document.querySelector(".cake");
    cake.className =
        "cake";
    const decoration =
        document.querySelector(".cake-decoration");
    decoration.textContent =
        "✨";
}
function setCakeFlavor(cakeName) {
    const cake =
        document.querySelector(".cake");
    cake.className =
        "cake";
    if (cakeName === "Vanilla Cake") {
        cake.classList.add("vanilla");
    }
    else if (cakeName === "Chocolate Cake") {
        cake.classList.add("chocolate");
    }
    else if (cakeName === "Strawberry Cake") {
        cake.classList.add("strawberry");
    }
}
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
    gameMessage.textContent =
        "A new customer has arrived!";
        resetCakeDisplay();
    startPatienceTimer();
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
    const bakingSpeed =
    betterOven ? 50 : 100;
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
            setCakeFlavor(bakedCake);
            bakeButton.disabled =
                false;
        }
    }, bakingSpeed);
});
decorationButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (!bakingComplete) {
            gameMessage.textContent =
                "Bake the cake first!";
            return;
        }
        const decorationName =
            button.dataset.decoration;
        chosenDecoration =
            decorationName;
        const decorationEmoji =
            button.textContent;
        const cake =
            document.querySelector(".cake");
        const decoration =
            document.querySelector(".cake-decoration");
        decoration.textContent =
            decorationEmoji;
        cake.classList.add("decorated");
        gameMessage.textContent =
            `You added ${decorationEmoji} to the cake! `;
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
        clearInterval(patienceTimer);
        customerWaiting = false;
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
function startPatienceTimer() {
    clearInterval(patienceTimer);
    patience = 20;
    customerWaiting = true;
    patienceProgress.style.width =
        "100%";
    patienceTime.textContent =
        patience + "s";
    patienceTimer =
        setInterval(function() {
            patience--;
            patienceTime.textContent =
                patience + "s";
            const percentage =
                (patience / 20) * 100;
            patienceProgress.style.width =
                percentage + "%";
            if (patience <= 0) {
                clearInterval(
                    patienceTimer
                );
                customerWaiting = false;
                gameMessage.textContent =
                    "The customer got tired of waiting and left!";
                orderText.textContent =
                    "No customer...";
                bakeButton.disabled = true;
                serveButton.disabled = true;
                setTimeout(function() {
                    bakeButton.disabled =
                        false;
                    serveButton.disabled =
                        false;
                    createOrder();
                }, 2000);
            }
        }, 1000);
}
ovenUpgrade.addEventListener("click", function() {
    if (betterOven) {
        return;
    }
    if (money < 50) {
        gameMessage.textContent =
            "You need 50 coins for the Better Oven!";
        return;
    }
    money -= 50;
    betterOven = true;
    moneyDisplay.textContent =
        money;
    ovenUpgrade.textContent =
        "Purchased";
    ovenUpgrade.disabled = true;
    gameMessage.textContent =
        "Your oven is now faster!";
});
frostingUpgrade.addEventListener("click", function() {
    if (fancyFrosting) {
        return;
    }
    if (money < 100) {
        gameMessage.textContent =
            "You need 100 coins for Fancy Frosting!";
        return;
    }
    money -= 100;
    fancyFrosting = true;
    moneyDisplay.textContent =
        money;
    frostingUpgrade.textContent =
        "Purchased";
    frostingUpgrade.disabled = true;
    gameMessage.textContent =
        "Fancy Frosting unlocked!";
});
counterUpgrade.addEventListener("click", function() {
    if (extraCounter) {
        return;
    }
    if (money < 75) {
        gameMessage.textContent =
            "You need 75 coins for the Extra Counter!";
        return;
    }
    money -= 75;
    extraCounter = true;
    moneyDisplay.textContent =
        money;
    counterUpgrade.textContent =
        "Purchased";

    counterUpgrade.disabled = true;
    gameMessage.textContent =
        "Customers will now wait longer!";
});
createOrder();