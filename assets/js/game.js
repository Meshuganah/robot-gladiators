var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Robotro", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Alert players that they are starting the round 
window.alert("Welcome to Robot Gladiators!");

var fight = function(enemyName) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.")
  
    // If player choses to fight, then fight
    if (promptFight.toUpperCase() === "FIGHT") {
        // Subtract the value of playerAttack from the value of enemyHealth and use that value in the enemyHealth variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        )

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(`${enemyName} has died!`)
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
            window.alert(`${playerName} has died!`)
        } else {
            window.alert(`${playerName} still has ${playerHealth} health remaining!`)
        }
    } else if (promptFight.toLocaleUpperCase() === "SKIP") {
        // Confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?")

        // If yes (true), leave fight
        if (confirmSkip) {
        window.alert(`${playerName} has chosen to skip the fight. Goodbye!`);
        // Subtract money from playerMoney for skipping
        playerMoney = playerMoney - 2;
        }
        // If no (false), ask question again by running fight() again
        else {
            fight()
        }
    } else {
        window.alert(`You need to choose a valid option. Try again!`)
    }


};

for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i])
}

