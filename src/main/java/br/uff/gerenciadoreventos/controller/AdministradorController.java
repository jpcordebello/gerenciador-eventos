package br.uff.gerenciadoreventos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.uff.gerenciadoreventos.dto.AdministradorRequest;
import br.uff.gerenciadoreventos.dto.AdministradorResponse;
import br.uff.gerenciadoreventos.service.AdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/administradores")
@RequiredArgsConstructor
@Tag(name = "Administradores", description = "Cadastro e consulta dos administradores do sistema")
public class AdministradorController {

        private final AdministradorService administradorService;

        @PostMapping
        @Operation(summary = "Cadastrar administrador", description = "Cria uma nova conta de administrador no sistema.")
        public ResponseEntity<AdministradorResponse> cadastrar(
                        @Valid @RequestBody AdministradorRequest request) {

                AdministradorResponse response = administradorService.cadastrar(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(response);
        }

        @GetMapping("/me")
        @Operation(summary = "Consultar administrador autenticado", description = "Retorna os dados do administrador autenticado pelo token JWT.")
        @SecurityRequirement(name = "bearerAuth")
        public ResponseEntity<AdministradorResponse> buscarAutenticado(
                        Authentication authentication) {

                AdministradorResponse response = administradorService.buscarPorEmail(authentication.getName());

                return ResponseEntity.ok(response);
        }
}