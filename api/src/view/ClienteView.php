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
                "id" => $cliente->getId(),
                "nome" => $cliente->getNome(),
                "cpf" => $cliente->getCPF(),
                "dataNascimento" => $cliente->getDataNascimento()
            ]);
        } else {
            $clienteEmJson = json_encode([]);
        }

        return $clienteEmJson;
    }
}