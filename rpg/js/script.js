// CLASE BASE PARA PERSONAJES
class Character {
    constructor(name, health = 100, mana = 100, strength = 0, level = 1, experience = 0, image_file = '') {
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.strength = strength;
        this.level = level;
        this.experience = experience;
		this.image_file = image_file;
    }

    gainExperience(amount) {
        this.experience += amount;
        if (this.experience >= 100) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.experience = 0;
        this.health += 20;
        this.mana += 10;
        this.strength += 5;
        this.logAction(`${this.name} ha subido al nivel ${this.level}!`);
    }

    logAction(action) {
        const logList = document.getElementById('log-list');
        const logEntry = document.createElement('li');
        logEntry.textContent = action;
        logList.appendChild(logEntry);
    }
}

// CLASE MAGO HEREDANDO CLASE BASE
class Mage extends Character {
    constructor(name) {
        super(name, 80, 100, 10, 1, 0, 'img/gandalf.webp');
    }

	// LANZAR HECHIZO
    castSpell() {
        if (this.mana >= 20) {
            this.mana -= 20;

			// Daño a todos los personajes menos a él
			characters.forEach(character => {
				if (character.name !== this.name) {
					character.health -= 10;
				}
			});

			this.logAction(`${this.name} lanza un hechizo y daña a todos alv!`);
			this.gainExperience(20);
			updateView();
        } else {
            this.logAction(`${this.name} no tiene suficiente maná.`);
        }
    }

    meditate() {
        this.mana += 30;
        this.logAction(`${this.name} medita y recupera maná.`);
		updateView();
    }

    magicMissile(toCharacter) {
		toCharacter.health -= 5 + this.strength;
        this.gainExperience(20);
        this.logAction(`${this.name} lanza un proyectil mágico a ${toCharacter.name}!`);
		updateView();
    }
}

// CLASE GUERRERO HEREDANDO CLASE BASE
class Warrior extends Character {
    constructor(name) {
        super(name, 120, 50, 20, 1, 0, 'img/conan.jpg');
    }

    swordAttack(toCharacter) {
		toCharacter.health -= 5 + this.strength;
        this.gainExperience(20);
        this.logAction(`${this.name} ataca con la espada a ${toCharacter.name}!`);
		updateView();
    }

    defend() {
		this.health += 10;
        this.logAction(`${this.name} se defiende y reduce el daño recibido.`);
		updateView();
    }

    battleCry() {
		if (this.mana >= 20) {
			this.mana -= 20;
			this.gainExperience(20);

			this.logAction(`${this.name} grita y aumenta su fuerza temporalmente.`);
			updateView();
		} else {
			this.logAction(`${this.name} no tiene suficiente maná.`);
		}
    }
}

// CLASE SANADOR HEREDANDO CLASE BASE
class Healer extends Character {
    constructor(name) {
        super(name, 100, 80, 15, 1, 0, 'img/simi.webp');
    }

    healAlly(toCharacter) {
		toCharacter.health += 20;

		this.gainExperience(20);

		this.logAction(`${this.name} cura a ${toCharacter.name}!`);
		updateView();
    }

    blessing() {
		if (this.mana >= 25) {
			this.mana -= 25;
			this.gainExperience(20);

			// Aumenta la defensa de todos los personajes
			characters.forEach(character => {
				// no se aumenta la defensa del personaje que lanza la bendición
				if (character.name !== this.name) {
					character.strength += 10;
				}
			});

			this.logAction(`${this.name} bendice a todos los aliados aumentando sus defensas.`);
			updateView();
        } else {
            this.logAction(`${this.name} no tiene suficiente maná.`);
        }

    }

    resurrection(toCharacter) {
        if (this.level >= 5) {
			toCharacter.health = 100;
			this.gainExperience(20);

            this.logAction(`${this.name} resucita a un aliado!`);
			updateView();
        } else {
            this.logAction(`${this.name} no tiene el nivel suficiente para resucitar.`);
        }
    }
}

// CLASE ARQUERO HEREDANDO CLASE BASE
class Archer extends Character {
    constructor(name) {
        super(name, 90, 60, 18, 1, 0, 'img/legolas.jpg');
    }

    preciseShot(toCharacter) {
        toCharacter.health -= 10 + this.strength;
		this.gainExperience(20);

        this.logAction(`${this.name} dispara un tiro certero a ${toCharacter.name}!`);
		updateView();
    }

    arrowRain() {
		// validar mana >= 20
		if (this.mana >= 20) {
			this.mana -= 20;
			this.gainExperience(20);

			// Daño a todos los personajes menos a él
			characters.forEach(character => {
				if (character.name !== this.name) {
					character.health -= 5 + this.strength;
				}
			});

			this.logAction(`${this.name} lanza una lluvia de flechas a todos!`);
			updateView();
		}
		else {
			this.logAction(`${this.name} no tiene suficiente maná.`);
		}
    }

    poisonShot(toCharacter) {
		toCharacter.health -= 15 + this.strength;
		this.gainExperience(20);

        this.gainExperience(15);
        this.logAction(`${this.name} dispara una flecha envenenada!`);
		updateView();
    }
}

// Crear personajes
const mage = new Mage('Gandalf');
const warrior = new Warrior('Conan');
const healer = new Healer('Dr. Simi');
const archer = new Archer('Legolas');

const characters = [mage, warrior, healer, archer];


// FUNCION MOSTRAR
function showActions(character) {
	// Mostrar acciones disponibles
	const actionButtonsDiv = document.getElementById('action-buttons');

    actionButtonsDiv.innerHTML = '';

    if (character instanceof Mage) {
		actionButtonsDiv.innerHTML = `
			<button onclick="mage.castSpell()">Lanzar Hechizo</button>
			<button onclick="mage.meditate()">Meditar</button>
			<button onclick="showCharacterButtons(mage, mage.magicMissile.bind(mage))">Proyectil Mágico</button>
		`;
    } else if (character instanceof Warrior) {
        actionButtonsDiv.innerHTML = `
            <button onclick="showCharacterButtons(warrior, warrior.swordAttack.bind(warrior))">Atacar con Espada</button>
            <button onclick="warrior.defend()">Defender</button>
            <button onclick="warrior.battleCry()">Grito de Batalla</button>
        `;
    } else if (character instanceof Healer) {
        actionButtonsDiv.innerHTML = `
            <button onclick="showCharacterButtons(healer, healer.healAlly.bind(healer))">Curar Aliado</button>
            <button onclick="healer.blessing()">Bendición</button>
            <button onclick="showCharacterButtons(healer, healer.resurrection.bind(healer))">Resurrección</button>
        `;
    } else if (character instanceof Archer) {
        actionButtonsDiv.innerHTML = `
            <button onclick="showCharacterButtons(archer, archer.preciseShot.bind(archer))">Disparo Certero</button>
            <button onclick="archer.arrowRain()">Lluvia de Flechas</button>
            <button onclick="showCharacterButtons(archer, archer.poisonShot.bind(archer))">Disparo Venenoso</button>
        `;
    }
}

function showCharacterButtons(selectedCharacter, action) {

	// Mostrar acciones disponibles
	const characterButtonsDiv = document.getElementById('character-buttons');
	characterButtonsDiv.innerHTML = '';

	characters.forEach(character => {
		if (character.name === selectedCharacter.name)
			return;

		const charButton = document.createElement('button');
		charButton.textContent = character.name;
		charButton.onclick = () => {
			console.log(character.name);
			action(character);
			hideCharacterButtons();
		};
		characterButtonsDiv.appendChild(charButton);
	});
}

function hideCharacterButtons() {
	const characterButtonsDiv = document.getElementById('character-buttons');
	characterButtonsDiv.innerHTML = '';
}

// ACTUALIZA VALORES PINTADOS EN LA VIEW
function updateView() {
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = ''; // Limpiamos el contenido actual

    characters.forEach(character => {
        const charDiv = document.createElement('div');
        charDiv.innerHTML = `
            <img src="${character.image_file}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>Salud: ${character.health}</p>
            <p>Maná: ${character.mana}</p>
            <p>Fuerza: ${character.strength}</p>
            <p>Nivel: ${character.level}</p>
            <p>Experiencia: ${character.experience}</p>
        `;
        charactersDiv.appendChild(charDiv);
    });
}

// EVENTO SELECCIONAR PERSONAJE
const charactersDiv = document.getElementById('characters');
charactersDiv.addEventListener('click', (event) => {
    const charName = event.target.closest('div').querySelector('h3').textContent;
    const selectedChar = characters.find(char => char.name === charName);
    showActions(selectedChar);
});

// Mostrar personajes en la interfaz
updateView();
