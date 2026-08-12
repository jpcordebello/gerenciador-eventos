package br.uff.gerenciadoreventos.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CampoErroResposta {

    private String campo;
    private String mensagem;
}