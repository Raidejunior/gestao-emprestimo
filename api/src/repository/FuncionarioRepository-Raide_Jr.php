<?php

namespace src\repository;

use src\model\Credenciais;
use src\model\Funcionario;

interface FuncionarioRepository {
    function autenticarFuncionario(Credenciais $credenciais, bool $logandoComEmail): ?Funcionario;
    function cadastrarFuncionario(Funcionario $funcionario): ?Funcionario;
    function emailOuLoginJaExiste(string $login, string $email): bool;
}