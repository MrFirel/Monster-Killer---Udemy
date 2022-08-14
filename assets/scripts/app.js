const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster.','100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
    alert('Invalid value, maximum life seted to 100.');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {  
    let logEntryData;

    function logEntry(target){
        if (target != null){
            logEntryData = {
                event: event,
                value: value,
                target: target,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            }
        } else {
            logEntryData = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            }
        }
        
    }

    switch (event) {
        case EVENT_PLAYER_ATTACK: {
            logEntry('MONSTER');
        }
        case EVENT_PLAYER_STRONG_ATTACK: {
            logEntry('MONSTER');
        }
        case EVENT_MONSTER_ATTACK: {
            logEntry('PLAYER');           
        }
        case EVENT_PLAYER_HEAL: {
            logEntry('PLAYER');
        }
        case EVENT_GAME_OVER: {
            logEntry();
        }
    }
    battleLog.push(logEntryData);
}

function attackHandler() {
    damageToMonster(ATTACK_VALUE, EVENT_PLAYER_ATTACK);    
    endRound();
}

function strongAtackHandler() {
    damageToMonster(STRONG_ATTACK_VALUE, EVENT_PLAYER_STRONG_ATTACK);
    endRound();
}

function damageToMonster (damage, attack) {
    let attackDamage;
    if (attack == EVENT_PLAYER_ATTACK) {
        attackDamage = dealMonsterDamage(damage);
        currentMonsterHealth -= attackDamage;
        writeToLog(EVENT_PLAYER_ATTACK, attackDamage, currentMonsterHealth, currentPlayerHealth);
    } else if (attack == EVENT_PLAYER_STRONG_ATTACK) {
        attackDamage = dealMonsterDamage(damage);
        currentMonsterHealth -= attackDamage;
        writeToLog(EVENT_PLAYER_ATTACK, attackDamage, currentMonsterHealth, currentPlayerHealth);
    }
}

function damageToPlayer (damage) {  
    let attackDamage = dealPlayerDamage(damage); 
    currentPlayerHealth -= attackDamage;
    writeToLog(EVENT_MONSTER_ATTACK, attackDamage, currentMonsterHealth, currentPlayerHealth); 
}

function healPlayerHandler() {
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal more than your max initial health!")
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);   
    currentPlayerHealth += healValue;
    writeToLog(EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    damageToPlayer(MONSTER_ATTACK_VALUE);

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');        
    }
    
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        writeToLog(EVENT_GAME_OVER, 'PLAYER WON!', currentMonsterHealth, currentPlayerHealth);
        reset()
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        writeToLog(EVENT_GAME_OVER, 'MONSTER WON!', currentMonsterHealth, currentPlayerHealth);
        reset()
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        writeToLog(EVENT_GAME_OVER, 'A DRAW!', currentMonsterHealth, currentPlayerHealth);
        reset()
    }
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAtackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);