var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Robotro", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1)) + min;

    return value;
}

var fight = function(enemyName) {
    while(enemyHealth > 0 && playerHealth > 0) {
        // Ask player if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.")
        
        // If player picks "skip" confirm and then stop the loop
        if (promptFight.toLocaleUpperCase() === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?")

            // If yes (true), leave fight
            if (confirmSkip) {
            window.alert(`${playerName} has chosen to skip the fight. Goodbye!`);
            // Subtract money from playerMoney for skipping
            playerMoney = Math.max(0, playerMoney - 10);
            console.log(`Money: ${playerMoney}`);
            break;
            }
        }

        // Calculate damage done to enemy
        var damage = randomNumber(playerAttack -3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        // Log a resulting message to the console so we know that it worked
        console.log(
            `${playerName} attacked ${enemyName} for ${damage} damage! ${enemyName} now has ${enemyHealth} remaining!`
        )

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(`${enemyName} has died!`);
            playerMoney = playerMoney + 20;
            break;
        } else {
            window.alert(`${enemyName} still has ${enemyHealth} health left!`)
        }

        // Calculate damage to player
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);
        // Log a resulting message to the console so we know that it worked
        console.log(
            `${enemyName} attacked ${playerName} for ${damage}. ${playerName} now has ${playerHealth} health remaining.`
        )

        // Check player health
        if (playerHealth <= 0) {
            window.alert(`${playerName} has died!`);
            break;
        } else {
            window.alert(`${playerName} still has ${playerHealth} health remaining!`)
        }
    } 
};

var startGame = function() {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert(`Welcome to Robot Gladiators! Round ${i +1}!`)
        
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40,60);
            fight(pickedEnemyName);

            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm(`The fight is over, visit the store before the next round? `);

                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert(`You have lost your robot in battle! Game Over!`);
            break;
        }
    }
    endGame();
}

var endGame = function() {
    if (playerHealth > 0) {
        window.alert(`Great job, you've survived the game! You now have a score of ${playerMoney}`)
    } else {
        window.alert(`You've lost your robot in battle...`)
    }

    var playAgainConfirm = window.confirm(`Would you like to play again?`);

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert(`Thank you for playing Robot Gladiators! Come back soon!`)
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt(
        `Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop?`
    )

    shopOptionPrompt = shopOptionPrompt.toLowerCase();
    switch(shopOptionPrompt) {
        case "refill":
            if(playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for $7");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert(`You don't have enough money!`)
            }
            break;

        case "upgrade":
            if(playerMoney >= 7) {
                window.alert("Upgrading Player's attack by 6 for $7");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert(`You don't have enough money!`)
            }
            break;

        case "leave":
            window.alert("Leaving the store");
            break;

        case "default": 
            window.alert("You did not pick a valid option, please try again!");
            shop();
            break;
    }
}

startGame();

