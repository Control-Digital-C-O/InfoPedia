<?php
include '../functions.php';

$articulos = obtenerArticulos();

header('Content-Type: application/json');
echo json_encode($articulos);
