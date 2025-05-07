<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link rel="stylesheet" href="../log/log.css">
</head>
<body>
    <div class="container">
        <h1>Inscription</h1>
        <form action="" method="post">
            <div class="champ">
                <input type="text" name="nom" placeholder="Votre nom" autocomplete="off" id="nom" required>
                <input type="text" name="prenom" placeholder="Votre prenom" autocomplete="off" id="prenom" reaquired>
                <input type="text" name="identifiant" placeholder="Choissisez votre identifiant" id="identifiant" autocomplete="off" required>
                <input type="text" name="mdp" placeholder="Choissisez votre mot de passe" id="mdp" autocomplete="off" required>
                <input type="submit" name="inscrire" value="S'inscrire" id="inscrire"> 
            </div>
        </form>

        <?php

        if(isset($_POST['inscrire'])) {
            // Récupération des données du formulaire
            $nom = $_POST['nom'];
            $prenom = $_POST['prenom'];
            $identifiant = $_POST['identifiant'];
            $mdp = $_POST['mdp'];

            if(empty($nom) || empty($prenom) || empty($identifiant) || empty($mdp)) {
                echo "Veuillez remplir tous les champs !<br>";
            } else {
                // Ici, vous pouvez ajouter le code pour enregistrer l'utilisateur dans la base de données
                echo "Inscription réussie !<br>";
            }
        }

        ?>
    </div>
</body>
</html>