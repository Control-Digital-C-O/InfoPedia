<?php
header("Content-Type: application/json");
session_start();

$response = array("success" => false);

if (isset($_SESSION['username'])) {
  $response = array(
    "success" => true,
    "message" => "Inicio de sesión exitoso",
    "user_id" => $_SESSION['user_id'],
    "username" => $_SESSION['username'],
    "rol" => $_SESSION['rol'],
    "email" => $_SESSION['email'],
    "password" => $_SESSION['password']
  );
} else {
  $response = array(
    "message" => "No esta logueado",
    "rol" => "guest"
  );
}
if ($response["rol"] == 'master' || $response["rol"] == 'colaborador' || $response["rol"] == 'admin') {
  $response["privilegio"] = true;
} else {
  $response["privilegio"] = false;
};

echo json_encode($response);
