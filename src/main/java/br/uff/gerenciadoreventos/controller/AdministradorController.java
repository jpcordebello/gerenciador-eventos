package br.uff.gerenciadoreventos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.uff.gerenciadoreventos.dto.AdministradorRequest;
import br.uff.gerenciadoreventos.dto.AdministradorResponse;
import br.uff.gerenciadoreventos.service.AdministradorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/administradores")
@RequiredArgsConstructor
public class AdministradorController {

    private final AdministradorService administradorService;

    @PostMapping
    public ResponseEntity<AdministradorResponse> cadastrar(
            @Valid @RequestBody AdministradorRequest request) {

        AdministradorResponse response = administradorService.cadastrar(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}