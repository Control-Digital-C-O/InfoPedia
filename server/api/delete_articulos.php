<?php
header("Content-Type: application/json");
$response = array("success" => false, "message" => "");

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
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

if (!isset($input['id'])) {
  $response["message"] = "Falta el campo requerido: id";
  echo json_encode($response);
  exit();
}

$id = $input['id'];

require '../config.php';

$stmt = $conexion->prepare("DELETE FROM articulos WHERE id = ?");
if ($stmt === false) {
  $response["message"] = "Error en la preparación de la consulta: " . $conexion->error;
  echo json_encode($response);
  exit();
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  if ($stmt->affected_rows > 0) {
    $response["success"] = true;
    $response["message"] = "Artículo eliminado exitosamente";
  } else {
    $response["message"] = "No se encontró el artículo";
  }
} else {
  $response["message"] = "Error al eliminar el artículo: " . $stmt->error;
}

$stmt->close();
$conexion->close();

echo json_encode($response);
