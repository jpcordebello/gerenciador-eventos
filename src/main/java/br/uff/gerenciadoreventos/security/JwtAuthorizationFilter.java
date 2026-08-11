package br.uff.gerenciadoreventos.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import br.uff.gerenciadoreventos.model.Administrador;
import br.uff.gerenciadoreventos.repository.AdministradorRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AdministradorRepository administradorRepository;

    public JwtAuthorizationFilter(
            JwtUtil jwtUtil,
            AdministradorRepository administradorRepository) {

        this.jwtUtil = jwtUtil;
        this.administradorRepository = administradorRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            if (jwtUtil.validarToken(token)) {

                String email = jwtUtil.extrairEmail(token);

                Administrador administrador = administradorRepository
                        .findByEmail(email)
                        .orElse(null);

                if (administrador != null) {

                    UsernamePasswordAuthenticationToken authentication =
                            UsernamePasswordAuthenticationToken.authenticated(
                                    email,
                                    null,
                                    Collections.emptyList());

                    SecurityContext context =
                            SecurityContextHolder.createEmptyContext();

                    context.setAuthentication(authentication);

                    SecurityContextHolder.setContext(context);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}