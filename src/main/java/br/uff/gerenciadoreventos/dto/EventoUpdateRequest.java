package br.uff.gerenciadoreventos.dto;

import java.time.LocalDate;

import br.uff.gerenciadoreventos.model.CategoriaEvento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventoUpdateRequest {

    @NotNull(message = "A data de início é obrigatória")
    private LocalDate dataInicio;

    private LocalDate dataFim;

    @NotBlank(message = "A localização é obrigatória")
    private String localizacao;

    private String endereco;

    @NotNull(message = "A categoria é obrigatória")
    private CategoriaEvento categoria;
}