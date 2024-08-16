<?php

namespace src\repository;

use src\model\Cliente;

interface ClienteRepository {
    
    /**
     * Recebe um cpf e faz a busca dele no banco de dados.
     * @param string $cpf
     * @return array|false
     */
     public function retornaClientePorCPF( int $cpf );
     public function cadastrarCliente( Cliente $cliente );

}