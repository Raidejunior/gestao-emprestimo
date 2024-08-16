<?php

namespace src\repository;

use src\model\Credenciais;
use src\model\Funcionario;

interface FuncionarioRepository {
    function autenticarFuncionario(Credenciais $credenciais): ?Funcionario;
    function cadastrarFuncionario(Funcionario $funcionario): ?Funcionario;
}