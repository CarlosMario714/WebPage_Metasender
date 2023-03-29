import idioms from './idioms.js';
import { changeTypeOfToken } from './manualWallets.js';
import { handlePalco } from './tools.js';
const textsToTranslate = document.querySelectorAll('[data-content]');
const tokenInput = document.getElementById('token-input');

let languaje = localStorage.getItem('language') || 'en';

function translateItems(items, property, texts) {
	for (const textToTranslate of items) {
		const section = textToTranslate.dataset.content;

		const type = textToTranslate.dataset.type;

		textToTranslate[property] = texts[section][type];
	}
}

// change Language

export async function changeLanguage() {
	const texts = idioms[languaje];

	translateItems(textsToTranslate, 'innerHTML', texts);

	changeTypeOfToken(tokenInput.value);
}

export function toggleLanguage(e) {
	if (e.target.dataset.function == 'en') {
		languaje = 'en';

		changeLanguage();

		localStorage.setItem('language', languaje);

		handlePalco();
	}

	if (e.target.dataset.function == 'es') {
		languaje = 'es';

		changeLanguage();

		localStorage.setItem('language', languaje);

		handlePalco();
	}
}

export { languaje };
