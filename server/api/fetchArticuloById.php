<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function fetchArticuloById($id)
{
  if (empty($id) || !is_numeric($id)) {
    return array("success" => false, "message" => "ID de artículo no válido.");
  }

  // Construir la URL completa dinámicamente
  $scheme = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] : 'http';
  $host = $_SERVER['HTTP_HOST'];
  $url = $scheme . '://' . $host . '/server/api/get_articulos.php?id=' . $id;

  // Usar cURL para obtener el contenido
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  $response = curl_exec($ch);

  if (curl_errno($ch)) {
    $error = curl_error($ch);
    curl_close($ch);
    return array("success" => false, "message" => "Error en la solicitud cURL: " . $error);
  }

  curl_close($ch);

  // Decodificar la respuesta JSON
  $data = json_decode($response, true);
  if ($data === NULL) {
    return array("success" => false, "message" => "Error al decodificar la respuesta JSON.");
  }

  if (isset($data['success']) && $data['success']) {
    return $data['data'];
  } else {
    return array("success" => false, "message" => $data['message'] ?? "Artículo no encontrado.");
  }
}

// Ejemplo de uso
$id = isset($_GET['id']) ? $_GET['id'] : null;
$articulo = array(
  'success' => true,
  'data' =>
  fetchArticuloById($id)
);

header('Content-Type: application/json');
echo json_encode($articulo);
