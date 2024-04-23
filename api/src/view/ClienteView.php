<?php
namespace src\view;

class ClienteView{

    private $req;
    private $res;

    public function __construct($req, $res){
        $this->req = $req;
        $this->res = $res;
    }

    /**
     * Responsável por retornar o CPF da requisição, devolve uma resposta com código 400 caso não haja um parâmetro CPF
     * @return string
     */
    public function cpf(): string {
        $cpf = $this->req->param('cpf');
        if(!$cpf) {
            $this->res->status(400)->send('Parâmetros inválidos');
        }

        return $cpf;
    }

    /**
     * Responsável por receber um cliente e retorná-lo em json.
     * @param Cliente parâmetro do tipo Cliente.
     */
    function retornaClienteEmJson($cliente){
        if(!$cliente) {
            $this->res->status(404)->send('Nenhum cliente encontrado');
            return;
        }

        $this->res->status(200)->json($cliente); 
    }
}