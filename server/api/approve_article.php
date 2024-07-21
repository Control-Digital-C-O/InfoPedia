<?php
header("Content-Type: application/json");
$response = array("success" => false, "message" => "");

// Verificar si la solicitud es POST
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

if (!isset($input['id'])) {
  $response["message"] = "Falta el ID del artículo";
  echo json_encode($response);
  exit();
}

$id = $input['id'];

require '../config.php';

// Preparar y ejecutar la consulta
$stmt = $conexion->prepare("UPDATE articulos SET aprobado = 1 WHERE id = ?");
if ($stmt === false) {
  $response["message"] = "Error en la preparación de la consulta: " . $conexion->error;
  echo json_encode($response);
  exit();
}

$stmt->bind_param("i", $id);
if ($stmt->execute()) {
  $response["success"] = true;
  $response["message"] = "Artículo aprobado exitosamente";
} else {
  $response["message"] = "Error al aprobar el artículo: " . $stmt->error;
}

$stmt->close();
$conexion->close();

echo json_encode($response);
