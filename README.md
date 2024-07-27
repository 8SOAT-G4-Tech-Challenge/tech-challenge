# FIAP Tech-Challenge 8SOAT - Fase 01

## Objetivo do Projeto

Esta solução tem como objetivo fornecer um sistema de controle de pedidos para uma lanchonete em expansão.
Através de um totem de autoatendimento, os clientes poderão criar seus próprios pedidos,
realizar pagamentos de forma integrada e acompanhar o status dos pedidos em tempo real.
Isso visa otimizar a eficiência no atendimento, reduzir erros e aumentar a satisfação dos clientes,
suportando o crescimento contínuo da lanchonete.

### Principais funcionalidades:

- **Interface de Pedido**: Permitir que os clientes façam pedidos personalizados, com a opção de se identificarem ou não, e selecionem itens como lanches, acompanhamentos, bebidas e sobremesas.
- **Pagamento Integrado**: Facilitar o pagamento dos pedidos via QRCode do Mercado Pago.
- **Acompanhamento do Pedido**: Exibir o status do pedido em tempo real (Recebido, Em preparação, Pronto, Finalizado) tanto para os clientes quanto para a equipe da cozinha.

#### Melhorias e implementações futuras:

- **Gerenciamento de Clientes e Produtos**: Permitir ao estabelecimento gerenciar campanhas promocionais, produtos e categorias através de um painel administrativo.

## Documentação

- Para uma documentação mais detalhada sobre DDD, linguagem ubíqua e event storming, acesse o link do Miro:
  [Documentação do Projeto](https://miro.com/app/board/uXjVK2WZuMs=/)

## Diagrama do Banco de Dados

- [Diagrama ER](https://miro.com/app/board/uXjVK0gj0bg=/)

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

## Endpoints

Esta API fornece documentação no padrão OpenAPI através do Swagger.
Os endpoints disponíveis, suas descrições e dados necessários para requisição podem ser consultados e testados em `/docs`.

## Participantes do Projeto

- Amanda Maschio - RM 357734
- Jackson Antunes - RM357311
- Lucas Accurcio - RM 357142
- Vanessa Freitas - RM 357999
- Winderson Santos - RM 357315

## Configurações do Projeto para Desenvolvimento

### Selecione uma pasta e clone o projeto

### Faça a instalação das dependências

```sh
npm install
```

### Rodando o projeto

```sh
npm run dev
```

### Swagger

- `http://localhost:3333/docs`

### ESLint

- Instalar extensão "ESLint" para VSCode
- Habilitar no VSCode para correção automatica ao salvar:
- Acessar o Menu -> View - Command Palette -> Preferences: Open User Settings (JSON) e adicionar a seguinte linha, caso não tenha:

```js
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
	},
```

### Variável de ambiente

- Criar arquivo .env utilizando arquivo .env-example como base, onde já existe o
  caminho para conexão com o banco de dados criado através do docker-compose.

### Banco de Dados - Docker

- Caso o docker esteja instalado localmente, será necessário alterar as portas do
  serviço ou parar o serviço para executar através do docker.
- Iniciar o serviço do Docker (Docker Desktop, no caso de Windows).
- Entrar na pasta raiz do projeto e executar o comando:

```sh
docker-compose up -d --build
```

### Conexão com PGAdmin ou qualquer outra ferramenta de administração de banco de dados

- Observação: É possível realizar a visualização das tabelas utilizando o Prisma Studio, passo abaixo.

- Registrar um novo servidor
- Escolha um nome para seu servidor (livre escolha)
- No menu conexões adicionar as seguintes configurações, conforme docker-compose:
- Host name/address: localhost
- Port: 5432
- Maintenance database: tech-challenger
- Username: postgres
- Password: docker

### ORM Prisma

- Documentação:
  `https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql`

- caso os comandos não funcionem, utilizar `npx` ou invés de `npm`.

- Visualização das tabelas:

```sh
npm prisma studio
```

- Para rodar as migrations:

```sh
npm prisma migrate dev
```
