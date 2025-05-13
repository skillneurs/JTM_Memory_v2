<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="../log/log.css">
    <link rel="stylesheet" href="../../css/font.css">

</head>

<body>
    <div class="container">
        <h1>Connexion</h1>
        <form action="" method="post">
            <div class="champ">
                <input type="text" name="identifiant" placeholder="Identifiant" autocomplete="off">
                <input type="password" name="mdp" placeholder="Mot de Passe" autocomplete="off">
                <input type="submit" name="connecter" value="Se connecter" id="connecter">
                <a href="../log/register.php">Vous navez pas de compte ? Créez en un!</a>
                <a href="../home.html" id="btn-redirection-accueil">Continuer sans compte</a>
            </div>
        </form>

        <?php
        if (isset($_POST['connecter'])) {
            extract($_POST); // Récupérer les valeurs du formulaire
        
            if (!empty($mdp) && !empty($identifiant)) {
                include('../log/database.php'); // Inclure le fichier de connexion à la base de données
                global $db;

                $c = $db->prepare("SELECT * FROM users WHERE identifiant = :identifiant");
                $c->execute([
                    'identifiant' => $identifiant
                ]);

                $result = $c->fetch();

                if ($result) {
                    if (password_verify($mdp, $result['mdp'])) {
                        echo "Connexion réussie !";
                        // Rediriger vers une autre page 
                        header("Location: ../home.html");
                    } else {
                        echo "Identifiant ou mot de passe incorrect.";
                    }
                } else {
                    echo "Identifiant ou mot de passe incorrect.";
                }
            } else {
                echo "Veuillez remplir tous les champs.";
            }
        }

        ?>

    </div>
</body>

</html>