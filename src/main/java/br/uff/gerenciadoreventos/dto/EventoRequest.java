package br.uff.gerenciadoreventos.dto;

import java.time.LocalDate;

import br.uff.gerenciadoreventos.model.CategoriaEvento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventoRequest {

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @NotNull(message = "A data de início é obrigatória")
    private LocalDate dataInicio;

    private LocalDate dataFim;

    @NotBlank(message = "A localização é obrigatória")
    private String localizacao;

    private String endereco;

    @NotBlank(message = "A imagem é obrigatória")
    private String imagem;

    @NotNull(message = "A categoria é obrigatória")
    private CategoriaEvento categoria;

    @NotNull(message = "O administrador é obrigatório")
    private Long adminId;
}