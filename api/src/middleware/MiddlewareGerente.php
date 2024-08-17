<?php
namespace src\middleware;

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use src\model\Funcionario;
use src\service\SessaoService;
use src\view\FuncionarioView;

class MiddlewareGerente {
    public function __invoke(HttpRequest $req, HttpResponse $res, bool &$stop = false) {
        $sessao = new SessaoService();
        $permissao = $sessao->verificaPermissaoFuncionario();
        if($permissao !== Funcionario::GERENTE) {
            $funcionarioView = new FuncionarioView($req, $res);
            $funcionarioView->acessoNegado();
            $stop = true;
        }
    }
}

?>