<?php

namespace src\dto;

class ParcelaParaExibicao {

    public int $id;
    public int $numeroParcela;
    public float $valorParcela;
    public string $dataVencimento; 
    public string $status;
    public ?string $dataPagamento; 
    public ?string $funcionarioQueConfirmouPg;
    public int $idEmprestimo;

    public function __construct(int $id, int $numeroParcela, float $valorParcela, string $dataVencimento,
        string $status, ?string $dataPagamento, ?string $funcionarioQueConfirmouPg, int $idEmprestimo
    ) {
        $this->id = $id;
        $this->numeroParcela = $numeroParcela;
        $this->valorParcela = $valorParcela;
        $this->dataVencimento = $dataVencimento;
        $this->status = $status;
        $this->dataPagamento = $dataPagamento;
        $this->funcionarioQueConfirmouPg = $funcionarioQueConfirmouPg;
        $this->idEmprestimo = $idEmprestimo;
    }

}