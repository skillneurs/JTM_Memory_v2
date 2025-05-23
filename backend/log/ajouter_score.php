<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Connexion à la base de données
$pdo = new PDO("mysql:host=109.234.161.199;dbname=jonteomat2_memory", "jonteomat2_jonteomat2", "*56j3_j/CVNp", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);


// Récupérer les données envoyées en JSON
$donnees = json_decode(file_get_contents("php://input"), true);
file_put_contents("log.txt", print_r($donnees, true));


// Vérifie qu'on a bien reçu un score
if (isset($donnees["score"])) {
    $score = intval($donnees["score"]);

    // TEMPORAIRE : identifiant utilisateur fictif pour les tests
    $users_id = 1;

    // Préparer et exécuter l'insertion du score
    $stmt = $pdo->prepare("INSERT INTO scores (users_id, score, date) VALUES (?, ?, NOW())");
    $stmt->execute([$users_id, $score]);

    echo "Score enregistré avec succès.";
} else {
    echo "Erreur : score non reçu.";
}
?>