<?php
include 'config.php';

function insertarArticulo($titulo, $contenido, $categoria_id, $autor_id)
{
  global $conn;
  $stmt = $conn->prepare("INSERT INTO Articulos (titulo, contenido, categoria_id, autor_id) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssii", $titulo, $contenido, $categoria_id, $autor_id);
  $stmt->execute();
  $stmt->close();
}

function obtenerArticulos()
{
  global $conn;
  $result = $conn->query("SELECT * FROM Articulos");
  $articulos = [];
  while ($row = $result->fetch_assoc()) {
    $articulos[] = $row;
  }
  return $articulos;
}

function obtenerArticuloPorID($id_articulo)
{
  global $conn;
  $stmt = $conn->prepare("SELECT * FROM Articulos WHERE id_articulo = ?");
  $stmt->bind_param("i", $id_articulo);
  $stmt->execute();
  $result = $stmt->get_result();
  $articulo = $result->fetch_assoc();
  $stmt->close();
  return $articulo;
}

function actualizarValoracion($id_articulo, $valoracion)
{
  global $conn;
  $stmt = $conn->prepare("UPDATE Articulos SET valoracion = ? WHERE id_articulo = ?");
  $stmt->bind_param("di", $valoracion, $id_articulo);
  $stmt->execute();
  $stmt->close();
}
