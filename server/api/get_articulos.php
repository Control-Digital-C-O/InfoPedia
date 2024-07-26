<?php
header("Content-Type: application/json");
session_start();

$response = array("success" => false, "data" => array(), "pending" => array());

// Conexión a la base de datos
require '../config.php';

// Verificar la conexión a la base de datos
if ($conexion->connect_error) {
  $response["message"] = "Error de conexión: " . $conexion->connect_error;
  echo json_encode($response);
  exit();
}

// Verificar el rol del usuario
$role = isset($_SESSION['rol']) ? $_SESSION['rol'] : 'guest';

// Verificar si se proporcionó un ID de artículo específico
$articulo_id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($articulo_id !== null) {
  // Obtener un artículo específico por su ID con detalles de categoría y autor
  $query_articulo = "SELECT a.*, c.nombre AS categoria_nombre, u.nombre AS autor_nombre
                       FROM articulos a
                       LEFT JOIN categorias c ON a.categoria_id = c.id
                       LEFT JOIN usuarios u ON a.autor_id = u.id
                       WHERE a.id = ?";
  $stmt = $conexion->prepare($query_articulo);
  if ($stmt === false) {
    $response["message"] = "Error en la preparación de la consulta: " . $conexion->error;
    echo json_encode($response);
    exit();
  }

  $stmt->bind_param("i", $articulo_id);
  $stmt->execute();
  $result_articulo = $stmt->get_result();
  $article = $result_articulo->fetch_assoc();

  if ($article) {
    $response["success"] = true;
    $response["data"] = $article;
  } else {
    $response["message"] = "Artículo no encontrado";
  }

  $stmt->close();
} else {
  // Obtener todos los artículos aprobados con detalles de categoría y autor
  $query_approved = "SELECT a.*, c.nombre AS categoria_nombre, u.nombre AS autor_nombre
                       FROM articulos a
                       LEFT JOIN categorias c ON a.categoria_id = c.id
                       LEFT JOIN usuarios u ON a.autor_id = u.id
                       WHERE a.aprobado = 1";
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

  // Si el usuario es colaborador, admin o master, obtener también los artículos pendientes
  $articles_pending = array();
  if ($role !== 'guest' && $role !== 'normal') {
    $query_pending = "SELECT a.*, c.nombre AS categoria_nombre, u.nombre AS autor_nombre
                          FROM articulos a
                          LEFT JOIN categorias c ON a.categoria_id = c.id
                          LEFT JOIN usuarios u ON a.autor_id = u.id
                          WHERE a.aprobado = 0";
    $result_pending = $conexion->query($query_pending);

    // Verificar si la consulta fue exitosa
    if ($result_pending === false) {
      $response["message"] = "Error en la consulta de artículos pendientes: " . $conexion->error;
      echo json_encode($response);
      exit();
    }

    // Obtener todos los artículos pendientes y almacenarlos en un array
    while ($row = $result_pending->fetch_assoc()) {
      $articles_pending[] = $row;
    }
  }

  // Verificar si se encontraron artículos
  $response["rol"] = $role;
  $response["success"] = true;
  $response["data"] = $articles_approved;
  $response["pending"] = $articles_pending;

  $result_approved->free();
  if (isset($result_pending)) {
    $result_pending->free();
  }
}

$conexion->close();
echo json_encode($response);
