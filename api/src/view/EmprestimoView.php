<?php

namespace src\view;

class EmprestimoView{

    private $req;
    private $res;
    private $body;

    public function __construct($req, $res){   
        $this->req = $req;
        $this->res = $res;
        $this->body = json_decode($this->req->rawBody());
    }


    /**
     * Responsável por verificar o dado de retorno do DB e retornar um código HTTP de resposta.
     * @param int $dadoRetorno
     * Vai retornar um código HTTP de resposta.
     */
    function retornaStatusHTTP(int $codigo){
        $this->res->status($codigo)->send('');
    }

    /**
     * Retorna todos os empréstimo para o lado cliente em formato JSON
     */
    function retornaTodosOsEmprestimos($emprestimos) {
        $this->res->status(200)->json($emprestimos);
    }

    /**
     * Retorna os dados do cliente presentes na variável $req
     * @return array
     */
    function retornaDadosCliente(): array {
        $id = floatval($this->body->cliente->id);
        $nome = $this->body->cliente->nome;
        $cpf = $this->body->cliente->cpf;
        $dataNascimento = strval($this->body->cliente->dataNascimento);
        
        return [
            'id' => $id,
            'nome' => $nome,
            'cpf' => $cpf,
            'dataNascimento' => $dataNascimento
        ];
    }

    /**
     * Retorna os dados da forma de pagamento presentes na variável $req
     * @return array
     */
    function retornaDadosFormaPagamento(): array {
        $id = floatval($this->body->formaPagamento->id);
        $descricao = $this->body->formaPagamento->descricao;
        $meses = floatval($this->body->formaPagamento->meses);
        $juros = floatval($this->body->formaPagamento->juros);

        return [
            'id' => $id,
            'descricao' => $descricao,
            'meses' => $meses,
            'juros' => $juros
        ];
    }

    /**
     * Retorna os dados das parcelas presentes na variável $req
     * @return array
     */
    function retornaDadosParcelas(): array {
        $dadosParcelas = $this->body->parcelas;
        $parcelas = [];

        foreach($dadosParcelas as $p) {
            $parcela = [
                'numero' => $p->numero,
                'vencimento' => $p->vencimento,
                'valor' => floatval($p->valor)
            ];
            array_push($parcelas, $parcela);
        }

        return $parcelas;
    }

    /**
     * Retorna os dados do empréstimo presentes na variável $req
     * @return array
     */
    function retornaDadosEmprestimo(): array {
        $valorPago = floatval($this->body->valorPagoEmprestimo);
        $valorSolicitado = floatval($this->body->valorSolicitadoEmprestimo);

        return [
            'valorPago' => $valorPago,
            'valorSolicitado' => $valorSolicitado
        ];
    }
}