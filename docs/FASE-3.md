## Como provisionar os recursos na AWS via pipeline

### Pré-requisitos

- Fazer parte da organização [8SOAT-G4-Tech-Challenge](https://github.com/8SOAT-G4-Tech-Challenge).

### Por que é preciso fazer parte da organização?

A organização [8SOAT-G4-Tech-Challenge](https://github.com/8SOAT-G4-Tech-Challenge) concentra todos os repositórios do projeto e possui variáveis e secrets globais que são utilizadas na execução das pipelines desses repositórios e é necessário o acesso para realizar alterações. São elas:

#### Variáveis

- **AWS_ACCOUNT_KEY**: Chave da conta AWS do laboratório. **Essa variável possui um valor dinâmico que deve ser preenchido com o valor presente no laboratório AWS**;
- **AWS_REGION**: Nome da região utilizada. O padrão é `us-east-1`. **Essa variável possui um valor fixo, por tanto, não precisa ser alterado**;
- **BUCKET_NAME**: Nome do bucket utilizado para armazenar os arquivos de estado do terraform;
- **COGNITO_ADMIN_USER_EMAIL**: E-mail utilizado para receber as credencias de acesso ao cognito. . **Essa variável possui um valor fixo, por tanto, não precisa ser alterado**;
- **DB_DATABASE**: Nome do banco de dados. **Essa variável possui um valor fixo, por tanto, não precisa ser alterado**;
- **DB_PORT**: Número da porta do banco de dados. **Essa variável possui um valor fixo, por tanto, não precisa ser alterado**;
- **DB_USER**: Usuário do banco de dados. **Essa variável possui um valor fixo, por tanto, não precisa ser alterado**;
- **PROJECT_NAME**: Nome do projeto. **Essa variável possui um valor fixo, por tanto, não precisa ser alterado**

#### Secrets

- **AWS_ACCESS_KEY_ID**: Valor da identificação de acesso, que é disponibilizada ao executar o laboratório da AWS(Aws details). Esse valor é refente a propriedade **aws_access_key_id**. **Essa secret é dinâmica, por tanto, é preciso atualizá-la com o valor respectivo ao seu laboratório**;

- **AWS_SECRET_ACCESS_KEY**: Valor da chave de acesso, que é também disponibilizada ao executar o laboratório da AWS(Aws details). Esse valor é refente a propriedade **aws_secret_access_key**. **Essa secret é dinâmica, por tanto, é preciso atualizá-la com o valor respectivo ao seu laboratório**;

- **AWS_SESSION_TOKEN**: Valor do token de sessão, que é também disponibilizada ao executar o laboratório da AWS(Aws details). Esse valor é refente a propriedade
  **aws_session_token**. **Essa secret é dinâmica, por tanto, é preciso atualizá-la com o valor respectivo ao seu laboratório**;

- **COGNITO_ADMIN_USER_PASSWORD**: Valor da senha necessária na requisição para o cognito para gerar o token de acesso. **Essa secret é fixa, por tanto, não precisa ser alterada**;

- **DB_PASSWORD**: Valor da senha utilizada no banco de dados. **Essa secret é fixa, por tanto, não precisa ser alterada**

### Passo a passo

1. Acesse o repositório [tech-challenge-database](https://github.com/8SOAT-G4-Tech-Challenge/tech-challenge-database) do banco de dados e execute a pipeline **CI - AWS RDS / Elastic Cache**;

2. Acesse o repositório [tech-challenge-lambdas](https://github.com/8SOAT-G4-Tech-Challenge/tech-challenge-lambdas) das lambdas e execute a pipeline **Deploy Lambda**;

3. Acesse o repositório [tech-challenge-terraform](https://github.com/8SOAT-G4-Tech-Challenge/tech-challenge-terraform) do provisionamento dos recursos para rodar a aplicação e execute a pipeline **CI - Infrastructure**.
