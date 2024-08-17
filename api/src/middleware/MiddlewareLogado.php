<?php
namespace src\middleware;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

use src\service\SessaoService;
use src\view\FuncionarioView;

class MiddlewareLogado {
    public function __invoke(HttpRequest $req, HttpResponse $res, bool &$stop = false) {
        echo 'aqui';
        $sessao = new SessaoService();
        if(! $sessao->possuiFuncionarioRegistrado()) {
            $funcionarioView = new FuncionarioView($req, $res);
            $funcionarioView->acessoNegado();
            $stop = true;
        }
    }
}

?>