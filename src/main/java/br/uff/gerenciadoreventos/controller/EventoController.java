package br.uff.gerenciadoreventos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.uff.gerenciadoreventos.dto.EventoRequest;
import br.uff.gerenciadoreventos.dto.EventoResponse;
import br.uff.gerenciadoreventos.dto.EventoUpdateRequest;
import br.uff.gerenciadoreventos.dto.PaginaResponse;
import br.uff.gerenciadoreventos.service.EventoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
@Tag(
        name = "Eventos",
        description = "Consulta e gerenciamento dos eventos"
)
public class EventoController {

    private final EventoService eventoService;

    @GetMapping
    @Operation(
            summary = "Listar todos os eventos",
            description = "Retorna os eventos cadastrados de forma paginada. Esta consulta é pública."
    )
    public ResponseEntity<PaginaResponse<EventoResponse>> listarTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        return ResponseEntity.ok(
                eventoService.listarTodos(page, size));
    }

    @GetMapping("/administrador/{adminId}")
    @Operation(
            summary = "Listar eventos por administrador",
            description = "Retorna os eventos associados ao administrador informado."
    )
    public ResponseEntity<List<EventoResponse>> listarPorAdministrador(
            @PathVariable Long adminId) {

        return ResponseEntity.ok(
                eventoService.listarPorAdministrador(adminId));
    }

    @PostMapping
    @Operation(
            summary = "Cadastrar evento",
            description = "Cadastra um novo evento para o administrador autenticado."
    )
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<EventoResponse> cadastrar(
            @Valid @RequestBody EventoRequest request) {

        EventoResponse response =
                eventoService.cadastrar(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{eventoId}")
    @Operation(
            summary = "Atualizar evento",
            description = "Atualiza data, localização, endereço e categoria de um evento pertencente ao administrador autenticado."
    )
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<EventoResponse> atualizar(
            @PathVariable Long eventoId,
            @Valid @RequestBody EventoUpdateRequest request) {

        return ResponseEntity.ok(
                eventoService.atualizar(eventoId, request));
    }

    @DeleteMapping("/{eventoId}")
    @Operation(
            summary = "Excluir evento",
            description = "Exclui um evento pertencente ao administrador autenticado."
    )
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> deletar(
            @PathVariable Long eventoId) {

        eventoService.deletar(eventoId);

        return ResponseEntity.noContent().build();
    }
}