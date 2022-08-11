const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    damageToMonster(ATTACK_VALUE);
    endRound();
}

function strongAtackHandler() {
    damageToMonster(STRONG_ATTACK_VALUE);
    endRound();
}

function damageToMonster (damage) {
    currentMonsterHealth -= dealMonsterDamage(damage);
}

function damageToPlayer (damage) {   
    currentPlayerHealth -= dealPlayerDamage(damage);    
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
    endRound();
}

function endRound() {
    damageToPlayer(MONSTER_ATTACK_VALUE);
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAtackHandler);
healBtn.addEventListener('click', healPlayerHandler);