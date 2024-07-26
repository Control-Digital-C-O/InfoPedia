<?php
header("Content-Type: application/json");

try {
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require '../config.php';
    session_start();

    if (!isset($_SESSION['user_id'])) {
      echo json_encode(array("success" => false, "message" => "No estás logueado."));
      exit;
    }

    $titulo = $_POST['title'] ?? null;
    $contenido = $_POST['content'] ?? null;

    if (!$titulo || !$contenido) {
      echo json_encode(array("success" => false, "message" => "Datos incompletos."));
      exit;
    }

    $autor_id = $_SESSION['user_id'];

    $sql = "INSERT INTO articulos (titulo, contenido, autor_id) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if ($stmt === false) {
      throw new Exception("Error en la preparación de la consulta.");
    }

    $stmt->bind_param("ssi", $titulo, $contenido, $autor_id);

    if ($stmt->execute()) {
      echo json_encode(array("success" => true, "message" => "Artículo creado exitosamente."));
    } else {
      throw new Exception("Error al crear el artículo.");
    }

    $stmt->close();
    $conexion->close();
  } else {
    throw new Exception("Método HTTP no permitido.");
  }
} catch (Exception $e) {
  echo json_encode(array("success" => false, "message" => $e->getMessage()));
}
