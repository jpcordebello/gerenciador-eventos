package br.uff.gerenciadoreventos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.uff.gerenciadoreventos.repository.AdministradorRepository;
import br.uff.gerenciadoreventos.security.JwtAuthenticationEntryPoint;
import br.uff.gerenciadoreventos.security.JwtAuthorizationFilter;
import br.uff.gerenciadoreventos.security.JwtUtil;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final AdministradorRepository administradorRepository;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})

                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**")
                        .permitAll()
                        .requestMatchers(
                                HttpMethod.GET,
                                "/eventos/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/administradores")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/auth/login")
                        .permitAll()

                        .anyRequest()
                        .authenticated())

                .exceptionHandling(exception -> exception.authenticationEntryPoint(
                        jwtAuthenticationEntryPoint))

                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable())

                .addFilterBefore(
                        new JwtAuthorizationFilter(
                                jwtUtil,
                                administradorRepository),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}