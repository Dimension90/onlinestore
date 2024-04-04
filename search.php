<?php
require_once 'db_connect_store.php';

$searchValue = $_POST['searchValue'];

$stmt = $conn->prepare("SELECT * FROM products WHERE name LIKE ?");
if ($stmt === false) {
    die('Ошибка при подготовке запроса: ' . $conn->error);
}
$searchValue = '%' . $searchValue . '%';
$stmt->bind_param("s", $searchValue);
$stmt->execute();

$result = $stmt->get_result();
$products = $result->fetch_all(MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($products);

$stmt->close();
$conn->close();
?>
