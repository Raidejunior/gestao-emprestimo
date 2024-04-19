<?php
namespace src\view;

/**
 * Responsável por retornar o array de FormaPagamento em um json array. 
 * @return string vai retornar uma string em formato json. 
 */
class FormaPagamentoView{
    function retornaArrayFormaPagamentoEmJson($array) {
        if(count($array) > 0)
        return json_encode($array);
        else
        return json_encode([]);
    }
}