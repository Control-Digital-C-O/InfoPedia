<?php
header("Content-Type: application/json");
$response = array("success" => false, "message" => "");

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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

if (!isset($input['id'], $input['title'], $input['content'], $input['author_id'], $input['category_id'])) {
  $response["message"] = "Faltan campos requeridos";
  echo json_encode($response);
  exit();
}

$id = $input['id'];
$title = $input['title'];
$content = $input['content'];
$author_id = $input['author_id'];
$category_id = $input['category_id'];

require '../config.php';

$stmt = $conexion->prepare("UPDATE articulos SET titulo = ?, contenido = ?, autor_id = ?, categoria_id = ? WHERE id = ?");
if ($stmt === false) {
  $response["message"] = "Error en la preparación de la consulta: " . $conexion->error;
  echo json_encode($response);
  exit();
}

$stmt->bind_param("ssiii", $title, $content, $author_id, $category_id, $id);

if ($stmt->execute()) {
  if ($stmt->affected_rows > 0) {
    $response["success"] = true;
    $response["message"] = "Artículo actualizado exitosamente";
  } else {
    $response["message"] = "No se encontró el artículo o no hubo cambios";
  }
} else {
  $response["message"] = "Error al actualizar el artículo: " . $stmt->error;
}

$stmt->close();
$conexion->close();

echo json_encode($response);