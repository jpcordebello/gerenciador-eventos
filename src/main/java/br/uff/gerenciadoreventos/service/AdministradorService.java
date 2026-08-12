package br.uff.gerenciadoreventos.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.uff.gerenciadoreventos.dto.AdministradorRequest;
import br.uff.gerenciadoreventos.dto.AdministradorResponse;
import br.uff.gerenciadoreventos.exception.EmailJaCadastradoException;
import br.uff.gerenciadoreventos.exception.RecursoNaoEncontradoException;
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
            throw new EmailJaCadastradoException("Email já cadastrado");
        }

        Administrador administrador = new Administrador(
                null,
                request.getNome(),
                request.getEmail(),
                passwordEncoder.encode(request.getSenha())
        );

        Administrador salvo =
                administradorRepository.save(administrador);

        return converterParaResponse(salvo);
    }

    public AdministradorResponse buscarPorEmail(String email) {

        Administrador administrador = administradorRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Administrador não encontrado"
                        )
                );

        return converterParaResponse(administrador);
    }

    private AdministradorResponse converterParaResponse(
            Administrador administrador) {

        return new AdministradorResponse(
                administrador.getId(),
                administrador.getNome(),
                administrador.getEmail()
        );
    }
}