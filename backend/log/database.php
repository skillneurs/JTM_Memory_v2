<?php 

    // localhost
    //define('HOST', 'localhost');
    //define('DM_NAME', 'memory');
    //define('USER', 'root');
    //define('PASSWORD', '');
    //109.234.161.199
    
    // serveur
    define('HOST', '109.234.161.199');
    define('DM_NAME', 'jonteomat_memory');
    define('USER', 'jonteomat_jonteomat');
    define('PASSWORD', '*56j3_j/CVNp');


    try {
        $db = new PDO('mysql:host='.HOST.';dbname='.DM_NAME, USER, PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo $e;
    }

?>