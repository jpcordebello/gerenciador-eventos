package br.uff.gerenciadoreventos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.uff.gerenciadoreventos.dto.EventoRequest;
import br.uff.gerenciadoreventos.dto.EventoResponse;
import br.uff.gerenciadoreventos.model.Administrador;
import br.uff.gerenciadoreventos.model.Evento;
import br.uff.gerenciadoreventos.repository.AdministradorRepository;
import br.uff.gerenciadoreventos.repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import br.uff.gerenciadoreventos.dto.EventoUpdateRequest;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository eventoRepository;
    private final AdministradorRepository administradorRepository;

    public EventoResponse cadastrar(EventoRequest request) {

        if (request.getDataFim() != null
                && request.getDataFim().isBefore(request.getDataInicio())) {
            throw new IllegalArgumentException(
                    "A data final não pode ser anterior à data inicial");
        }

        Administrador administrador = administradorRepository
                .findById(request.getAdminId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Administrador não encontrado"));

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

    public List<EventoResponse> listarPorAdministrador(Long adminId) {

        return eventoRepository
                .findByAdministradorId(adminId)
                .stream()
                .map(this::converterParaResponse)
                .toList();
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
    public EventoResponse atualizar(Long eventoId, EventoUpdateRequest request) {

    if (request.getDataFim() != null
            && request.getDataFim().isBefore(request.getDataInicio())) {
        throw new IllegalArgumentException(
                "A data final não pode ser anterior à data inicial");
    }

    Evento evento = eventoRepository
            .findById(eventoId)
            .orElseThrow(() ->
                    new IllegalArgumentException("Evento não encontrado"));

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
                    new IllegalArgumentException("Evento não encontrado"));

    eventoRepository.delete(evento);
}
}