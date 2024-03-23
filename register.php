<?php
require_once 'db_connect.php';

$login = $_POST['login'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$full_name = $_POST['full_name'];
$birthdate = $_POST['birthdate'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$sql = "INSERT INTO users (login, password, full_name, birthdate, email, phone) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $login, $password, $full_name, $birthdate, $email, $phone);

if ($stmt->execute()) {
    header('Location: login.php');
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>
