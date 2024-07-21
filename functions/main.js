import { preCargaArchivos } from "./ajax/search.js";

import { setupNavbarMenuAnimation } from "./ajax/bars_menu.js";

import { loginCard } from "./ajax/login.js";

document.addEventListener("DOMContentLoaded", function () {
  // Llama a la función para cargar archivos CSS, HTML y PHP dinámicamente
  preCargaArchivos();

  // Espera un tiempo corto
  setTimeout(setupNavbarMenuAnimation, 1000);

  setTimeout(loginCard, 1000);
});
