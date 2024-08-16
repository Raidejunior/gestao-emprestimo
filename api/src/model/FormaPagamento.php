<?php

namespace src\model;

use src\repository\DBConnection;
use src\repository\FormaPagamentoRepository;

class FormaPagamento {
    public $id;
    public $descricao;
    public $meses;
    public $juros;

    public function __construct($id = null, $descricao = null, $meses = null, $juros = null)
    {
        $this->id = $id;
        $this->descricao = $descricao;
        $this->meses = $meses;
        $this->juros = $juros;
    }

    /**
     * Responsável por chamar repositório de forma de pagamento e passar para a controller.
     * @return FormasPagamen
     */
    public function retornaArrayFormaPagamento() {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $formaPagamentoRepository = new FormaPagamentoRepository($pdo);
        $dados = $formaPagamentoRepository->retornaArrayFormaPagamento();
        if(!$dados) {
            return null;
        }

        $formasDePagamento = [];
        foreach($dados as $fp) {
            $formaDePagamento = new FormaPagamento(
                $fp['id'],
                $fp['descricao'],
                $fp['meses'],
                $fp['juros']
            );
            array_push($formasDePagamento, $formaDePagamento);
        }

        return $formasDePagamento;
    }

}