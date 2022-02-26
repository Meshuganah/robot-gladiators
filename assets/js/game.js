var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Robotro", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

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
            playerMoney = playerMoney - 10;
            console.log(`Money: ${playerMoney}`);
            break;
            }
        }

        // Subtract the value of playerAttack from the value of enemyHealth and use that value in the enemyHealth variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        )

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(`${enemyName} has died!`);
            playerMoney = playerMoney + 20;
            break;
        } else {
            window.alert(`${enemyName} still has ${enemyHealth} health left!`)
        }

        // Subtract the value of enemyAttack from playerHealth and update the playerHealth variable with that value
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked
        console.log(
            `${enemyName} attacked ${playerName}. ${playerName} now has ${playerHealth} health remaining.`
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
            enemyHealth = 50;
            fight(pickedEnemyName);
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

startGame();

