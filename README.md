# PetrópolisEventos

Aplicação para consulta e gerenciamento de eventos de Petrópolis, desenvolvida como desafio técnico utilizando **Spring Boot, React e React Native**.

O projeto possui uma aplicação web e uma aplicação mobile consumindo a mesma API REST, com autenticação JWT para as funcionalidades administrativas.

## Aplicação publicada

### Web

https://gerenciador-eventos-omega.vercel.app

### API

https://gerenciador-eventos-hc9f.onrender.com

### Swagger / OpenAPI

https://gerenciador-eventos-hc9f.onrender.com/swagger-ui/index.html

### Android

APK gerado com Expo EAS Build.

**Instalação do APK:**

https://expo.dev/accounts/jpcordebello/projects/mobile/builds/18c26b05-3e70-41d2-a7d7-73cf8fca5148

---

## Arquitetura

```text
                    ┌─────────────────────┐
                    │      Usuário        │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │   React / Web   │       │  React Native   │
        │     Vercel      │       │      Expo       │
        └────────┬────────┘       └────────┬────────┘
                 │                         │
                 └────────────┬────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Spring Boot API  │
                    │      Render      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   PostgreSQL     │
                    │      Neon        │
                    └──────────────────┘
```

A aplicação web e o aplicativo mobile utilizam a mesma API REST.

---

## Tecnologias

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- BCrypt
- PostgreSQL
- Swagger / OpenAPI
- Maven
- Docker

### Frontend Web

- React
- Vite
- React Router
- JavaScript
- CSS

### Mobile

- React Native
- Expo
- React Navigation
- Expo Secure Store
- JavaScript
- EAS Build

### Infraestrutura

- Vercel — frontend web
- Render — API Spring Boot
- Neon — PostgreSQL
- Expo EAS — build Android
- GitHub — versionamento

---

## Funcionalidades

### Consulta pública de eventos

A aplicação permite que visitantes consultem os eventos sem necessidade de autenticação.

Entre as funcionalidades disponíveis estão:

- Listagem de eventos
- Busca por nome, localização ou categoria
- Filtro por categoria
- Paginação
- Visualização em cards
- Visualização em calendário
- Visualização dos detalhes do evento
- Imagens dos eventos
- Consulta disponível tanto no web quanto no mobile

### Administração

Administradores possuem acesso a funcionalidades protegidas por autenticação:

- Cadastro de administrador
- Login
- Autenticação JWT
- Opção de gravar senha no aplicativo mobile
- Consulta dos próprios eventos
- Cadastro de evento
- Edição de evento
- Exclusão de evento

Cada administrador gerencia apenas seus próprios eventos.

---

## Recursos adicionais

Além das funcionalidades principais solicitadas no desafio, foram implementados alguns recursos adicionais:

- Consulta pública dos eventos
- Pesquisa de eventos
- Filtros por categoria
- Calendário de eventos
- Eventos com duração de vários dias exibidos em todas as respectivas datas
- Página de detalhes do evento
- Imagens servidas pelo próprio backend
- Deploy completo da aplicação
- Banco PostgreSQL em nuvem
- APK Android
- Persistência segura da opção "Gravar senha" no mobile

---

## Segurança

A autenticação é realizada utilizando **JWT (JSON Web Token)**.

As operações de criação, atualização e exclusão de eventos exigem autenticação.

```text
GET    /eventos                           Público
GET    /eventos/administrador/{id}        Público

POST   /administradores                   Público
POST   /auth/login                        Público

GET    /administradores/me                Autenticado
POST   /eventos                           Autenticado
PUT    /eventos/{id}                      Autenticado
DELETE /eventos/{id}                      Autenticado
```

Além da autenticação, o backend verifica a propriedade do evento antes de permitir alterações ou exclusões.

As senhas dos administradores são armazenadas utilizando **BCrypt**.

No aplicativo mobile, a opção **"Gravar senha"** utiliza `expo-secure-store` em dispositivos móveis.

---

## Imagens dos eventos

Parte das imagens utilizadas nos eventos está armazenada dentro do próprio backend e é disponibilizada como recurso estático.

Exemplo:

```text
https://gerenciador-eventos-hc9f.onrender.com/imagens-eventos/bunka-sai.jpg
```

Isso permite que tanto a aplicação React quanto a aplicação React Native utilizem as mesmas imagens fornecidas pela API.

---

## Estrutura do projeto

```text
gerenciador-eventos/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── br/uff/gerenciadoreventos/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── dto/
│       │       ├── exception/
│       │       ├── model/
│       │       ├── repository/
│       │       ├── security/
│       │       └── service/
│       │
│       └── resources/
│           ├── static/
│           │   └── eventos/
│           ├── application.properties
│           ├── application-local.properties
│           └── application-prod.properties
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── mobile/
│   ├── src/
│   ├── assets/
│   ├── app.json
│   ├── eas.json
│   └── package.json
│
├── Dockerfile
├── pom.xml
└── README.md
```

---

## Executando o backend localmente

### Pré-requisitos

- Java
- Maven ou Maven Wrapper
- PostgreSQL

Configure as variáveis de ambiente utilizadas pelo projeto:

```env
DB_URL=jdbc:postgresql://localhost:5432/seu_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

JWT_SECRET=sua_chave_jwt
JWT_EXPIRATION_MILISEG=7200000
```

Depois execute:

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

### Linux / macOS

```bash
./mvnw spring-boot:run
```

A API estará disponível em:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## Executando o frontend web

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Configure:

```env
VITE_API_URL=http://localhost:8080
```

Execute:

```bash
npm run dev
```

A aplicação estará disponível normalmente em:

```text
http://localhost:5173
```

---

## Executando o aplicativo mobile

Entre na pasta:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

Configure a URL da API:

```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:8080
```

Inicie o Expo:

```bash
npx expo start
```

Para utilizar a API publicada:

```env
EXPO_PUBLIC_API_URL=https://gerenciador-eventos-hc9f.onrender.com
```

---

## Build Android

O aplicativo Android é compilado utilizando **Expo EAS Build**.

O perfil utilizado para gerar um APK instalável está definido no arquivo:

```text
mobile/eas.json
```

Build:

```bash
eas build --platform android --profile production-apk
```

---

## Deploy

O projeto utiliza serviços gratuitos para disponibilizar toda a aplicação na internet.

| Componente | Serviço |
|---|---|
| Frontend Web | Vercel |
| Backend | Render |
| Banco de Dados | Neon PostgreSQL |
| Build Android | Expo EAS |
| Código-fonte | GitHub |

### Observação sobre o ambiente de demonstração

A API está hospedada no plano gratuito do Render.

Após um período sem acessos, o serviço pode entrar em estado de inatividade. Por isso, **a primeira requisição pode levar alguns segundos enquanto o backend é inicializado novamente**.

Após a inicialização, as requisições seguintes funcionam normalmente.

---

## Variáveis de ambiente

O projeto utiliza arquivos `.env` para configuração dos diferentes ambientes.

As credenciais utilizadas no ambiente de produção são configuradas diretamente nos respectivos serviços de hospedagem.

Nunca é necessário inserir credenciais de produção no código-fonte ou neste README.

---

## API REST

Principais endpoints:

### Autenticação

```http
POST /auth/login
```

### Administradores

```http
POST /administradores
GET  /administradores/me
```

### Eventos

```http
GET    /eventos
GET    /eventos/administrador/{adminId}
POST   /eventos
PUT    /eventos/{eventoId}
DELETE /eventos/{eventoId}
```

A documentação completa e interativa pode ser consultada pelo Swagger:

https://gerenciador-eventos-hc9f.onrender.com/swagger-ui/index.html

---

## Objetivo do projeto

O projeto foi desenvolvido como desafio técnico, com o objetivo de demonstrar a construção de uma aplicação completa envolvendo:

- API REST
- Persistência de dados
- Autenticação
- Segurança
- Aplicação web
- Aplicação mobile
- Integração entre frontend e backend
- Banco de dados relacional
- Deploy em nuvem
- Versionamento com Git e GitHub

---

## Autor

**João Paulo Cordebello**

GitHub: https://github.com/jpcordebello

Projeto desenvolvido para o desafio técnico da **UFF / Serratec**.
