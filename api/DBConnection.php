<?php

class DBConnection{
    public function conectar(): PDO{
        $pdo = new PDO(
            'mysql:dbname=pdv;host=localhost;charset=utf8',
            'root',
            '',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );

        return $pdo;
    }
}