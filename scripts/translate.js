import idioms from "./idioms.js";
import { changeTypeOfToken } from "./manualWallets.js";
const languageButtons = document.querySelector(".language");
const textsToTranslate = document.querySelectorAll("[data-content]");
const tokenInput = document.getElementById("token-input");

let languaje = "es";

function translateItems( items, property, texts ) {

  for (const textToTranslate of items) {

    const section = textToTranslate.dataset.content;

    const type = textToTranslate.dataset.type;

    textToTranslate[ property ] = texts[section][type];
    
  }

}

// change Language

async function changeLanguage(element) {

  const texts = idioms[ element ];

  translateItems( textsToTranslate, 'innerHTML', texts )

  changeTypeOfToken( tokenInput.value )

}

function toggleLanguage(e) {

  if (e.target.dataset.function == "en") {
    languaje = "en";
    changeLanguage(e.target.dataset.function);
  }

  if (e.target.dataset.function == "es") {
    languaje = "es";
    changeLanguage(e.target.dataset.function);
  }

}

languageButtons.addEventListener("click", toggleLanguage);

export { languaje };