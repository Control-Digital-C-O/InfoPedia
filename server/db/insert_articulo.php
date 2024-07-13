<?php
include 'functions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $titulo = $_POST['titulo'];
  $contenido = $_POST['contenido'];
  $categoria_id = $_POST['categoria_id'];
  $autor_id = $_POST['autor_id'];

  insertarArticulo($titulo, $contenido, $categoria_id, $autor_id);

  echo json_encode(["mensaje" => "Artículo insertado correctamente."]);
}
