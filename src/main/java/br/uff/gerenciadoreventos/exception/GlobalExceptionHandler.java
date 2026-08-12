package br.uff.gerenciadoreventos.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroResposta> tratarRecursoNaoEncontrado(
            RecursoNaoEncontradoException exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.NOT_FOUND,
                "Recurso não encontrado",
                exception.getMessage(),
                request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<ErroResposta> tratarRegraNegocio(
            RegraNegocioException exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.BAD_REQUEST,
                "Regra de negócio inválida",
                exception.getMessage(),
                request.getRequestURI());

        return ResponseEntity.badRequest().body(erro);
    }

    @ExceptionHandler(EmailJaCadastradoException.class)
    public ResponseEntity<ErroResposta> tratarEmailJaCadastrado(
            EmailJaCadastradoException exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.CONFLICT,
                "Conflito",
                exception.getMessage(),
                request.getRequestURI());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }

    @ExceptionHandler(CredenciaisInvalidasException.class)
    public ResponseEntity<ErroResposta> tratarCredenciaisInvalidas(
            CredenciaisInvalidasException exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.UNAUTHORIZED,
                "Não autorizado",
                exception.getMessage(),
                request.getRequestURI());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erro);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErroResposta> tratarAcessoNegado(
            AccessDeniedException exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.FORBIDDEN,
                "Acesso negado",
                exception.getMessage(),
                request.getRequestURI());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResposta> tratarValidacao(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {

        List<CampoErroResposta> campos = exception
                .getBindingResult()
                .getFieldErrors()
                .stream()
                .map(erro -> new CampoErroResposta(
                        erro.getField(),
                        erro.getDefaultMessage()))
                .toList();

        ErroResposta erro = ErroResposta.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .erro("Erro de validação")
                .mensagem("Um ou mais campos estão inválidos")
                .caminho(request.getRequestURI())
                .campos(campos)
                .build();

        return ResponseEntity.badRequest().body(erro);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroResposta> tratarJsonInvalido(
            HttpMessageNotReadableException exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.BAD_REQUEST,
                "Requisição inválida",
                "O corpo da requisição contém dados inválidos",
                request.getRequestURI());

        return ResponseEntity.badRequest().body(erro);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResposta> tratarErroInterno(
            Exception exception,
            HttpServletRequest request) {

        ErroResposta erro = criarErro(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Erro interno do servidor",
                "Ocorreu um erro inesperado",
                request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(erro);
    }

    private ErroResposta criarErro(
            HttpStatus status,
            String erro,
            String mensagem,
            String caminho) {

        return ErroResposta.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .erro(erro)
                .mensagem(mensagem)
                .caminho(caminho)
                .build();
    }
}