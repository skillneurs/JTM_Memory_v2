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
</head>
<body>
    <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['user']['identifiant']); ?> !</h1>
    <p>Voici votre score ou autres données personnelles.</p>
    <a href="../../frontend/home.html">Jouer</a>
    <a href="logout.php">Se déconnecter</a>
</body>
</html>
