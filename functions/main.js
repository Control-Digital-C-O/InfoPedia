import { preCargaArchivos } from "./ajax/search.js";
import {
  setupNavbarMenuAnimation,
  initCardAnimation,
} from "./ajax/animation.js";
import { dataSession, handleLogin } from "./ajax/login.js";
import { initLogout } from "./ajax/logout.js";

document.addEventListener("DOMContentLoaded", function () {
  // Llama a la función para cargar archivos CSS, HTML y PHP dinámicamente
  preCargaArchivos()
    .then(() => {
      setTimeout(setupNavbarMenuAnimation, 1000);
      setTimeout(initCardAnimation, 1000);
      setTimeout(initLogout, 1000);
    })
    .catch((error) => {
      console.error("Error al precargar archivos:", error);
    });
  setTimeout(() => {
    const loginForm = document.getElementById("loginform");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    } else {
      console.log("Login form not found, possibly already logged in.");
      dataSession();
    }
  }, 1000);
});
