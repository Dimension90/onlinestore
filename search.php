<?php
require_once 'db_connect_store.php';

$search = $_POST['search'];

$sql = "SELECT * FROM products WHERE name LIKE '%$search%'";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}
header('Content-Type: application/json');
echo json_encode($products);

$conn->close();
