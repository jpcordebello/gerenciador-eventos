package br.uff.gerenciadoreventos.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.uff.gerenciadoreventos.model.CategoriaEvento;
import br.uff.gerenciadoreventos.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByAdministradorId(Long administradorId);

    List<Evento> findByAdministradorIdAndCategoria(
            Long administradorId,
            CategoriaEvento categoria);

    List<Evento> findByAdministradorIdAndLocalizacaoContainingIgnoreCase(
            Long administradorId,
            String localizacao);

    List<Evento> findByAdministradorIdAndNomeContainingIgnoreCase(
            Long administradorId,
            String nome);

    List<Evento> findByAdministradorIdAndDataInicio(
            Long administradorId,
            LocalDate dataInicio);

    List<Evento> findByAdministradorIdAndDataInicioBetween(
            Long administradorId,
            LocalDate dataInicial,
            LocalDate dataFinal);
}