// Animación del menu hamburguesa
// Función para animar el menú de la barra de navegación
export function setupNavbarMenuAnimation() {
  // Obtener elementos del DOM
  var iconMenu = document.getElementById("icon-menu");
  var barsMenu = document.querySelector(".bars__menu");
  var navbar = document.querySelector(".nav__links");
  var line1__bars = document.querySelector(".line1__bars-menu");
  var line2__bars = document.querySelector(".line2__bars-menu");
  var line3__bars = document.querySelector(".line3__bars-menu");
  var body = document.querySelector("body");

  // Verificar la existencia de los elementos necesarios
  if (
    iconMenu &&
    barsMenu &&
    navbar &&
    line1__bars &&
    line2__bars &&
    line3__bars &&
    body
  ) {
    // Función para animar las barras del menú
    function animateBars() {
      line1__bars.classList.toggle("activeline1__bars-menu");
      line2__bars.classList.toggle("activeline2__bars-menu");
      line3__bars.classList.toggle("activeline3__bars-menu");
      navbar.classList.toggle("nav__links--open");
      body.classList.toggle("no-scroll");
    }

    // Función para cerrar el menú si se hace clic fuera
    function closeMenuOnClickOutside(event) {
      if (
        !iconMenu.contains(event.target) &&
        !barsMenu.contains(event.target) &&
        !navbar.contains(event.target)
      ) {
        if (navbar.classList.contains("nav__links--open")) {
          line1__bars.classList.remove("activeline1__bars-menu");
          line2__bars.classList.remove("activeline2__bars-menu");
          line3__bars.classList.remove("activeline3__bars-menu");
          navbar.classList.remove("nav__links--open");
          body.classList.remove("no-scroll");
        }
      }
    }

    // Escuchar el evento click en el icono del menú y en el botón hamburguesa
    iconMenu.addEventListener("click", animateBars);
    barsMenu.addEventListener("click", animateBars);

    // Escuchar eventos de clic en el documento para cerrar el menú si se hace clic fuera
    document.addEventListener("click", closeMenuOnClickOutside);
  } else {
    console.error(
      "Elemento con ID 'icon-menu' o clase 'bars__menu' no encontrado."
    );
  }
}

// Animación de card login
export function initCardAnimation() {
  var iconUser = document.getElementById("iconUser");
  var card = document.querySelector(".card");

  if (iconUser && card) {
    // Función para mostrar/ocultar la tarjeta y cambiar el cursor
    function toggleCard(event) {
      card.classList.toggle("active");
      iconUser.style.cursor = card.classList.contains("active")
        ? "default"
        : "pointer";
      event.stopPropagation(); // Evita que el clic se propague al documento
    }

    iconUser.addEventListener("click", toggleCard);

    // Función para cerrar la tarjeta si se hace clic fuera
    function closeCardOnClickOutside(event) {
      if (!card.contains(event.target) && !event.target.closest(".card")) {
        card.classList.remove("active");
        iconUser.style.cursor = "pointer";
      }
    }

    document.addEventListener("click", closeCardOnClickOutside);
  } else {
    console.error("Elemento con id 'iconUser' o 'card' no encontrado");
  }
}
