<?php
session_start(); // Démarrer la session


?>

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
                <input type="text" name="nom" placeholder="Votre nom" autocomplete="off" id="nom">
                <input type="text" name="prenom" placeholder="Votre prenom" autocomplete="off" id="prenom">
                <input type="text" name="identifiant" placeholder="Choissisez votre identifiant" id="identifiant"
                    autocomplete="off">
                <input type="password" name="mdp" placeholder="Choissisez votre mot de passe" id="mdp"
                    autocomplete="off" required>
                <input type="password" name="cmdp" placeholder="Confirmer votre mot de passe" id="cmdp"
                    autocomplete="off" required>
                <input type="submit" name="inscrire" value="S'inscrire" id="inscrire">
            </div>
        </form>

        <?php



        if (isset($_POST['inscrire'])) {

            extract($_POST); // Récupérer les valeurs du formulaire
        

            if (!empty($mdp) && !empty($cmdp) && !empty($identifiant) && !empty($nom) && !empty($prenom)) {

                if ($mdp == $cmdp) {
                    // Vérifier si les mots de passe correspondent
                    $options = [
                        'cost' => 12,
                    ];
                    $hashpass = password_hash($mdp, PASSWORD_BCRYPT, $options);

                    include('../log/database.php'); // Inclure le fichier de connexion à la base de données
                    global $db;

                    $c = $db->prepare("SELECT identifiant FROM users WHERE identifiant = :identifiant");
                    $c->execute([
                        'identifiant' => $identifiant
                    ]);

                    $result = $c->rowCount();

                    echo $result;

                    if ($result == 0) {
                        // Si l'identifiant n'existe pas, on peut l'ajouter
                        $q = $db->prepare("INSERT INTO users (nom, prenom, identifiant, mdp) VALUES (:nom, :prenom, :identifiant, :mdp)");
                        $q->execute([
                            'nom' => $nom,
                            'prenom' => $prenom,
                            'identifiant' => $identifiant,
                            'mdp' => $hashpass
                        ]);
                        echo "Inscription réussie !<br>";
                        header('Location: login.php'); // Rediriger vers la page de connexion
                    } else {
                        echo "Cet identifiant existe déjà !<br>";
                    }


                }

                /*if (password_verify($mdp, $hashpass)) {
                    echo "Le mot de passe est valide !<br>";
                } else {
                    echo "Le mot de passe n'est pas valide !<br>";
                }

                
                
                //Ajouter un utilisateur à la base de données
                $q_add_user = $db->prepare("INSERT INTO users (nom, prenom, identifiant, mdp) VALUES (:nom, :prenom, :identifiant, :mdp)");
                $q_add_user->execute([
                    'nom' => 'test1',
                    'prenom' => 'test1',
                    'identifiant' => 'test1',
                    'mdp' => $hashpass
                ]);*/




            } else {
                echo "Veuillez remplir tous les champs !<br>";
            }
        }

        ?>
    </div>
</body>

</html>