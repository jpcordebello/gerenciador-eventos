package br.uff.gerenciadoreventos.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.uff.gerenciadoreventos.dto.AdministradorRequest;
import br.uff.gerenciadoreventos.dto.AdministradorResponse;
import br.uff.gerenciadoreventos.model.Administrador;
import br.uff.gerenciadoreventos.repository.AdministradorRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdministradorService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorResponse cadastrar(AdministradorRequest request) {

        if (administradorRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Administrador administrador = new Administrador(
                null,
                request.getNome(),
                request.getEmail(),
                passwordEncoder.encode(request.getSenha()));

        Administrador salvo = administradorRepository.save(administrador);

        return new AdministradorResponse(
                salvo.getId(),
                salvo.getNome(),
                salvo.getEmail());
    }
}