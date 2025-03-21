<?php

namespace src\repository;

use PDO;

class DBConnection{

    /**
     * Responsável pela conexão com o banco de dados.
     * @return PDO
     */
    static function conectar(): PDO{
        $pdo = new PDO(
            'mysql:dbname=acme;host=localhost;charset=utf8',
            'root',
            '',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );

        return $pdo;
    }
}