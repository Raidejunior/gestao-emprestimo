<?php
namespace src\view;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\dto\ParcelaParaPagamento;

class ParcelaView {
    private HttpResponse $res;
    private HttpRequest $req;

    public function __construct(HttpResponse $res, HttpRequest $req) {
        $this->res = $res;
        $this->req = $req;
    }

    public function dadosParcela(): ParcelaParaPagamento {
        $dados = (array) $this->req->body();
        
        $parcelaParaPagamento = new ParcelaParaPagamento($dados);
        if(count($parcelaParaPagamento->atributosInvalidos->todos()) > 0) {
            $this->parametrosInvalidos($parcelaParaPagamento->atributosInvalidos->todos());
        }

        return $parcelaParaPagamento;
    } 

    /**
     * Responsável por retornar o Id de empréstimo da requisição, devolve uma resposta com código 400 caso não haja um parâmetro Id
     * @return string
     */
    public function emprestimoId(): string {
        $emprestimoId = $this->req->param('id');
        if(!$emprestimoId) {
            $this->res->status(400)->send('Parâmetros inválidos');
        }

        return $emprestimoId;
    }

    /**
     * Retorna todas as parcelas de um empréstimo para o lado do cliente em formato JSON
     */
    public function RetornaTodasParcelasDeEmprestimoId($parcelas): void {
        $this->res->status(200)->json($parcelas);
    }

    public function parametrosInvalidos(array $parametros) {
        $this->res->status(400)->json(['Erros' => $parametros]);
        die();
    }

    public function naoEncontrado() {
        $this->res->status(404)->json(['mensagem' => 'Nenhuma parcela encontrada para este emprestimo']);
        die();
    }

    public function erroServidor() {
        $this->res->status(500)->json(['mensagem' => 'Erro interno do servidor']);
        die();
    }

    public function ok() {
        $this->res->status(200)->send('');
        die();
    }
}
    