package br.uff.gerenciadoreventos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdministradorResponse {

    private Long id;
    private String nome;
    private String email;
}