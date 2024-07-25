<?php
header("Content-Type: application/json");
$response = array("success" => false, "message" => "", "username" => "");

// Verificar el método de la solicitud
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

// Verificar los campos requeridos
if (!isset($input['username_or_email']) || !isset($input['password'])) {
  $response["message"] = "Faltan campos requeridos";
  echo json_encode($response);
  exit();
}

$username_or_email = $input['username_or_email'];
$password_input = $input['password'];

require '../config.php';

// Verificar la conexión a la base de datos
if ($conexion->connect_error) {
  $response["message"] = "Error de conexión: " . $conexion->connect_error;
  echo json_encode($response);
  exit();
}

// Preparar y ejecutar la consulta
$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE nombre = ? OR email = ?");
if ($stmt === false) {
  $response["message"] = "Error en la preparación de la consulta: " . $conexion->error;
  echo json_encode($response);
  exit();
}

$stmt->bind_param("ss", $username_or_email, $username_or_email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Verificar si el usuario fue encontrado
if ($user === null) {
  $response["message"] = "Usuario no encontrado. Consulta SQL: SELECT * FROM usuarios WHERE nombre = '$username_or_email' OR email = '$username_or_email'";
  echo json_encode($response);
  exit();
} else {
  // Verificar la contraseña
  if ($password_input === $user['password']) {
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['nombre'];
    $response["success"] = true;
    $response["message"] = "Inicio de sesión exitoso";
    $response["username"] = $user['nombre'];
    $response["user_id"] = $user['id'];
  } else {
    $response["message"] = "Contraseña incorrecta";
  }
}

$stmt->close();
$conexion->close();

echo json_encode($response);
