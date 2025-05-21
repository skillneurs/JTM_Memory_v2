<?php 

    // localhost
    //define('HOST', 'localhost');
    //define('DM_NAME', 'memory');
    //define('USER', 'root');
    //define('PASSWORD', '');
    
    // serveur
    define('HOST', '109.234.161.199');
    define('DM_NAME', 'jonteomat2_memory');
    define('USER', 'jonteomat2_jonteomat2');
    define('PASSWORD', '*56j3_j/CVNp');


    try {
        $db = new PDO('mysql:host='.HOST.';dbname='.DM_NAME, USER, PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo $e;
    }

?>