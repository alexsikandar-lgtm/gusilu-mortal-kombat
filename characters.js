// ========== SISTEMA DE PERSONAJES ==========

class Character {
    constructor(name, hp, speed, strength, story, emoji) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.speed = speed;
        this.strength = strength;
        this.story = story;
        this.emoji = emoji;
        this.lastAttackTime = 0;
    }

    getAttackDamage() {
        const baseDamage = this.strength;
        const variation = Math.random() * 10 - 5;
        return Math.max(5, Math.floor(baseDamage + variation));
    }

    getSpecialAttackDamage() {
        return Math.floor(this.strength * 1.8 + Math.random() * 20);
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    isAlive() {
        return this.hp > 0;
    }

    getHpPercentage() {
        return Math.round((this.hp / this.maxHp) * 100);
    }
}

// ========== PERSONAJES JUGABLES ==========

const characters = {
    gusilu: new Character(
        "GUSILU",
        150,
        85,
        25,
        "Gusilu, la criatura legendaria, emerge del vacio dimensional para enfrentar su mayor desafio.",
        "🐛"
    ),
    kingKong: new Character(
        "KING KONG",
        180,
        60,
        30,
        "El colosal KING KONG desciende de las montanas, decidido a demostrar su supremacia.",
        "🦍"
    ),
    huevo: new Character(
        "HUEVO SEQUAK",
        90,
        95,
        15,
        "HUEVO SEQUAK, pequeno pero veloz, brilla como una gema dorada lista para la batalla.",
        "🥚"
    ),
    patata: new Character(
        "PATATA NOBLE",
        200,
        40,
        28,
        "La PATATA NOBLE emerge del suelo con poder subterraneo ancestral.",
        "🥔"
    ),
    pedro: new Character(
        "PEDRO SANCHEZ",
        120,
        70,
        22,
        "PEDRO SANCHEZ llega con palabras de fuego y punos de acero.",
        "👨"
    ),
    santiago: new Character(
        "SANTIAGO ABASCAL",
        140,
        75,
        26,
        "SANTIAGO ABASCAL irrumpe en la arena con determinacion inquebrantable.",
        "🧔"
    ),
    abasca: new Character(
        "ABASCA OSCURO",
        160,
        80,
        29,
        "El ultimo guardian, ABASCA OSCURO, el senor supremo del caos despierta.",
        "👹"
    )
};

// ========== HISTORIAS Y CINEMATICAS ==========

const storyLines = {
    intro: "En un reino olvidado, existe una criatura legendaria... El GUSILU, protector del equilibrio dimensional. Pero fuerzas oscuras han despertado. Los 7 senores del caos buscan destruir el universo. Solo Gusilu puede detenerlos.",

    encounters: {
        kingKong: "El colosal KING KONG desciende de las montanas heladas. Su rugido resuena por el universo: 'Te atreves a enfrentarme, pequeno?'",
        huevo: "El brillante HUEVO SEQUAK aparece en la arena. Sus movimientos son rapidos como el rayo: 'Preparate para la velocidad!'",
        patata: "La PATATA NOBLE emerge del suelo con un temblor. Su voz resuena: 'Yo soy la tierra misma!'",
        pedro: "PEDRO SANCHEZ entra con un aura politica: 'Gusilu, tu tiempo ha terminado. Por el futuro!'",
        santiago: "SANTIAGO ABASCAL aparece con llamas en sus ojos: 'Esta es mi ultima batalla. Que venza el mas fuerte!'",
        abasca: "Del cielo abierto desciende ABASCA OSCURO, el senor supremo. 'Asi que llegas aqui, miserable. Tu destino termina hoy.'"
    },

    victories: {
        kingKong: "Gusilu esquiva el ultimo golpe de Kong. El gigante cae de rodillas, derrotado.",
        huevo: "El brillo del Huevo se apaga. Ha sido dominado por la experiencia de Gusilu.",
        patata: "La tierra tiembla una ultima vez. La Patata acepta su derrota.",
        pedro: "Las palabras de Pedro pierden poder. Gusilu sale victorioso.",
        santiago: "Santiago cae, admitiendo la superioridad de Gusilu.",
        abasca: "Abasca lanza un ultimo grito que resuena por las dimensiones. El caos es detenido."
    },

    ending: "Despues de derrotar a los 7 senores del caos, Gusilu regresa a su dimension. El equilibrio ha sido restaurado. La leyenda de Gusilu vivira eternamente en los anales del universo."
};

// ========== MOVIMIENTOS ESPECIALES ==========

const specialMoves = {
    gusilu: {
        name: "EXPLOSION DIMENSIONAL",
        description: "Gusilu canaliza energia interdimensional"
    },
    kingKong: {
        name: "GOLPE DE MONTANA",
        description: "Kong desata toda su fuerza"
    },
    huevo: {
        name: "DESTELLO AUREO",
        description: "Huevo se multiplica en velocidad"
    },
    patata: {
        name: "TERREMOTO PRIMAL",
        description: "La tierra se abre bajo el enemigo"
    },
    pedro: {
        name: "DISCURSO DE PODER",
        description: "Las palabras se convierten en energia"
    },
    santiago: {
        name: "FUEGO SAGRADO",
        description: "Santiago desata llamas ancestrales"
    },
    abasca: {
        name: "APOCALIPSIS",
        description: "El caos absoluto encarnado"
    }
};