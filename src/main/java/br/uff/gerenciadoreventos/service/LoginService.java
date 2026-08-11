package br.uff.gerenciadoreventos.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.uff.gerenciadoreventos.dto.LoginRequest;
import br.uff.gerenciadoreventos.dto.LoginResponse;
import br.uff.gerenciadoreventos.model.Administrador;
import br.uff.gerenciadoreventos.repository.AdministradorRepository;
import br.uff.gerenciadoreventos.security.JwtUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {

        Administrador administrador = administradorRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha inválidos"));

        if (!passwordEncoder.matches(request.getSenha(), administrador.getSenha())) {
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        String token = jwtUtil.gerarToken(administrador.getEmail());

        return new LoginResponse(token);
    }
}