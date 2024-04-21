<?php
namespace src\view;

class ClienteView{

    /**
     * Responsável por receber um cliente e retorná-lo em json.
     * @param Cliente parâmetro do tipo Cliente.
     * @return Json retorno tipo Json.
     */
    function retornaClienteEmJson($cliente){

        if($cliente)
        {
            $clienteEmJson = json_encode([
                "id" => $cliente["id"],
                "nome" => $cliente["nome"],
                "cpf" => $cliente["cpf"],
                "dataNascimento" => $cliente["data_nascimento"]
            ]);
        } else {
            $clienteEmJson = json_encode([]);
        }

        return $clienteEmJson;
    }
}