<?php

require_once 'DBConnection.php';
require_once 'src/repository/ClienteRepository.php';

class ClienteService{

    public function buscaCPF($cpf): Cliente {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $CR = new ClienteRepository($pdo);
        $cliente = $CR->retornaClientePorCPF($cpf);
        return $cliente;
    }
}