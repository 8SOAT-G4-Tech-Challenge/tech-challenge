## Como Iniciar a Aplicação

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- Docker Compose

### Passo a passo

1.  Clone o repositório:

```sh
  git clone https://github.com/Winderson/tech-challenger.git
  cd tech-challenger
```

2.  Certifique-se de que os arquivos Dockerfile e docker-compose.yml estão presentes na raiz do projeto.

3.  Inicie a aplicação com Docker Compose:

```sh
  docker-compose up
```

4.  A aplicação será iniciada e todos os serviços necessários serão configurados automaticamente.

**IMPORTANTE:**
Esta API está programada para ser acessada a partir de `http://localhost:3333` e o banco de dados utiliza a porta `5432`.
Certifique-se de que não existam outros recursos ocupando as portas `3333` e `5432` antes de subir o projeto.

Para derrubar o serviço, execute o comando `docker-compose down`.
