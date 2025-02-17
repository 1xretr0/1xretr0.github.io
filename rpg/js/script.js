import {Mage, Warrior, Healer, Archer} from './characters.js';

// Crear personajes
const mage = new Mage('Gandalf');
const warrior = new Warrior('Conan');
const healer = new Healer('Dr. Simi');
const archer = new Archer('Legolas');

const characters = [mage, warrior, healer, archer];

// FUNCION MOSTRAR ACCIONES DE PERSONAJE
function showActions(character) {
    // Mostrar acciones disponibles
    const actionButtonsDiv = document.getElementById('action-buttons');

    // Clear existing buttons
    actionButtonsDiv.innerHTML = '';

    let buttons = [];

    if (character instanceof Mage) {
        buttons = [
            { text: 'Lanzar Hechizo', action: () => {mage.castSpell(); updateView();} },
            { text: 'Meditar', action: () =>{ mage.meditate(); updateView();} },
            { text: 'Proyectil Mágico', action: () => showCharacterButtons(mage, mage.magicMissile.bind(mage)) },
        ];
    } else if (character instanceof Warrior) {
        buttons = [
            { text: 'Atacar con Espada', action: () => showCharacterButtons(warrior, warrior.swordAttack.bind(warrior)) },
            { text: 'Defender', action: () => {warrior.defend(); updateView();} },
            { text: 'Grito de Batalla', action: () => {warrior.battleCry(); updateView();} },
        ];
    } else if (character instanceof Healer) {
        buttons = [
            { text: 'Curar Aliado', action: () => showCharacterButtons(healer, healer.healAlly.bind(healer)) },
            { text: 'Bendición', action: () => {healer.blessing(); updateView();} },
            { text: 'Resurrección', action: () => showCharacterButtons(healer, healer.resurrection.bind(healer)) },
        ];
    } else if (character instanceof Archer) {
        buttons = [
            { text: 'Disparo Certero', action: () => showCharacterButtons(archer, archer.preciseShot.bind(archer)) },
            { text: 'Lluvia de Flechas', action: () => {archer.arrowRain(); updateView();} },
            { text: 'Disparo Venenoso', action: () => showCharacterButtons(archer, archer.poisonShot.bind(archer)) },
        ];
    }

    // Create and append buttons
    buttons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.textContent = buttonInfo.text;
        button.addEventListener('click', buttonInfo.action);
        actionButtonsDiv.appendChild(button);
    });
}

// MOSTRAR BOTONES DE SELECCION DE CARACTERES
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
			updateView();
		};
		characterButtonsDiv.appendChild(charButton);
	});
}

// ESCONDER BOTONES DE SELECCION DE PERSONAJE
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
