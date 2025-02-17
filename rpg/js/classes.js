

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

export {Character};
