export async function handleLogin(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const form = event.target;
  const formData = new FormData(form);
  const data = {
    username_or_email: formData.get("username_or_email"),
    password: formData.get("password"),
  };

  if (!data.username_or_email || !data.password) {
    alert("Faltan campos requeridos");
    return;
  }

  try {
    const response = await fetch("../../server/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Recargar la página para actualizar el estado de la sesión
      window.location.reload();
    } else {
      // Mostrar mensaje de advertencia si el login falla
      alert(result.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export function dataSession() {
  const usernameSpan = document.getElementById("username");
  if (usernameSpan) {
    // Obtener el nombre de usuario desde la sesión (esto puede necesitar ser ajustado según tu configuración)
    fetch("../server/api/get_session.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.username) {
          usernameSpan.textContent = data.username;
        }
      })
      .catch((error) => {
        console.error("Error al obtener el nombre de usuario:", error);
      });
  }
}
