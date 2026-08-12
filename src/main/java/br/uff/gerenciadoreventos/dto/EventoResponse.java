package br.uff.gerenciadoreventos.dto;

import java.time.LocalDate;

import br.uff.gerenciadoreventos.model.CategoriaEvento;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EventoResponse {

    private Long id;
    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String localizacao;
    private String endereco;
    private String imagem;
    private CategoriaEvento categoria;
    private Long adminId;
}