<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = $_POST['input']; // Input bisa berupa username atau email
    $password = $_POST['password'];

    // Koneksi ke database
    $conn = new mysqli('localhost', 'root', '', 'account');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query untuk memeriksa apakah input cocok dengan username atau email
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $input, $input); // Bind input ke kedua parameter
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);

    if ($stmt->fetch() && password_verify($password, $hashed_password)) {
        // Login berhasil
        $_SESSION['user_id'] = $id;
        echo "Login successful!";
    } else {
        // Login gagal
        echo "Invalid username/email or password!";
    }

    $stmt->close();
    $conn->close();
}
?>