package br.uff.gerenciadoreventos.service;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import br.uff.gerenciadoreventos.dto.EventoRequest;
import br.uff.gerenciadoreventos.dto.EventoResponse;
import br.uff.gerenciadoreventos.dto.EventoUpdateRequest;
import br.uff.gerenciadoreventos.exception.RecursoNaoEncontradoException;
import br.uff.gerenciadoreventos.exception.RegraNegocioException;
import br.uff.gerenciadoreventos.model.Administrador;
import br.uff.gerenciadoreventos.model.Evento;
import br.uff.gerenciadoreventos.repository.AdministradorRepository;
import br.uff.gerenciadoreventos.repository.EventoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository eventoRepository;
    private final AdministradorRepository administradorRepository;

    public EventoResponse cadastrar(EventoRequest request) {

        if (request.getDataFim() != null
                && request.getDataFim().isBefore(request.getDataInicio())) {

            throw new RegraNegocioException(
                    "A data final não pode ser anterior à data inicial");
        }

        Administrador administrador = getAdministradorAutenticado();

        if (!administrador.getId().equals(request.getAdminId())) {
            throw new AccessDeniedException(
                    "Você não pode cadastrar eventos para outro administrador");
        }

        Evento evento = new Evento(
                null,
                request.getNome(),
                request.getDataInicio(),
                request.getDataFim(),
                request.getLocalizacao(),
                request.getEndereco(),
                request.getImagem(),
                request.getCategoria(),
                administrador);

        Evento salvo = eventoRepository.save(evento);

        return converterParaResponse(salvo);
    }

    public List<EventoResponse> listarTodos() {

        return eventoRepository
                .findAll()
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    public List<EventoResponse> listarPorAdministrador(Long adminId) {

        return eventoRepository
                .findByAdministradorId(adminId)
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    public EventoResponse atualizar(
            Long eventoId,
            EventoUpdateRequest request) {

        if (request.getDataFim() != null
                && request.getDataFim().isBefore(request.getDataInicio())) {

            throw new RegraNegocioException(
                    "A data final não pode ser anterior à data inicial");
        }

        Evento evento = eventoRepository
                .findById(eventoId)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Evento não encontrado"));

        Administrador administrador = getAdministradorAutenticado();

        if (!evento.getAdministrador().getId()
                .equals(administrador.getId())) {

            throw new AccessDeniedException(
                    "Você não pode editar eventos de outro administrador");
        }

        evento.setDataInicio(request.getDataInicio());
        evento.setDataFim(request.getDataFim());
        evento.setLocalizacao(request.getLocalizacao());
        evento.setEndereco(request.getEndereco());
        evento.setCategoria(request.getCategoria());

        Evento atualizado = eventoRepository.save(evento);

        return converterParaResponse(atualizado);
    }

    public void deletar(Long eventoId) {

        Evento evento = eventoRepository
                .findById(eventoId)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Evento não encontrado"));

        Administrador administrador = getAdministradorAutenticado();

        if (!evento.getAdministrador().getId()
                .equals(administrador.getId())) {

            throw new AccessDeniedException(
                    "Você não pode excluir eventos de outro administrador");
        }

        eventoRepository.delete(evento);
    }

    private EventoResponse converterParaResponse(Evento evento) {

        return new EventoResponse(
                evento.getId(),
                evento.getNome(),
                evento.getDataInicio(),
                evento.getDataFim(),
                evento.getLocalizacao(),
                evento.getEndereco(),
                evento.getImagem(),
                evento.getCategoria(),
                evento.getAdministrador().getId());
    }

    private Administrador getAdministradorAutenticado() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return administradorRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Administrador autenticado não encontrado"));
    }
}