import { preCargaArchivos } from "../functions/ajax/search.js"; // Asegúrate de incluir la extensión .js

document.addEventListener("DOMContentLoaded", function () {
  // Petición para la carga de los elementos css, html y php.
  preCargaArchivos();
});
