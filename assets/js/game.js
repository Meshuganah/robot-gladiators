
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1)) + min;

    return value;
}

var fightOrSkip = function() {
    var promptFight = window.prompt(`Would you like to FIGHT or SKIP this battle?`);

    if (promptFight === "" || promptFight === "null") {
        window.alert(`Please provide a valid answer.`)
        return fightOrSkip();
    }

    if (promptFight.toLowerCase() === "skip") {
        var confirmSkip = window.confirm(`Are you sure you'd like to quit?`);

        if (confirmSkip) {
            window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye.`);
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            shop();
        }
    }
}

var fight = function(enemy) {
    var isPlayerTurn = function() {
        if (Math.random > 0.5) {
            return true;
        } else {
            return false;
        }

    }

    while(enemy.health > 0 && playerInfo.health > 0) {

        if (isPlayerTurn()) {
            if (fightOrSkip()) {
                break;
            }
            playerDamage();
            enemyDamage();
            isPlayerTurn();
        } else {
            enemyDamage();
            if (fightOrSkip()) {
                break;
            }
            playerDamage();
            isPlayerTurn();
        }
    }


        function playerDamage() {
            // Calculate damage done to enemy
            var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked
            console.log(
                `${playerInfo.name} attacked ${enemy.name} for ${damage} damage! ${enemy.name} now has ${enemy.health} remaining!`
            )

            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(`${enemy.name} has died!`);
                playerInfo.money = playerInfo.money + 20;
            } else {
                window.alert(`${enemy.name} still has ${enemy.health} health left!`)
            }
        }
    
        function enemyDamage() {
            // Calculate damage to player
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked
            console.log(
                `${enemy.name} attacked ${playerInfo.name} for ${damage}. ${playerInfo.name} now has ${playerInfo.health} health remaining.`
            )

            // Check player health
            if (playerInfo.health <= 0) {
                window.alert(`${playerInfo.name} has died!`);
            } else {
                window.alert(`${playerInfo.name} still has ${playerInfo.health} health remaining!`)
            }
        }   
}

var startGame = function() {
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert(`Welcome to Robot Gladiators! Round ${i +1}!`)

            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40,60);
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert(`Great job, you've survived the game! You now have a score of ${playerInfo.money}`)
    } else {
        window.alert(`You've lost your robot in battle...`)
    }

    var currHighScore = localStore.getItem("score");
    if (currHighScore === null) {
        currHighScore = 0;
    }

    if (playerInfo.money > currHighScore) {
        window.alert(`Congrats! You're score of ${playerInfo.money} is higher than ${currHighScore}!`);
        localStorage.setItem("currHighScore", playerInfo.money);
        localStorage.setItem("name" , playerInfo.name);
    } else {
        window.alert(`I'm sorry! Your score of ${playerInfo.money} did not beat the high score of ${currHighScore}!`)
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
        `Would you like to (1)REFILL your health, (2)UPGRADE your attack, or (3)LEAVE the shop?`
    )

    switch(shopOptionPrompt) {
        case "1":
            playerInfo.refillHealth();
            break;

        case "2":
            playerInfo.upgradeAttack();
            break;
            
        case "3":
            window.alert("Leaving the store");
            break;

        case "default": 
            window.alert("You did not pick a valid option, please try again!");
            shop();
            break;
    }
}

var getPlayerName = function() {
    var name ="";

    while (name === "" || name === "null") {
        name = prompt("What is your robot's name?");
    }

    console.log(`Your roboty's name is ${name}`);
    return name;
}

var playerInfo = {
    name: window.getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },

    refillHealth: function() {
        if (this.money >= 7){
            window.alert(`Refilling player's health by 20 for $7`);
            this.health += 20;
            this.money -+ 7;
        } else {
            window.alert(`You don't have enough money!`);
        }
    },

    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert(`Upgrading player's attack by 6 for $7`);
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert(`You don't have enough money!`);
        }        
    },
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14),
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14),
    }
];

startGame();