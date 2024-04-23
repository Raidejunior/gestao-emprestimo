<?php
namespace src\model;

require_once "vendor/autoload.php";

class Parcela {
    public $id;
    public $numero;
    public $vencimento;
    public $valor;

    public function __construct($id = 0, $numero = 0, $vencimento = '', $valor = 0){
        $this->id = $id;
        $this->numero = $numero;
        $this->vencimento = $vencimento;
        $this->valor = $valor;
    }
}