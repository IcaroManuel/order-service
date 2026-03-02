# Order Management Service 🚀

Serviço de alta escalabilidade para processamento de pedidos, focado em Arquitetura Orientada a Eventos (EDA) e princípios de Domain-Driven Design (DDD) e Clean Architecture.

## 🏗️ Arquitetura e Tecnologias

Este projeto utiliza uma abordagem moderna para garantir resiliência e desacoplamento:

- **Framework:** NestJS com TypeScript.
- **Padrão de Design:** CQRS (Command Query Responsibility Segregation).
- **Banco de Dados:** AWS DynamoDB (NoSQL de baixa latência).
- **Mensageria:** AWS SNS (Simple Notification Service) para o padrão Fan-out.
- **Infraestrutura:** Terraform (IaC) para provisionamento automatizado na AWS.
- **Containerização:** Docker (Multistage Build) para imagens leves de produção.

## 🛠️ Pré-requisitos

- Node.js (v18+)
- Terraform instalado
- Docker instalado (opcional, para rodar via container)
- AWS CLI configurado com credenciais válidas

## 🚀 Como Iniciar

### 1. Provisionamento da Infraestrutura

Navegue até a pasta terraform e execute os comandos para criar a infraestrutura:

```bash
terraform init
terraform apply
```

Copie o `sns_topic_arn` gerado no final do processo.

### 2. Configuração da Aplicação

Crie um arquivo `.env` na raiz do projeto seguindo o modelo:

```env
AWS_REGION=us-east-1
ORDER_SNS_TOPIC_ARN=seu_arn_aqui
ORDERS_API_KEY=sua_chave_secreta
```

### 3. Execução

Você pode rodar localmente para desenvolvimento ou via Docker para simular produção:

**Local:**

```bash
npm install
npm run start:dev
```

**Docker:**

```bash
docker build -t order-service .
docker run -p 3000:3000 --env-file .env order-service
```

## 🧪 Testes e Qualidade

A aplicação possui uma suíte de testes robusta utilizando Jest, garantindo a integridade do domínio e das integrações:

```bash
# Executar testes unitários e de mocks
npm run test

# Verificar cobertura de código
npm run test:cov
```

## 📡 API Endpoints

### Criar Novo Pedido

**POST** `/orders`

**Headers:**

- `x-api-key`: Chave definida no seu arquivo .env.

**Payload:**

```json
{
  "customerId": "user_id_123",
  "items": [
    { "sku": "IPHONE-15", "name": "iPhone 15", "price": 5000, "quantity": 1 }
  ]
}
```

## 🛡️ Segurança e Resiliência

- **Always Valid Domain:** Entidades com validações de regra de negócio integradas ao construtor, impedindo estados inválidos (ex: preços negativos).
- **Segurança:** Proteção de rotas via ApiKeyGuard.
- **Logs Estruturados:** Interceptores para auditoria de requisições.
- **Tratamento de Exceções:** Global Filters para respostas padronizadas.
- **Idempotência:** Configurado via Terraform para evitar duplicidade de recursos.
