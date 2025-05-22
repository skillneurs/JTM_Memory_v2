<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Inclure le fichier de connexion
require_once "database.php";

// Récupérer les données envoyées en JSON
$donnees = json_decode(file_get_contents("php://input"), true);
file_put_contents("log.txt", print_r($donnees, true));


// Vérifie qu'on a bien reçu un score
if (isset($donnees["score"])) {
    $score = intval($donnees["score"]);

    // TEMPORAIRE : identifiant utilisateur fictif pour les tests
    $users_id = 1;

    // Préparer et exécuter l'insertion du score
    $stmt = $pdo->prepare("INSERT INTO scores (utilisateur_id, score, date) VALUES (?, ?, NOW())");
    $stmt->execute([$users_id, $score]);

    echo "Score enregistré avec succès.";
} else {
    echo "Erreur : score non reçu.";
}
?>
