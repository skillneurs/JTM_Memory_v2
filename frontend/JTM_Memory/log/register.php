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
                <input type="text" name="nom" placeholder="Votre nom" autocomplete="off" required>
                <input type="text" name="prenom" placeholder="Votre prenom" autocomplete="off" reaquired>
                <input type="text" name="identifiant" placeholder="Choissisez votre identifiant" autocomplete="off" required>
                <input type="text" name="mdp" placeholder="Choissisez votre mot de passe" autocomplete="off" required>
                <input type="submit" name="inscrire" value="S'inscrire">
            </div>
            <?php
            if(isset($_POST['inscrire'])) {
                echo "Inscription réussie !";
            }
            ?>

        </form>
    </div>
</body>
</html>