<?php
session_start();
session_unset();
session_destroy();
header("Content-Type: application/json");
$response = array("success" => true, "message" => "Sesión cerrada correctamente");
echo json_encode($response);
exit();
