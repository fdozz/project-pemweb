<?php
header('Content-Type: application/json');
require 'db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
  echo json_encode(["success" => false, "message" => "Isi email dan password."]);
  exit;
}

// Ambil data user
$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
  // Email tidak ditemukan
  $ip = $_SERVER['REMOTE_ADDR'];
  $log = $conn->prepare("INSERT INTO login_logs (event_type, email, ip_address, success) VALUES ('signin', ?, ?, 0)");
  $log->bind_param("ss", $email, $ip);
  $log->execute();

  echo json_encode(["success" => false, "message" => "Email tidak ditemukan."]);
  exit;
}

// Verifikasi password
if (password_verify($password, $user['password'])) {
  $ip = $_SERVER['REMOTE_ADDR'];
  $log = $conn->prepare("INSERT INTO login_logs (user_id, event_type, email, ip_address, success) VALUES (?, 'signin', ?, ?, 1)");
  $log->bind_param("iss", $user['id'], $email, $ip);
  $log->execute();

  echo json_encode(["success" => true, "message" => "Sign In berhasil!", "username" => $user['username']]);
} else {
  $ip = $_SERVER['REMOTE_ADDR'];
  $log = $conn->prepare("INSERT INTO login_logs (user_id, event_type, email, ip_address, success) VALUES (?, 'signin', ?, ?, 0)");
  $log->bind_param("iss", $user['id'], $email, $ip);
  $log->execute();

  echo json_encode(["success" => false, "message" => "Password salah."]);
}
?>
