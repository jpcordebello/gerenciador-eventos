package br.uff.gerenciadoreventos.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaginaResponse<T> {

    private List<T> conteudo;
    private int paginaAtual;
    private int tamanhoPagina;
    private long totalElementos;
    private int totalPaginas;
    private boolean primeiraPagina;
    private boolean ultimaPagina;
}