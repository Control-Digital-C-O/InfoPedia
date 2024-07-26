function showEditForm(button) {
  const articleId = button.getAttribute("data-article-id");
  const editForm = document.getElementById("edit-article-form");
  const articleIdInput = document.getElementById("article-id");

  // Asigna el ID del artículo al campo oculto
  articleIdInput.value = articleId;

  // Cambia la clase de hidden a show
  editForm.classList.remove("hidden");
  editForm.classList.add("show", "visible", "cardg", "active"); // Puedes usar 'show-green', 'show-red', etc.

  fetch(`../../server/api/get_articulos.php?id=${articleId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Rellenar el formulario con los datos obtenidos
        document.getElementById("titulo").value = data.data.titulo;
        document.getElementById("contenido").value = data.data.contenido;
      } else {
        alert("No se pudo obtener los datos del artículo");
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Función para ocultar el formulario
function hideEditForm() {
  const editForm = document.getElementById("edit-article-form");
  editForm.classList.remove(
    "show",
    "visible",
    "show-blue",
    "show-green",
    "show-red",
    "cardg",
    "active"
  );
  editForm.classList.add("hidden");
}

function submitEdicionForm() {
  const articleId = document.getElementById("article-id").value;
  const title = document.getElementById("titulo").value;
  const content = document.getElementById("contenido").value;

  const data = {
    id: articleId,
    title: title,
    content: content,
  };

  fetch("../../server/api/update_articulos.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Artículo actualizado exitosamente");
        hideEditForm();
        location.reload();
        // Aquí puedes añadir código para actualizar la vista de los artículos si es necesario
      } else {
        alert("Error al actualizar el artículo: " + data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function deleteArticle(articleId) {
  // Confirmar la eliminación
  if (!confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
    return; // Salir si el usuario cancela
  }

  fetch("../../server/api/delete_articulos.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: articleId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Artículo eliminado exitosamente");
        // Redirigir a la página de inicio
        window.location.href = "../../index.html"; // Cambia esto a la URL de tu página de inicio
      } else {
        alert("Error al eliminar el artículo: " + data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}
