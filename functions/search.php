<?php
// Ubicación de las carpetas.
$carpeta_php = "../server/api"; // Ajusta la ubicación según sea necesario.
$carpeta_css = "../css";
$carpeta_html = "../components";

// Función para escanear y filtrar archivos por extensión.
function obtenerArchivos($directorio, $extension)
{
  $rutas_archivos = array();
  if (is_dir($directorio)) {
    $contenido = scandir($directorio);
    foreach ($contenido as $archivo) {
      if (pathinfo($archivo, PATHINFO_EXTENSION) === $extension) {
        $ruta_archivo = $directorio . '/' . $archivo; // Usamos '/' en lugar de DIRECTORY_SEPARATOR para rutas web
        $rutas_archivos[] = $ruta_archivo;
      }
    }
  }
  return $rutas_archivos;
}

// Obtener listas de archivos.
$rutas_archivos_php = obtenerArchivos($carpeta_php, 'php');
$rutas_archivos_css = obtenerArchivos($carpeta_css, 'css');
$rutas_archivos_html = obtenerArchivos($carpeta_html, 'html');

// Función para ajustar el orden de prioridad de los archivos HTML
function prioridad(&$html_array, $nombre_componente, $prioridad)
{
  $index = array_search($nombre_componente, $html_array);
  if ($index !== false) {
    array_splice($html_array, $index, 1); // Eliminar el elemento encontrado
  }
  switch ($prioridad) {
    case 'start':
      array_unshift($html_array, $nombre_componente);
      break;
    case 'end':
      array_push($html_array, $nombre_componente);
      break;
    case 'eliminate':
      break;
    default:
      // Si la prioridad es un número, insertarlo en la posición específica
      if (is_numeric($prioridad) && $prioridad >= 0 && $prioridad < count($html_array)) {
        array_splice($html_array, $prioridad, 0, $nombre_componente);
      }
      break;
  }
}

// Ajustar el orden de prioridad de los componentes HTML
prioridad($rutas_archivos_html, '../components/header.html', 'start');
prioridad($rutas_archivos_html, '../components/footer.html', 'end');
prioridad($rutas_archivos_html, '../components/loginCard.html', 'eliminate');

// Combinar las listas en un solo objeto JSON.
$resultado = array(
  'php' => $rutas_archivos_php,
  'css' => $rutas_archivos_css,
  'html' => $rutas_archivos_html
);

// Devolver respuesta como JSON
header('Content-Type: application/json');
echo json_encode($resultado, JSON_PRETTY_PRINT);
