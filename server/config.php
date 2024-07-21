<?php
$db_servername = "127.0.0.1";
$db_username = "root";
$db_password = "";
$db_dbname = "db_infopedia";

// Crear la conexión
$conexion = new mysqli($db_servername, $db_username, $db_password, $db_dbname);

// Verificar la conexión
if ($conexion->connect_error) {
  die("Conexión fallida: " . $conexion->connect_error);
}
