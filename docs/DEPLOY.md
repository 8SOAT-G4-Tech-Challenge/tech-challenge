## Como realizar o deploy da Aplicação

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/);
-	[Kubernetes](https://kubernetes.io/docs/tasks/tools/) - kubectl
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/) - Opcional

### Passo a passo

**Etapa Opcional - Criação de um Novo Cluster:**:

- **Criar novo Cluster utilizando o Kind:**
Se você deseja iniciar um novo cluster exclusivo para esta aplicação, siga os passos abaixo - Necessária a instalação do ***Kind***:

```sh
kind create cluster --config=deploy/kubernetes/kind-cluster-config.yaml --name=tech-challenge-cluster
```

- **Habilitar o novo cluster criado**

```sh
kubectl cluster-info --context kind-tech-challenge-cluster
```

**Etapa para deploy da aplicação:**

- **Deploy automatizado:**
1. Tonar o script executável:
```sh
chmod +x deploy.sh
```

2. Executar o arquivo para iniciar o deploy do projeto:
```sh
./deploy.sh
```

- **Deploy manual:**
1. Criar o Namespace:
```sh
kubectl apply -f deploy/kubernetes/config/namespace-config.yaml
```

2. Criar a Secret e ConfigMap
```sh
kubectl apply -f deploy/kubernetes/config/secret-config.yaml
kubectl apply -f deploy/kubernetes/config/env-config.yaml
```

3. Aplicar os Volumes Locais para o Banco de Dados:
```sh
kubectl apply -f deploy/kubernetes/volume
```

4. Subir o serviço de Banco de Dados PostgresSQL (Service, Deployment, HPA):
```sh
kubectl apply -f deploy/kubernetes/database
```

5. Rodar o Job para criação do banco e tabelas da aplicação:
```sh
kubectl apply -f deploy/kubernetes/migration/migration-job.yaml
```

6. Subir o serviço da API (Service, Deployment, e HPA)
```sh
kubectl apply -f deploy/kubernetes/api
```

7. Rodar o Prisma Studio (opcional)
```sh
kubectl apply -f deploy/kubernetes/prisma-studio
```

- **Acessando os serviços:**
1. Banco de dados:

- Caso tenha feito deploy do Prisma Studio, o banco de dados poderá ser visualizado acessando `http://localhost:31555`

<br>

- Para utilizar um programa gerenciador de banco de dados, será necessário redirecionar uma porta para que o programa tenha acesso e consiga se conectar ao banco de dados

```sh
kubectl port-forward svc/postgres-service 5432:5432 -n tech-challenge-group-4
```

- Após o comando, a porta estará pronta para receber conexões.

```
Host: localhost:5432
Database: tech-challenger
Username: postgres
Password: docker
```

2. API

- Para acessar a documentação da API, basta acessar a url:
`http://127.0.0.1:31333/docs`

<br>

- Caso a página esteja indisponível, pode ser necessário redirecionar uma porta para que tenha acesso a aplicação:

```sh
kubectl port-forward svc/api-tech-challenge-service 31333:3333 -n tech-challenge-group-4
```

Nesse caso, a aplicação poderá ser acessada utilizando a seguinte url:
`http://127.0.0.1:31333/docs`