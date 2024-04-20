<?php
namespace src\view;

class EmprestimoView{

    /**
     * Responsável por verificar o dado de retorno do DB e retornar um código HTTP de resposta.
     * @param int $dadoRetorno
     * @return int - Vai retornar um código HTTP de resposta.
     */
    function retornaEmprestimoHTTP($dadoRetorno){
        if($dadoRetorno >= 0)
        {
            return http_response_code(201);
        }
        else 
        {
            return http_response_code(501);
        }
    }
}