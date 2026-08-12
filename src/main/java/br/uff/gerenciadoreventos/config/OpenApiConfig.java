package br.uff.gerenciadoreventos.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.tags.Tag;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Gerenciador de Eventos - API",
                version = "1.0",
                description = "API REST para consulta e gerenciamento de eventos"
        ),
        tags = {
                @Tag(
                        name = "Eventos",
                        description = "Consulta, cadastro, atualização e exclusão de eventos"
                ),
                @Tag(
                        name = "Autenticação",
                        description = "Autenticação de administradores e geração do token JWT"
                ),
                @Tag(
                        name = "Administradores",
                        description = "Cadastro de administradores do sistema"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        description = "Informe o token JWT obtido no login"
)
public class OpenApiConfig {
}