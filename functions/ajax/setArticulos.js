// Función para ocultar el formulario de creación
function hideCreateForm() {
  var createArticleForm = document.getElementById("create-article-form");
  if (createArticleForm) {
    createArticleForm.classList.remove("show");
    createArticleForm.classList.add("hidden");
  }
}
