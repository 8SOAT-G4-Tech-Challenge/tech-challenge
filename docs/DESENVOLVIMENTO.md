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

- `http://localhost:3000/docs`

### ESLint

- Instalar extensão "ESLint" para VSCode
- Instalar extensão "Prettier - Code formatter"
- Habilitar no VSCode para correção automatica ao salvar:
- Acessar o Menu -> View - Command Palette -> Preferences: Open User Settings (JSON) e adicionar a seguinte linha, caso não tenha:

```js
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
	},
  "eslint.format.enable": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"prettier.singleQuote": true,
	"prettier.useTabs": true,
	"editor.formatOnSave": true
```

- Caso ocorra erro ao adicionar as configurações "editor.codeActionsOnSave"
  acima, tente adicionar:

```js
  "editor.codeActionsOnSave": {
		"source.fixAll": "always",
		"source.fixAll.eslint": "always"
	}
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
