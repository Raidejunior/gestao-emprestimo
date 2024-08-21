<?php

namespace src\service;

use src\dto\ClienteParaCadastro;
use src\dto\ClienteParaExibicao;
use src\repository\ClienteRepository;
use src\repository\ClienteRepositoryEmBDR;
use src\repository\DBConnection;

class ClienteService {
    private ClienteRepository $clienteRepository;

    public function cadastrarCliente(ClienteParaCadastro $cliente): ?ClienteParaExibicao {
        $pdo = DBConnection::conectar();
        $this->clienteRepository = new ClienteRepositoryEmBDR($pdo);
        $cliente = $this->clienteRepository->cadastrarCliente($cliente);

        if($cliente instanceof ClienteParaExibicao) {
            return $cliente;
        }

        return null;
    }


        /**
     * Responsável por chamar o repository para buscar cliente e retorná-lo.
     * @param string $cpf
     * @return ClienteParaExibicao - Objeto cliente para exibição com os dados ou null caso o cliente não seja encontrado
     */
    function buscaCPF(string $cpf): ?ClienteParaExibicao {
        $pdo = DBConnection::conectar();
        $clienteRepository = new ClienteRepositoryEmBDR($pdo);
        $cliente = $clienteRepository->retornaClientePorCPF($cpf);
        if(!$cliente) {
            return null;
        }

        $limiteCreditoUtilizado = $clienteRepository->verificaLimiteCreditoUtilizadoCliente($cliente->id);
        $cliente->limiteCreditoUtilizado = $limiteCreditoUtilizado !== null ? $limiteCreditoUtilizado : 0;
        $cliente->limiteCreditoDisponivel = $cliente->limiteCredito - $limiteCreditoUtilizado;

        return $cliente;
    }

}

?>