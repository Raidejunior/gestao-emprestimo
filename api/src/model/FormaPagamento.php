<?php

namespace src\model;

require_once 'vendor/autoload.php';

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
     * @return array
     */
    public function retornaArrayFormaPagamento() {
        $db = new DBConnection();
        $pdo = $db->conectar();
        $formaPagamentoRepository = new FormaPagamentoRepository($pdo);
        $arrayFormaPagamento = $formaPagamentoRepository->retornaArrayFormaPagamento();
        return $arrayFormaPagamento;
    }

}