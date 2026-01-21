# ReviewPlataform

Aplicação backend em arquitetura MVC usando **ExpressJS**, **Docker**,**Docker Compose**, **Jest**, **Supertest**, **Swagger**, **MongoDB**.

Este projeto foi desenvolvido como projeto pessoal.

## 📑 Índice

1.  [Sobre o projeto](#sobre-o-projeto)
2.  [Tecnologias utilizadas](#tecnologias-utilizadas)
3.  [Instalação](#instalação)
4.  [Uso](#uso)
5.  [Funcionalidades](#funcionalidades)
6.  [Contato](#contato)

## 📚 1. Arquitetura Geral

### Descrição dos serviços

| Serviço              | Função                                                                    |
| -------------------- | ------------------------------------------------------------------------- |
| **Express**          | Backend principal em arquitetura MVC, responsável pelas regras de negócio |
| **MongoDB**          | Banco de dados                                                            |
| **JWT Auth**         | Autenticação e autorização baseada em tokens                              |
| **Swagger**          | Documentação interativa da API                                            |
| **Jest + Supertest** | Testes unitários e de integração da API                                   |
| **Docker**           | Containerização da aplicação                                              |
| **Docker Compose**   | Orquestração de todos os serviços                                         |

## ⚙️ 2. Tecnologias Utilizadas

### Backend e Infraestrutura

- Node.js
- ExpressJS
- MongoDB
- JWT (JSON Web Token)
- Swagger (OpenAPI)
- Docker
- Docker Compose

### TESTES

- Jest
- Supertest

### Arquitetura

- MVC (Model–View–Controller)
- RESTful API

## 🔌 3. Fluxo de Dados

1. Cliente (Frontend) envia requisições HTTP
2. API Node.js recebe requisições
3. Middleware valida JWT e permissões
4. Controllers processam requisições
5. Services aplicam regras de negócio
6. MongoDB armazena dados
7. API retorna dados ao cliente

### Funcionalidades

- Login e Registro de usuários
- Autenticação com JWT
- Controle de permissões por role
- CRUD de usuários
- Bloquear e desbloquear usuários (Admin)
- Atualizar role de usuários (Admin)
- CRUD de cursos
- Filtro e paginação de cursos
- Listar cursos mais bem avaliados
- CRUD de reviews
- Média de avaliação por curso

### Principais rotas

**Docs**

-http://localhost:3000/api/docs/

**Auth**

- POST http://localhost:3000/api/auth/login
- POST http://localhost:3000/api/auth/register

**Courses**

- POST http://localhost:3000/api/courses
- GET http://localhost:3000/api/courses
- PATCH http://localhost:3000/api/courses
- GET http://localhost:3000/api/courses/id
- DELETE http://localhost:3000/api/courses/id
- GET http://localhost:3000/api/courses/ranking
- GET http://localhost:3000/api/courses/id/reviews

**Reviews**

- POST http://localhost:3000/api/reviews
- DELETE http://localhost:3000/api/reviews/id

**Users**

- GET http://localhost:3000/api/users
- PATCH http://localhost:3000/api/users/:id
- PATCH http://localhost:3000//api/users/id/block
- PATCH http://localhost:3000/api/users/id/unblock
- PATCH http://localhost:3000/api/users/role

## 🛠 <a name="instalação">Instalação</a>

Para visualizar com mais detalhes localmente, siga os passos abaixo:

**Pré requisitos**

Este é um projeto web estático, sem dependências de _runtime_ (como Node.js), mas você precisa ter o Git instalado.

- [Git](https://git-scm.com/)
- **Docker**: [Instalação do Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

**Clone o Repositório**

1.  Clone o repositório:

    ```bash
    git clone https://github.com/IcaroMachadoCarvalho/reviewPlataform.git

    ```

2.  Crie o arquivo de variáveis de ambiente .env na pasta do backend
    ```bash
    cd backend
    touch .env
    ```
3.  Preencha o .env com os respectivos valores

    ```bash
        # Config do MongoDB
        MONGO_INITDB_ROOT_USERNAME=admin
        MONGO_INITDB_ROOT_PASSWORD=123456
        MONGO_INITDB_DATABASE=meubanco

        # URL de conexão usada pelo Node
        MONGO_URL=mongodb://admin:123456@mongodb:27017/meubanco?authSource=admin

        # Porta da aplicação Node
        PORT=3000
        NODE_ENV=development
        JWT_SECRET=qualquer valor da sua preferência
    ```

## 💻 <a name="uso">Uso</a>

#### Rodar a aplicação

1.  Entre na pasta do projeto clonado ou baixado.
2.  No primeiro terminal use os seguinte comando.

```bash
docker compose up --build

```

3. Abra o link gerado no terminal ou crtl + click esquerdo do mouse ou entre em qualquer navegador com.

```bash
http://localhost:3000

```

#### Rodar todos os testes

1.  Entre na pasta do projeto clonado ou baixado.
2.  No terminal use o seguinte comando.

```bash
    cd backend
    npm test

```

## 🤝 <a name="contato">Contato</a>

Caso queira entrar em contato, use as informações do meu perfil:

- **Nome:** Ícaro Machado de Carvalho
- **LinkedIn:** [in/ícaromachadodecarvalho](www.linkedin.com/in/ícaromachadodecarvalho)
- **GitHub:** [@IcaroMachadoCarvalho ](https://github.com/IcaroMachadoCarvalho)
