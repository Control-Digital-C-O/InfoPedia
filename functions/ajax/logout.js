// Función para manejar el evento de clic en el botón de cerrar sesión
export function initLogout() {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }
}

function handleLogout(event) {
  event.preventDefault();
  fetch("../../server/api/logout.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
        // Redirigir o recargar la página después de cerrar sesión
        window.location.reload();
      } else {
        alert("Error al cerrar sesión");
      }
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
}
