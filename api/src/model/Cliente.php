<?php

namespace src\model;

use src\repository\ClienteRepository;
use src\repository\ClienteRepositoryEmBDR;
use src\repository\DBConnection;

class Cliente {
    public string $id;
    public string $nome;
    public string $cpf;
    public string $dataNascimento;
    public string $email;
    public string $telefone;
    public string $endereco;
    public float $limiteCredito;

    public function __construct($id = '', $nome = '', $cpf = '', $dataNascimento = '', $email = '', $telefone = '', 
        $endereco = '', $limiteCredito = 0) {
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->dataNascimento = $dataNascimento;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->endereco = $endereco;
        $this->limiteCredito = $limiteCredito;
    }

    /**
     * Responsável por chamar o repository para buscar cliente e retorná-lo.
     * @param string $cpf
     * @return Cliente - Objeto cliente com os dados ou null caso o cliente não seja encontrado
     */

    // REFAZER

    function buscaCPF($cpf) {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $cr = new ClienteRepositoryEmBDR($pdo);
        $dadosCliente = $cr->retornaClientePorCPF($cpf);
        if(!$dadosCliente) {
            return null;
        }

        $cliente = new Cliente(
            $dadosCliente["id"],
            $dadosCliente["nome"],
            $dadosCliente["cpf"],
            $dadosCliente["data_nascimento"]
        );
        
        return $cliente;
    }
}
?>
