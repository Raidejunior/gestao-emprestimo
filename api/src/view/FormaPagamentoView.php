<?php
namespace src\view;

/**
 * Responsável por retornar o array de FormaPagamento em um json array. 
 * @return string vai retornar uma string em formato json. 
 */
class FormaPagamentoView{

    private $req;
    private $res;

    public function __construct($req, $res){   
        $this->req = $req;
        $this->res = $res;
    }

    function retornaArrayFormaPagamentoEmJson($array) {
        if(count($array) > 0) {
            $this->res->json($array);
        }
        else {
            $this->res->status(404)->send('Nenhuma forma de pagamento encontrada');
        }
    }
}