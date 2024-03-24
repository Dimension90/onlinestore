<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}

require_once 'db_connect.php';

$userId = $_SESSION['user_id'];
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет | <?php echo htmlspecialchars($user['full_name']); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles/stylesAccount.css">
</head>
<body>
    <header>
        <div class="header-container">
            <img src="./img/apple.png" alt="Apple logo">
            <h1>Личный кабинет | <?php echo htmlspecialchars($user['full_name']); ?></h1>
        </div>
        <div class="header-buttons">
                <a href="index.html">На главную</a>
                <a href="logout.php">Выйти</a>
            </div>
    </header>
    <main>
    <div class="user-info">
        <h2 class="d-flex align-items-center user-info-header user-info-header-border" data-bs-toggle="collapse" data-bs-target="#userInfoCollapse">
            Информация о пользователе
            <i class="bi bi-chevron-down collapse-icon collapse-show"></i>
            <i class="bi bi-chevron-right collapse-icon collapse-hide"></i>
        </h2>
        <div id="userInfoCollapse" class="collapse">
            <p><strong>Имя:</strong> <?php echo htmlspecialchars($user['full_name']); ?></p>
            <p><strong>Логин:</strong> <?php echo htmlspecialchars($user['login']); ?></p>
            <p><strong>E-mail:</strong> <?php echo htmlspecialchars($user['email']); ?></p>
            <p><strong>Телефон:</strong> <?php echo htmlspecialchars($user['phone']); ?></p>
        </div>
    </div>
    <div class="user-stack">
        <h3 class="user-info-header-border" data-bs-toggle="collapse" data-bs-target="#ordersCollapse">
            Мои заказы
            <i class="bi bi-chevron-down collapse-icon collapse-show"></i>
            <i class="bi bi-chevron-right collapse-icon collapse-hide"></i>
        </h3>
        <div id="ordersCollapse" class="collapse">
            <ul>
                iPhone 11
            </ul>
        </div>
    </div>

    <div class="user-stack">
        <h3 class="user-info-header-border" data-bs-toggle="collapse" data-bs-target="#favoritesCollapse">
            Избранное
            <i class="bi bi-chevron-down collapse-icon collapse-show"></i>
            <i class="bi bi-chevron-right collapse-icon collapse-hide"></i>
        </h3>
        <div id="favoritesCollapse" class="collapse">
            <ul>
                iPhone 14 pro max
            </ul>
        </div>
    </div>

    <div class="user-stack">
        <h3 class="user-info-header-border" data-bs-toggle="collapse" data-bs-target="#settingsCollapse">
            Настройки
            <i class="bi bi-chevron-down collapse-icon collapse-show"></i>
            <i class="bi bi-chevron-right collapse-icon collapse-hide"></i>
        </h3>
        <div id="settingsCollapse" class="collapse">
            Сменить пароль
        </div>
    </div>
</main>
    <footer>
    <p>2024 Apple Store</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz4fnFO9gybBud7TlRbs/ic4AwGcFZOxg5DpPt8EgeUIgIwzjWfXQKWA3" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</body>
</html>
