import { preCargaArchivos } from "./ajax/search.js";
import {
  setupNavbarMenuAnimation,
  initCardAnimation,
} from "./ajax/animation.js";
import { dataSession, handleLogin } from "./ajax/login.js";
import { initLogout } from "./ajax/logout.js";
import { renderArticulos } from "./ajax/loadsArticulos.js";
import { loadArticleContent } from "./ajax/displayArticulo.js";

document.addEventListener("DOMContentLoaded", function () {
  // Llama a la función para cargar archivos CSS, HTML y PHP dinámicamente
  preCargaArchivos()
    .then(() => {
      setTimeout(loadArticulo, 100);
      setTimeout(setupNavbarMenuAnimation, 100);
      setTimeout(initCardAnimation, 100);
      setTimeout(initLogout, 100);
      setTimeout(generateButton, 100);
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

  setTimeout(() => {
    let saveButton = document.getElementById("btnCreate");
    console.log("DOM completamente cargado");

    if (saveButton) {
      console.log("Botón encontrado");
      saveButton.addEventListener("click", newArticle);
    } else {
      console.log("Botón no encontrado");
    }
  }, 100);
});

async function loadArticulo() {
  try {
    // Obtener el parámetro 'id' del query string usando fetch
    const urlParams = new URLSearchParams(window.location.search);
    const articuloId = urlParams.get("articulo_id");
    console.log("El ID es:", articuloId);

    if (articuloId) {
      try {
        await loadArticleContent(articuloId);
        console.log("Artículo cargado exitosamente.");
      } catch (error) {
        console.error("Error al cargar el artículo:", error);
        showError(
          "Ocurrió un error al cargar el artículo. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } else {
      // Si no se proporciona un ID de artículo, intenta cargar todos los artículos después de un pequeño retraso
      try {
        setTimeout(renderArticulos, 100);
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
        showError(
          "Ocurrió un error al cargar los artículos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  } catch (error) {
    console.error("Error al obtener el parámetro de la URL:", error);
    showError(
      "Ocurrió un error al obtener el parámetro de la URL. Por favor, inténtalo de nuevo más tarde."
    );
  }
}

// Función para mostrar mensajes de error en la interfaz de usuario
function showError(message) {
  const container = document.getElementById("main_cards_article");
  if (container) {
    container.innerHTML = `<div class="error-message">${message}</div>`;
  } else {
    console.error("El contenedor principal no se encontró.");
  }
}

function generateButton() {
  fetch("../../server/api/get_session.php")
    .then((response) => response.json())
    .then((sessionData) => {
      console.log("Session Data:", sessionData); // Verifica el contenido de sessionData

      if (sessionData.privilegio === true) {
        var mainCardsArticle = document.getElementById("main_cards_article");
        var buttonContainer = document.getElementById("button-container");
        var createArticleForm = document.getElementById("create-article-form");

        // Verificar si el elemento y el contenedor existen en el DOM
        if (mainCardsArticle && buttonContainer) {
          // Verificar si el elemento tiene clases
          if (mainCardsArticle.classList.length === 0) {
            // Crear el botón
            var button = document.createElement("button");

            button.textContent = "Crear Nuevo Artículo"; // Texto del botón
            button.className = "create-article-button"; // Clase para el botón

            // Añadir el evento onclick al botón
            button.onclick = function () {
              // Mostrar el formulario de creación de artículo
              if (createArticleForm) {
                createArticleForm.classList.remove("hidden");
                createArticleForm.classList.add(
                  "show",
                  "visible",
                  "cardg",
                  "active"
                );
              }
            };

            // Añadir el botón al contenedor
            buttonContainer.appendChild(button);
          }
        } else {
          console.error(
            'Elemento con id "main_cards_article" o "button-container" no encontrado en el DOM.'
          );
        }
      }
    })
    .catch((error) =>
      console.error("Error al obtener los datos de sesión:", error)
    );
}

// Función para enviar el formulario de creación de artículo
function newArticle() {
  console.log("Función newArticle llamada");
  let articuloForm = document.getElementById("creacionForm");

  if (articuloForm) {
    console.log("Formulario encontrado");
    let formDataArticulo = new FormData(articuloForm);

    fetch("../../server/api/set_articulos.php", {
      method: "POST",
      body: formDataArticulo,
    })
      .then((response) => {
        return response.json().catch(() => {
          throw new Error("Respuesta del servidor no es un JSON válido.");
        });
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        if (data.success) {
          alert("Artículo creado exitosamente");
          // hideCreateForm();
          // location.reload();
        } else {
          alert("Error al crear el artículo: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al crear el artículo. Inténtalo de nuevo más tarde.");
      });
  } else {
    console.log("Formulario no encontrado");
  }
}
