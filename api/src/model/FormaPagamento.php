<?php

namespace src\model;

class FormaPagamento {
    public $id;
    public $descricao;
    public $meses;
    public $juros;

    public function __construct($id, $descricao, $meses, $juros)
    {
        $this->id = $id;
        $this->descricao = $descricao;
        $this->meses = $meses;
        $this->juros = $juros;
    }

}