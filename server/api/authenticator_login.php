<?php
// Inicia la sesión
session_start();

// Función para obtener el nivel de autoridad del usuario
function getUserAuthority($user_id)
{
  require '../config.php';

  // Preparar y ejecutar la consulta para obtener el rol del usuario
  $stmt = $conexion->prepare("SELECT rol FROM usuarios WHERE id = ?");
  if ($stmt === false) {
    echo json_encode(['card' => '', 'rol' => '', 'message' => 'Error en la preparación de la consulta: ' . $conexion->error]);
    exit();
  }

  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();

  $user = $result->fetch_assoc();
  $stmt->close();
  $conexion->close();

  // Retornar el rol del usuario
  return $user ? $user['rol'] : '';
}

// Verifica si hay una sesión activa
if (isset($_SESSION['user_id'])) {
  // Usuario autenticado
  $user_id = $_SESSION['user_id'];
  $authority_level = getUserAuthority($user_id);

  $response = array(
    'card' => '../components/userCard.html',
    'rol' => $authority_level
  );
} else {
  // No hay sesión activa
  $response = array(
    'card' => '../components/loginCard.html',
    'rol' => ''
  );
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
