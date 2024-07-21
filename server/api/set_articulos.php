<?php
header("Content-Type: application/json");
$response = array("success" => false, "message" => "");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  $response["message"] = "Método de solicitud no permitido";
  echo json_encode($response);
  exit();
}

// Leer el cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
  $response["message"] = "Error en el formato de JSON";
  echo json_encode($response);
  exit();
}

if (!isset($input['title'], $input['content'], $input['author_id'], $input['category_id'])) {
  $response["message"] = "Faltan campos requeridos";
  echo json_encode($response);
  exit();
}

$title = $input['title'];
$content = $input['content'];
$author_id = $input['author_id'];
$category_id = $input['category_id'];

require '../config.php';

$stmt = $conexion->prepare("INSERT INTO articulos (titulo, contenido, autor_id, categoria_id) VALUES (?, ?, ?, ?)");
if ($stmt === false) {
  $response["message"] = "Error en la preparación de la consulta: " . $conexion->error;
  echo json_encode($response);
  exit();
}

$stmt->bind_param("ssii", $title, $content, $author_id, $category_id);

if ($stmt->execute()) {
  $response["success"] = true;
  $response["message"] = "Artículo creado exitosamente";
} else {
  $response["message"] = "Error al crear el artículo: " . $stmt->error;
}

$stmt->close();
$conexion->close();

echo json_encode($response);
