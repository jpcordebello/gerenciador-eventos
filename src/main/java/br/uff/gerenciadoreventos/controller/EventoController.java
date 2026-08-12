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
import org.springframework.web.bind.annotation.RestController;

import br.uff.gerenciadoreventos.dto.EventoRequest;
import br.uff.gerenciadoreventos.dto.EventoResponse;
import br.uff.gerenciadoreventos.dto.EventoUpdateRequest;
import br.uff.gerenciadoreventos.service.EventoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService eventoService;

    @GetMapping
    public ResponseEntity<List<EventoResponse>> listarTodos() {

        return ResponseEntity.ok(
                eventoService.listarTodos());
    }

    @GetMapping("/administrador/{adminId}")
    public ResponseEntity<List<EventoResponse>> listarPorAdministrador(
            @PathVariable Long adminId) {

        return ResponseEntity.ok(
                eventoService.listarPorAdministrador(adminId));
    }

    @PostMapping
    public ResponseEntity<EventoResponse> cadastrar(
            @Valid @RequestBody EventoRequest request) {

        EventoResponse response =
                eventoService.cadastrar(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{eventoId}")
    public ResponseEntity<EventoResponse> atualizar(
            @PathVariable Long eventoId,
            @Valid @RequestBody EventoUpdateRequest request) {

        return ResponseEntity.ok(
                eventoService.atualizar(eventoId, request));
    }

    @DeleteMapping("/{eventoId}")
    public ResponseEntity<Void> deletar(
            @PathVariable Long eventoId) {

        eventoService.deletar(eventoId);

        return ResponseEntity.noContent().build();
    }
}