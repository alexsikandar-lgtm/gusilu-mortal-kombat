// ========== VARIABLES GLOBALES ==========

let gameState = {
    currentScreen: 'mainMenu',
    currentRound: 0,
    difficulty: 'normal',
    playerHP: 100,
    maxPlayerHP: 100,
    enemyHP: 100,
    maxEnemyHP: 100,
    currentEnemy: null,
    battlesWon: 0,
    enemySequence: ['kingKong', 'huevo', 'patata', 'pedro', 'santiago', 'abasca'],
    currentEnemyIndex: 0,
    isPlayerTurn: true,
    gameInProgress: false,
    combatLog: [],
    damageMultipliers: {
        'facil': 0.7,
        'normal': 1.0,
        'mortal': 1.5
    }
};

// ========== NAVEGACION DE PANTALLAS ==========

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function startGame() {
    showScreen('difficultyScreen');
}

function setDifficulty(difficulty) {
    gameState.difficulty = difficulty;
    gameState.currentRound = 0;
    gameState.battlesWon = 0;
    gameState.currentEnemyIndex = 0;
    showIntro();
}

function showIntro() {
    showScreen('encounterCinematic');
    document.getElementById('encounterStory').innerText = storyLines.intro;
    setTimeout(() => {
        startNextBattle();
    }, 5000);
}

function showCredits() {
    showScreen('creditsScreen');
}

function mainMenu() {
    showScreen('mainMenu');
}

// ========== SISTEMA DE BATALLA ==========

function startNextBattle() {
    if (gameState.currentEnemyIndex >= gameState.enemySequence.length) {
        showEnding();
        return;
    }

    gameState.currentRound++;
    const enemyKey = gameState.enemySequence[gameState.currentEnemyIndex];
    gameState.currentEnemy = characters[enemyKey];
    
    gameState.playerHP = characters.gusilu.maxHp;
    gameState.maxPlayerHP = characters.gusilu.maxHp;
    gameState.enemyHP = gameState.currentEnemy.maxHp;
    gameState.maxEnemyHP = gameState.currentEnemy.maxHp;
    
    gameState.combatLog = [];
    gameState.isPlayerTurn = true;
    gameState.gameInProgress = true;

    showScreen('encounterCinematic');
    document.getElementById('encounterStory').innerText = storyLines.encounters[enemyKey];
    
    setTimeout(() => {
        initBattle();
    }, 3000);
}

function initBattle() {
    showScreen('gameScreen');
    updateHUD();
    updateCharacterDisplay();
    addCombatLog("BATALLA INICIADA!");
    addCombatLog(gameState.currentEnemy.emoji + " " + gameState.currentEnemy.name + " ha entrado en la arena.");
    addCombatLog("Usa Q, W, E, R para atacar");
}

// ========== SISTEMA DE COMBATE ==========

function performAttack(attackType) {
    if (!gameState.gameInProgress || !gameState.isPlayerTurn) return;

    let damage = 0;
    let description = "";

    switch(attackType) {
        case 'kick':
            damage = Math.floor(characters.gusilu.getAttackDamage() * 0.8);
            description = "Gusilu lanza una PATADA RAPIDA";
            break;
        case 'punch':
            damage = characters.gusilu.getAttackDamage();
            description = "Gusilu propina un PUNIETAZO directo";
            break;
        case 'strong':
            damage = Math.floor(characters.gusilu.getAttackDamage() * 1.3);
            description = "Gusilu ejecuta un ATAQUE DEVASTADOR";
            break;
        case 'special':
            damage = characters.gusilu.getSpecialAttackDamage();
            description = "Gusilu desata su " + specialMoves.gusilu.name;
            break;
    }

    damage = Math.floor(damage * gameState.damageMultipliers[gameState.difficulty]);
    gameState.enemyHP -= damage;
    addCombatLog(description + " causando " + damage + " de danio!");
    updateHUD();
    updateCharacterDisplay();

    if (gameState.enemyHP <= 0) {
        endBattle('victory');
        return;
    }

    gameState.isPlayerTurn = false;
    setTimeout(() => {
        enemyAttack();
    }, 1000);
}

function enemyAttack() {
    if (!gameState.gameInProgress) return;

    const attackTypes = ['normal', 'normal', 'strong', 'special'];
    const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    
    let damage = 0;
    let description = "";

    if (randomAttack === 'normal') {
        damage = Math.floor(gameState.currentEnemy.getAttackDamage() * 0.8);
        description = gameState.currentEnemy.name + " ataca rapidamente";
    } else if (randomAttack === 'strong') {
        damage = gameState.currentEnemy.getAttackDamage();
        description = gameState.currentEnemy.name + " lanza un ataque potente";
    } else {
        damage = gameState.currentEnemy.getSpecialAttackDamage();
        const enemyKey = Object.keys(characters).find(k => characters[k] === gameState.currentEnemy);
        description = gameState.currentEnemy.name + " usa " + specialMoves[enemyKey].name;
    }

    damage = Math.floor(damage * gameState.damageMultipliers[gameState.difficulty]);
    gameState.playerHP -= damage;
    addCombatLog(description + " causando " + damage + " de danio!");
    updateHUD();
    updateCharacterDisplay();

    if (gameState.playerHP <= 0) {
        endBattle('defeat');
        return;
    }

    gameState.isPlayerTurn = true;
}

function endBattle(result) {
    gameState.gameInProgress = false;

    if (result === 'victory') {
        gameState.battlesWon++;
        addCombatLog("GUSILU SALE VICTORIOSO!");
        
        setTimeout(() => {
            showScreen('victoryScreen');
            document.getElementById('victoryMessage').innerText = storyLines.victories[gameState.enemySequence[gameState.currentEnemyIndex]];
            document.getElementById('defeatedEnemy').innerText = gameState.currentEnemy.name;
            document.getElementById('remainingLives').innerText = gameState.battlesWon;
            gameState.currentEnemyIndex++;
        }, 2000);
    } else {
        addCombatLog("GUSILU HA SIDO DERROTADO!");
        
        setTimeout(() => {
            showScreen('defeatScreen');
            document.getElementById('defeatMessage').innerText = gameState.currentEnemy.name + " ha derrotado a Gusilu en la ronda " + gameState.currentRound;
            document.getElementById('defeaterName').innerText = gameState.currentEnemy.name;
            document.getElementById('battlesCompleted').innerText = gameState.battlesWon;
        }, 2000);
    }
}

// ========== INTERFAZ Y VISUALIZACION ==========

function updateHUD() {
    document.getElementById('playerHealthText').innerText = Math.max(0, gameState.playerHP);
    document.getElementById('enemyHealthText').innerText = Math.max(0, gameState.enemyHP);
    
    const playerHealthPercent = (Math.max(0, gameState.playerHP) / gameState.maxPlayerHP) * 100;
    const enemyHealthPercent = (Math.max(0, gameState.enemyHP) / gameState.maxEnemyHP) * 100;
    
    document.getElementById('playerHealth').style.width = playerHealthPercent + '%';
    document.getElementById('enemyHealth').style.width = enemyHealthPercent + '%';
    
    document.getElementById('roundNumber').innerText = 'RONDA ' + gameState.currentRound;
    document.getElementById('enemyName').innerText = gameState.currentEnemy ? gameState.currentEnemy.name : 'ENEMY';
}

function updateCharacterDisplay() {
    const playerEl = document.getElementById('playerCharacter');
    const enemyEl = document.getElementById('enemyCharacter');
    
    playerEl.innerHTML = '<div class="character-display">🐛<br>GUSILU</div>';
    enemyEl.innerHTML = '<div class="character-display">' + gameState.currentEnemy.emoji + '<br>' + gameState.currentEnemy.name + '</div>';
}

function addCombatLog(message) {
    gameState.combatLog.push(message);
    const logEl = document.getElementById('combatLog');
    logEl.innerHTML = gameState.combatLog.slice(-5).map(msg => '<p>' + msg + '</p>').join('');
}

function nextRound() {
    startNextBattle();
}

function showEnding() {
    showScreen('endingScreen');
}

// ========== CONTROLES DEL TECLADO ==========

document.addEventListener('keydown', function(event) {
    if (!gameState.gameInProgress) return;

    switch(event.key.toLowerCase()) {
        case 'q':
            performAttack('kick');
            break;
        case 'w':
            performAttack('punch');
            break;
        case 'e':
            performAttack('strong');
            break;
        case 'r':
            performAttack('special');
            break;
    }
});

document.addEventListener('keydown', function(event) {
    if (gameState.currentScreen === 'encounterCinematic' && event.code === 'Space') {
        event.preventDefault();
        initBattle();
    }
});

// ========== INICIALIZACION ==========

window.addEventListener('load', function() {
    console.log("Gusilu Mortal Kombat - Juego cargado");
});