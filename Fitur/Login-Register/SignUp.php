<?php
header('Content-Type: application/json');
require 'db.php';

$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$email || !$password) {
  echo json_encode(["success" => false, "message" => "Semua field wajib diisi."]);
  exit;
}

// Cek apakah email sudah digunakan
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
  echo json_encode(["success" => false, "message" => "Email sudah terdaftar."]);
  exit;
}

// Hash password dan simpan user baru
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed);
$stmt->execute();

$user_id = $stmt->insert_id;

// Catat log pendaftaran
$ip = $_SERVER['REMOTE_ADDR'];
$log = $conn->prepare("INSERT INTO login_logs (user_id, event_type, email, ip_address, success) VALUES (?, 'signup', ?, ?, 1)");
$log->bind_param("iss", $user_id, $email, $ip);
$log->execute();

echo json_encode(["success" => true, "message" => "Sign Up berhasil!"]);
?>
