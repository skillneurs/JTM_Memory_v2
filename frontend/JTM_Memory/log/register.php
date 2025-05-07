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
                <input type="text" name="nom" placeholder="Votre nom" autocomplete="off" id="nom" >
                <input type="text" name="prenom" placeholder="Votre prenom" autocomplete="off" id="prenom" >
                <input type="text" name="identifiant" placeholder="Choissisez votre identifiant" id="identifiant" autocomplete="off" >
                <input type="password" name="mdp" placeholder="Choissisez votre mot de passe" id="mdp" autocomplete="off" >
                <input type="submit" name="inscrire" value="S'inscrire" id="inscrire"> 
            </div>
        </form>

        <?php



        if(isset($_POST['inscrire'])) {
            
            extract($_POST); // Récupérer les valeurs du formulaire


            if(!empty($mdp)) {
                
                $options = [
                   'cost' => 12,
               ];
               $hashpass =  password_hash($mdp, PASSWORD_BCRYPT, $options);

               if(password_verify($mdp, $hashpass)) {
                    echo "Le mot de passe est valide !<br>";
                } else {
                    echo "Le mot de passe n'est pas valide !<br>";
                }

                /*include('../log/database.php'); // Inclure le fichier de connexion à la base de données
                global $db;
                
                //Ajouter un utilisateur à la base de données
                $q_add_user = $db->prepare("INSERT INTO users (nom, prenom, identifiant, mdp) VALUES (:nom, :prenom, :identifiant, :mdp)");
                $q_add_user->execute([
                    'nom' => 'test1',
                    'prenom' => 'test1',
                    'identifiant' => 'test1',
                    'mdp' => $hashpass
                ]);*/

        

        
            } 
        }

        ?>
    </div>
</body>
</html>