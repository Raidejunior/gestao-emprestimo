<?php

namespace src\service;

use src\dto\FuncionarioParaSessao;

class SessaoService {

    public function registrarFuncionario(FuncionarioParaSessao $funcionario): void {
        $this->abrirSessao();

        $_SESSION['id'] = $funcionario->id;
        $_SESSION['login'] = $funcionario->login;
        $_SESSION['permissao'] = $funcionario->permissao;
    }

    public function possuiFuncionarioRegistrado(): bool {
        $this->abrirSessao();
        return isset($_SESSION['id']);
    }

    public function verificaPermissaoFuncionario(): int {
        $this->abrirSessao();
        $permissao = intval($_SESSION['permissao']) ?? 0;
        
        return $permissao;
    }

    public function realizarLogout(): bool {
        return session_destroy();
    }

    private function abrirSessao(): void {
        session_name('sid');
        session_set_cookie_params(3600, null, null, null, true);
        session_start();

        session_regenerate_id(true);
    }

}

?>