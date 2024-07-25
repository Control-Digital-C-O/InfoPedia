<?php
header("Content-Type: application/json");
session_start();

$response = array("success" => false, "username" => "");

if (isset($_SESSION['username'])) {
  $response["success"] = true;
  $response["username"] = $_SESSION['username'];
}

echo json_encode($response);
