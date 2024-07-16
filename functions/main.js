import { preCargaArchivos } from "./ajax/search.js";

import { setupNavbarMenuAnimation } from "./ajax/bars_menu.js";

document.addEventListener("DOMContentLoaded", function () {
  // Llama a la función para cargar archivos CSS, HTML y PHP dinámicamente
  preCargaArchivos();

  // Espera un tiempo corto para asegurar que los elementos se hayan cargado completamente
  setTimeout(setupNavbarMenuAnimation, 100);
});

// Opcional: Escucha cambios en el tamaño de la pantalla y vuelve a verificar
// window.addEventListener("resize", setupNavbarMenuAnimation);

function checkScreenSizeAndSetupNavbar() {
  // Define el tamaño de pantalla que deseas verificar
  const mediaQuery = window.matchMedia("(max-width: 767px)"); // Por ejemplo, para pantallas menores o iguales a 768px

  if (mediaQuery.matches) {
    setupNavbarMenuAnimation();
  } else {
  }
}
