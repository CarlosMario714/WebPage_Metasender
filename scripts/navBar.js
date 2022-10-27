const contenedorBotonesNavbar = document.querySelector(
  ".contenedor-botones-navbar"
);
const aboutNavbarBtn = document.querySelector(".about-navbar-btn");
const aboutNavbarOptions = document.querySelector(".about-navbar-options");
const communityNavbarBtn = document.querySelector(".community-navbar-btn");
const communityNavbarOptions = document.querySelector(
  ".community-navbar-options"
);
const hamburguer = document.querySelector(".hamburguer");
const btnLanguaje = document.querySelector(".boton-language");
const sideBackground = document.querySelector(".sidenavbar-background");

//flags para saber donde esta el mouse
let mouseOnAboutNavbarBtn = false;
let mouseOnAboutNavbarOptions = false;
let mouseOnCommunityNavbarBtn = false;
let mouseOnCommunityNavbarOptions = false;
let sideNavbarOn = false;

window.addEventListener("load", () => {
  displayOptions();
});

window.addEventListener("resize", () => {
  displayOptions();
});

function displayOptions() {
  //top navbar
  if (window.innerWidth > 980) {
    setListeners();

    //prende o apaga las opciones del boton about
    if (!mouseOnAboutNavbarBtn && !mouseOnAboutNavbarOptions) {
      aboutNavbarOptions.style.display = "none";
    } else {
      aboutNavbarOptions.style.display = "flex";
    }

    //prende o apaga las opciones del boton community
    if (!mouseOnCommunityNavbarBtn && !mouseOnCommunityNavbarOptions) {
      communityNavbarOptions.style.display = "none";
    } else {
      communityNavbarOptions.style.display = "flex";
    }
  } else {
    //side navbar
    removeListeners();

    aboutNavbarOptions.style.display = "none";
    communityNavbarOptions.style.display = "none";

    aboutNavbarBtn.addEventListener("click", () => {
      if (aboutNavbarOptions.style.display == "none") {
        aboutNavbarOptions.style.display = "flex";
      } else {
        aboutNavbarOptions.style.display = "none";
      }
    });

    communityNavbarBtn.addEventListener("click", () => {
      if (communityNavbarOptions.style.display == "none") {
        communityNavbarOptions.style.display = "flex";
      } else {
        communityNavbarOptions.style.display = "none";
      }
    });

    //cerrar el side navbar cuando se da click en algun boton
    contenedorBotonesNavbar.addEventListener("click", (e) => {
      e.target.classList.forEach((clase) => {
        if (clase === "close-sidenavbar") {
          contenedorBotonesNavbar.classList.toggle("showbuttons");
          sideBackground.classList.toggle("show-sideNavbar-backchround");
          aboutNavbarOptions.style.display = "none";
          communityNavbarOptions.style.display = "none";
        }
      });
    });

    //prende y apaga el side navbar
    hamburguer.onclick = () => {
      contenedorBotonesNavbar.classList.toggle("showbuttons");
      sideBackground.classList.toggle("show-sideNavbar-backchround");
      aboutNavbarOptions.style.display = "none";
      communityNavbarOptions.style.display = "none";
    };

    //prende y apaga el side navbar cuando se le da click por fuera
    sideBackground.onclick = () => {
      sideBackground.classList.toggle("show-sideNavbar-backchround");
      contenedorBotonesNavbar.classList.toggle("showbuttons");
      aboutNavbarOptions.style.display = "none";
      communityNavbarOptions.style.display = "none";
    };
  }
}

function setListeners() {
  // eventos para saber en donde esta el mouse
  aboutNavbarBtn.addEventListener("mouseover", setTrueMouseOnAboutNavbarBtn);

  aboutNavbarBtn.addEventListener("mouseout", setFalseMouseOnAboutNavbarBtn);

  aboutNavbarOptions.addEventListener(
    "mouseover",
    setTruemouseOnAboutNavbarOptions
  );

  aboutNavbarOptions.addEventListener(
    "mouseout",
    setFalsemouseOnAboutNavbarOptions
  );

  communityNavbarBtn.addEventListener(
    "mouseover",
    setTruemouseOnCommunityNavbarBtn
  );

  communityNavbarBtn.addEventListener(
    "mouseout",
    setFalsemouseOnCommunityNavbarBtn
  );

  communityNavbarOptions.addEventListener(
    "mouseover",
    setTruemouseOnCommunityNavbarOptions
  );

  communityNavbarOptions.addEventListener(
    "mouseout",
    setFalsemouseOnCommunityNavbarOptions
  );
}

// funciones que solo setean las flags, una funcion para cada flag para poder quitarle el evento cuando se prende el side Navbar

function setTrueMouseOnAboutNavbarBtn() {
  mouseOnAboutNavbarBtn = true;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setFalseMouseOnAboutNavbarBtn() {
  mouseOnAboutNavbarBtn = false;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setTruemouseOnAboutNavbarOptions() {
  mouseOnAboutNavbarOptions = true;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setFalsemouseOnAboutNavbarOptions() {
  mouseOnAboutNavbarOptions = false;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setTruemouseOnCommunityNavbarBtn() {
  mouseOnCommunityNavbarBtn = true;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setFalsemouseOnCommunityNavbarBtn() {
  mouseOnCommunityNavbarBtn = false;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setTruemouseOnCommunityNavbarOptions() {
  mouseOnCommunityNavbarOptions = true;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function setFalsemouseOnCommunityNavbarOptions() {
  mouseOnCommunityNavbarOptions = false;
  setTimeout(() => {
    displayOptions();
  }, 500);
}

function removeListeners() {
  //remueve el listener para saber donde esa el mouse
  aboutNavbarBtn.removeEventListener("mouseover", setTrueMouseOnAboutNavbarBtn);
  aboutNavbarBtn.removeEventListener("mouseout", setFalseMouseOnAboutNavbarBtn);
  aboutNavbarOptions.removeEventListener(
    "mouseover",
    setTruemouseOnAboutNavbarOptions
  );
  aboutNavbarOptions.removeEventListener(
    "mouseout",
    setFalsemouseOnAboutNavbarOptions
  );
  communityNavbarBtn.removeEventListener(
    "mouseover",
    setTruemouseOnCommunityNavbarBtn
  );
  communityNavbarBtn.removeEventListener(
    "mouseout",
    setFalsemouseOnCommunityNavbarBtn
  );
  communityNavbarOptions.removeEventListener(
    "mouseover",
    setTruemouseOnCommunityNavbarOptions
  );
  communityNavbarOptions.removeEventListener(
    "mouseout",
    setFalsemouseOnCommunityNavbarOptions
  );
}
