package br.uff.gerenciadoreventos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.uff.gerenciadoreventos.dto.LoginRequest;
import br.uff.gerenciadoreventos.dto.LoginResponse;
import br.uff.gerenciadoreventos.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(
        name = "Autenticação",
        description = "Autenticação dos administradores"
)
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    @Operation(
            summary = "Realizar login",
            description = "Valida email e senha do administrador e retorna um token JWT."
    )
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                loginService.login(request));
    }
}