// import {Mage, Warrior, Healer, Archer} from './classes.js';
import { Character } from "./classes.js";

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
			// characters.forEach(character => {
			// 	if (character.name !== this.name) {
			// 		character.health -= 10;
			// 	}
			// });

			this.logAction(`${this.name} lanza un hechizo y daña a todos alv!`);
			this.gainExperience(20);
			// updateView();
        } else {
            this.logAction(`${this.name} no tiene suficiente maná.`);
        }
    }

    meditate() {
        this.mana += 30;
        this.logAction(`${this.name} medita y recupera maná.`);
		// updateView();
    }

    magicMissile(toCharacter) {
		toCharacter.health -= 5 + this.strength;
        this.gainExperience(20);
        this.logAction(`${this.name} lanza un proyectil mágico a ${toCharacter.name}!`);
		// updateView();
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
		// updateView();
    }

    defend() {
		this.health += 10;
        this.logAction(`${this.name} se defiende y reduce el daño recibido.`);
		// updateView();
    }

    battleCry() {
		if (this.mana >= 20) {
			this.mana -= 20;
			this.gainExperience(20);

			this.logAction(`${this.name} grita y aumenta su fuerza temporalmente.`);
			// updateView();
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
		// updateView();
    }

    blessing() {
		if (this.mana >= 25) {
			this.mana -= 25;
			this.gainExperience(20);

			// Aumenta la defensa de todos los personajes
			// characters.forEach(character => {
			// 	// no se aumenta la defensa del personaje que lanza la bendición
			// 	if (character.name !== this.name) {
			// 		character.strength += 10;
			// 	}
			// });

			this.logAction(`${this.name} bendice a todos los aliados aumentando sus defensas.`);
			// updateView();
        } else {
            this.logAction(`${this.name} no tiene suficiente maná.`);
        }

    }

    resurrection(toCharacter) {
        if (this.level >= 5) {
			toCharacter.health = 100;
			this.gainExperience(20);

            this.logAction(`${this.name} resucita a un aliado!`);
			// updateView();
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
		// updateView();
    }

    arrowRain() {
		// validar mana >= 20
		if (this.mana >= 20) {
			this.mana -= 20;
			this.gainExperience(20);

			// Daño a todos los personajes menos a él
			// characters.forEach(character => {
			// 	if (character.name !== this.name) {
			// 		character.health -= 5 + this.strength;
			// 	}
			// });

			this.logAction(`${this.name} lanza una lluvia de flechas a todos!`);
			// updateView();
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
		// updateView();
    }
}

export {Mage, Warrior, Healer, Archer};
