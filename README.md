# FIAP Tech-Challenge 8SOAT - Fase 01

## Objetivo do Projeto

Esta solução tem como objetivo fornecer um sistema de controle de pedidos para uma lanchonete em expansão.
Através de um totem de autoatendimento, os clientes poderão criar seus próprios pedidos,
realizar pagamentos de forma integrada e acompanhar o status dos pedidos em tempo real.
Isso visa otimizar a eficiência no atendimento, reduzir erros e aumentar a satisfação dos clientes,
suportando o crescimento contínuo da lanchonete.

## Principais funcionalidades:

- **Interface de Pedido**: Permitir que os clientes façam pedidos personalizados, com a opção de se identificarem ou não, e selecionem itens como lanches, acompanhamentos, bebidas e sobremesas.
- **Pagamento Integrado**: Facilitar o pagamento dos pedidos via QRCode do Mercado Pago.
- **Acompanhamento do Pedido**: Exibir o status do pedido em tempo real (Recebido, Em preparação, Pronto, Finalizado) tanto para os clientes quanto para a equipe da cozinha.

## Requerimentos

- Node versão 20;
- [Docker](https://docs.docker.com/get-docker/);
- Docker Compose

## Documentação

- Para uma documentação mais detalhada sobre DDD, linguagem ubíqua e event storming, acesse o link do Miro:
  [Documentação do Projeto](https://miro.com/app/board/uXjVK2WZuMs=/)

## Diagrama do Banco de Dados

- [Diagrama ER](https://miro.com/app/board/uXjVK0gj0bg=/)

## Execução

Para executar a aplicação siga a seguinte [documentação](docs/INSTALACAO.md), que possui todos os passos para iniciar e executar a aplicação localmente.

## Desenvolvimento

Para realizar o desenvolvimento de novas features é importante fazer as configurações descritas na [documentação](docs/DESENVOLVIMENTO.md).

## Endpoints

Esta API fornece documentação no padrão OpenAPI através do Swagger.
Os endpoints disponíveis, suas descrições e dados necessários para requisição podem ser consultados e testados em `/docs`.

#### Melhorias e implementações futuras:

- **Gerenciamento de Clientes e Produtos**: Permitir ao estabelecimento gerenciar campanhas promocionais, produtos e categorias através de um painel administrativo.

## Participantes do Projeto

- Amanda Maschio - RM 357734
- Jackson Antunes - RM357311
- Lucas Accurcio - RM 357142
- Vanessa Freitas - RM 357999
- Winderson Santos - RM 357315
