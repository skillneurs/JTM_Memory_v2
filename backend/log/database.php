<?php 

    define('HOST', 'localhost');
    define('DM_NAME', 'memory');
    define('USER', 'root');
    define('PASSWORD', '');


    try {
        $db = new PDO('mysql:host='.HOST.';dbname='.DM_NAME, USER, PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo $e;
    }

?>