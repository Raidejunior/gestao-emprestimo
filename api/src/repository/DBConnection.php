<?php
namespace src\repository;

require_once 'vendor/autoload.php';

use PDO;

class DBConnection{

    /**
     * Responsável pela conexão com o banco de dados.
     * @return PDO
     */
    public function conectar(): PDO{
        $pdo = new PDO(
            'mysql:dbname=acme;host=localhost;charset=utf8',
            'root',
            'admin123',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );

        return $pdo;
    }
}