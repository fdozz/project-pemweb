<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "myproject_db"; // sesuaikan dengan nama database kamu di phpMyAdmin

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode([
    "success" => false,
    "message" => "Koneksi ke database gagal: " . $conn->connect_error
  ]));
}
?>
