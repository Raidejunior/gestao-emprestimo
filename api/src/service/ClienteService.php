<?php

namespace src\service;

use src\dto\ClienteParaExibicao;
use src\dto\UsuarioParaExibicao;
use src\model\Cliente;
use src\repository\ClienteRepository;
use src\repository\ClienteRepositoryEmBDR;
use src\repository\DBConnection;

class ClienteService {
    private Cliente $cliente;
    private ClienteRepository $clienteRepository;
    
    public function __construct(Cliente $cliente) {
        $this->cliente = $cliente;
    }

    public function cadastrarCliente(): ?ClienteParaExibicao {
        $pdo = DBConnection::conectar();
        $this->clienteRepository = new ClienteRepositoryEmBDR($pdo);
        $cliente = $this->clienteRepository->cadastrarCliente($this->cliente);

        if($cliente instanceof Cliente) {
            $usuarioParaExibicao = new ClienteParaExibicao($cliente->nome, $cliente->dataNascimento, $cliente->email, $cliente->telefone, $cliente->limiteCredito);
            return $usuarioParaExibicao;
        }

        return null;
    }

}

?>