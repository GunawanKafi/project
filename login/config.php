<?php
    $host = 'localhost';
    $dbname = 'account';
    $username = 'root';
    $password = '';

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname",$username,$password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "koneksi database berhasil";
    } catch (PDOException $e) {
        echo "koneksi database gagal : " . $e->getMessage(); 
    }
?>