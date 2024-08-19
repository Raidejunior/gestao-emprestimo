<?php

namespace src\repository;

use src\dto\ClienteParaCadastro;
use src\dto\ClienteParaExibicao;
use src\model\Cliente;

interface ClienteRepository {
    
    /**
     * Recebe um cpf e faz a busca dele no banco de dados.
     * @param string $cpf
     * @return ClienteParaExibicao|null
     */
     public function retornaClientePorCPF( string $cpf ): ?ClienteParaExibicao;

     public function cadastrarCliente( ClienteParaCadastro $cliente ): ?ClienteParaExibicao;

     public function verificaLimiteCreditoUtilizadoCliente(int $clienteId): ?float;

}