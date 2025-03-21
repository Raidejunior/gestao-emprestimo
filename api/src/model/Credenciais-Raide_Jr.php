<?php

namespace src\model;

class Credenciais {
    public $TAM_MIN_SENHA = 6;
    private string $login;
    private string $senha;

    public function setCredenciais(string $login, string $senha, bool $encriptar = false): bool {
        $this->login = $login;
        $this->senha = $senha;
        if(! $this->verificaTamanhoSenha() || ! $login) {
            return false;
        }

        if($encriptar) {
            $this->encriptarSenha();
        }

        return true;
    }

    public function getLogin(): string {
        return $this->login;
    }

    public function getSenha(): string {
        return $this->senha;
    }

    // verifica se a senha atende ao tamanho mínimo necessário
    private function verificaTamanhoSenha(): bool {
        $tamMinSenha = $this->TAM_MIN_SENHA;
        if(mb_strlen($this->senha) < $tamMinSenha) {
            return false;
        }

        return true;
    }

    public function compararHash(string $armazenamento): bool {
        $pepperAnterior = $_ENV['PEPPER_ANTERIOR'];
        $pepperPosterior = $_ENV['PEPPER_POSTERIOR'];

        $salt = mb_substr($armazenamento, 0, 32); // salt gerado com 16 bytes terá 32 caracteres
        $hashArmazenado = mb_substr($armazenamento, 32); // o restante salvo é o hash da senha com pepper e salt

        $senhaComPepper = $pepperAnterior . $this->senha . $pepperPosterior; // adicionando pepper a senha que foi fornecida
        $senhaComPepperESalt = $salt . $senhaComPepper; // adicionando o salt a senha que foi fornecida
        
        $hashVerificacao = hash('sha256', $senhaComPepperESalt); // gerando o hash da senha que foi fornecida

        if($hashVerificacao === $hashArmazenado) {
            return true;
        } 

        return false;
    }

    private function encriptarSenha() {
        $pepperAnterior = $_ENV['PEPPER_ANTERIOR'];
        $pepperPosterior = $_ENV['PEPPER_POSTERIOR'];
        $salt = bin2hex(random_bytes(16));

        $senhaComPepper = $pepperAnterior . $this->senha . $pepperPosterior;
        $senhaComPepperESalt = $salt . $senhaComPepper;

        $hash = hash('sha256', $senhaComPepperESalt);
        $armazenamento = $salt . $hash; // concatenando o salt junto com a senha

        $this->senha = $armazenamento;
    }

    public function logandoComEmail(): bool {
        $regexEmail = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'; // checa se existe uma sequência de caracteres + um @, outra sequência de caracteres, um ponto e pelo menos mais dois caracteres
        if(preg_match($regexEmail, $this->login)) {
            return true;
        }
        return false;
    }
}