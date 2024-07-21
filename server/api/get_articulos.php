<?php
header("Content-Type: application/json");
$response = array("success" => false, "data" => array(), "pending" => array());

// Conexión a la base de datos
require '../config.php';

// Verificar la conexión a la base de datos
if ($conexion->connect_error) {
  $response["message"] = "Error de conexión: " . $conexion->connect_error;
  echo json_encode($response);
  exit();
}

// Preparar y ejecutar la consulta para obtener los artículos aprobados
$query_approved = "SELECT * FROM articulos WHERE aprobado = 1";
$result_approved = $conexion->query($query_approved);

// Verificar si la consulta fue exitosa
if ($result_approved === false) {
  $response["message"] = "Error en la consulta de artículos aprobados: " . $conexion->error;
  echo json_encode($response);
  exit();
}

// Obtener todos los artículos aprobados y almacenarlos en un array
$articles_approved = array();
while ($row = $result_approved->fetch_assoc()) {
  $articles_approved[] = $row;
}

// Preparar y ejecutar la consulta para obtener los artículos pendientes/desaprobados
$query_pending = "SELECT * FROM articulos WHERE aprobado = 0";
$result_pending = $conexion->query($query_pending);

// Verificar si la consulta fue exitosa
if ($result_pending === false) {
  $response["message"] = "Error en la consulta de artículos pendientes/desaprobados: " . $conexion->error;
  echo json_encode($response);
  exit();
}

// Obtener todos los artículos pendientes/desaprobados y almacenarlos en un array
$articles_pending = array();
while ($row = $result_pending->fetch_assoc()) {
  $articles_pending[] = $row;
}

// Verificar si se encontraron artículos
$response["success"] = true;
$response["data"] = $articles_approved;
$response["pending"] = $articles_pending;

$result_approved->free();
$result_pending->free();
$conexion->close();

echo json_encode($response);
