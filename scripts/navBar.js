const contenedorBotonesNavbar = document.querySelector(
  ".contenedor-botones-navbar"
);
const hamburguer = document.querySelector(".hamburguer");
const btnLanguaje = document.querySelector(".boton-language");
const sideBackground = document.querySelector(".sidenavbar-background");

//prende y apaga el side navbar
hamburguer.onclick = () => {
	contenedorBotonesNavbar.classList.toggle("showbuttons");
	sideBackground.classList.toggle("show-sideNavbar-backchround");
};

//prende y apaga el side navbar cuando se le da click por fuera
sideBackground.onclick = () => {
	sideBackground.classList.toggle("show-sideNavbar-backchround");
	contenedorBotonesNavbar.classList.toggle("showbuttons");
};


