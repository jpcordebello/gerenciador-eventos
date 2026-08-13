# PetrópolisEventos

Aplicação para gerenciamento e consulta de eventos de Petrópolis, desenvolvida como desafio técnico utilizando Spring Boot, React e React Native.

O projeto possui uma interface web e uma aplicação mobile consumindo a mesma API REST.

## Tecnologias

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- PostgreSQL
- Swagger / OpenAPI

### Frontend Web
- React
- Vite
- React Router

### Mobile
- React Native
- Expo
- React Navigation
- Expo Secure Store

## Funcionalidades

### Área pública

- Consulta de eventos
- Busca por nome, localização, endereço ou categoria
- Filtro por categoria
- Paginação / carregamento progressivo
- Visualização em cards
- Visualização em calendário
- Detalhes dos eventos
- Imagens dos eventos

### Administradores

- Cadastro de administrador
- Login com JWT
- Opção "Gravar senha"
- Consulta dos eventos do administrador
- Cadastro de evento
- Edição de evento
- Exclusão de evento

## Segurança

As operações de criação, alteração e exclusão de eventos exigem autenticação por JWT.

A consulta de eventos é pública, permitindo que visitantes visualizem a agenda sem necessidade de login.

As senhas dos administradores são armazenadas utilizando hash BCrypt.

No aplicativo mobile, a funcionalidade "Gravar senha" utiliza `expo-secure-store` nos dispositivos móveis.

## Imagens dos eventos

As imagens utilizadas pelos eventos são disponibilizadas pelo próprio backend como recursos estáticos.

Exemplo em ambiente local:

```text
http://localhost:8080/imagens-eventos/bunka-sai.jpg