<?php
// Mostrar errores de PHP para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function renderArticuloCompleto($article, $sessionData)
{
  // Verificar y manejar diferentes respuestas JSON
  $editButtonHTML = "";
  if (isset($sessionData['success']) && $sessionData['success'] === true) {
    // Usuario autenticado
    if (isset($sessionData['privilegio']) && $sessionData['privilegio']) {
      // Usuario con privilegios avanzados
      $editButtonHTML = '
        <div class="botones-articulos">
          <button class="edit-button" data-article-id=' . htmlspecialchars($article['id'] ?? '', ENT_QUOTES, 'UTF-8') . ' aria-label="Edit Article" onclick="showEditForm(this)">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#102027"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            <span style="display: none;">editar</span>
          </button>
          <button class="delete-button" onclick="deleteArticle(' . htmlspecialchars($article['id'] ?? '', ENT_QUOTES, 'UTF-8') . ')">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#102027"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
        </div>';
    }
  }

  // Crear el HTML para el artículo
  $output = $editButtonHTML . '
    <div class="articulo-completo" id="articulo-' . htmlspecialchars($article['id'] ?? '', ENT_QUOTES, 'UTF-8') . '">
      <h1>' . htmlspecialchars($article['titulo'] ?? '', ENT_QUOTES, 'UTF-8') . '</h1>
      <p>Creado: ' . htmlspecialchars($article['fecha_creacion'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>
      <p>Actualizado: ' . htmlspecialchars($article['fecha_modificacion'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>
      <p>Categoría: ' . htmlspecialchars($article['categoria_nombre'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>
      <p>Autor: ' . htmlspecialchars($article['autor_nombre'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>
      <p>' . htmlspecialchars($article['contenido'] ?? '', ENT_QUOTES, 'UTF-8') . '</p>
    </div>';

  return $output;
}

// Leer los datos enviados en el cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos sean correctos
if (isset($data['article']) && isset($data['sessionData'])) {
  echo renderArticuloCompleto($data['article'], $data['sessionData']);
} else {
  echo "Datos de artículo o sesión no proporcionados.";
}
