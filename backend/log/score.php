<?php
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

// Accès autorisé, affiche la page
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Score</title>
    <link rel="stylesheet" href="../../frontend/css/score.css">
    <link rel="stylesheet" href="../../frontend/css/font.css">
</head>
<body>
    <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['user']['identifiant']); ?> !</h1>
    <div class="score">Voici votre score : 0</div>
    <a class="btn-jouer" href="../../frontend/index.html">Jouer</a>
    <a class="btn-logout" href="logout.php">Se déconnecter</a>
    <script src="../../frontend/javascript/home.js"></script>
</body>
</html>
