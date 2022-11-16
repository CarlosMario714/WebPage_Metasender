import idioms from "./idioms.js";
const languageButtons = document.querySelector(".language");
const textsToTranslate = document.querySelectorAll("[data-content]");
const titlesToTranslate = document.querySelectorAll('[title]')
const placeHolderTranslate = document.querySelectorAll('[placeholder]')

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

  //traduccion formulario
//   inputName.placeholder = texts["form"]["input-name-placeholder"];
//   inputName.title = texts["form"]["input-name-title"];
//   inputEmail.placeholder = texts["form"]["input-email-placeholder"];
//   inputEmail.title = texts["form"]["input-email-title"];
//   inputWallet.placeholder = texts["form"]["input-wallet-placeholder"];
//   inputWallet.title = texts["form"]["input-wallet-title"];
//   inputSubmit.value = texts["form"]["input-submit-value"];

}

function toggleLanguage(e) {

  if (e.target.dataset.function == "en") {
    changeLanguage(e.target.dataset.function);
    languaje = "en";
  }

  if (e.target.dataset.function == "es") {
    changeLanguage(e.target.dataset.function);
    languaje = "es";
  }

}

languageButtons.addEventListener("click", toggleLanguage);

export { languaje };