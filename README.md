# Order Management Service 🚀

Serviço de alta escalabilidade para processamento de pedidos, focado em Arquitetura Orientada a Eventos (EDA) e princípios de Domain-Driven Design (DDD).

## 🏗️ Arquitetura e Tecnologias

Este projeto utiliza uma abordagem moderna para garantir resiliência e desacoplamento:

- **Framework:** NestJS com TypeScript.
- **Padrão de Design:** CQRS (Command Query Responsibility Segregation).
- **Banco de Dados:** AWS DynamoDB (NoSQL de baixa latência).
- **Mensageria:** AWS SNS (Simple Notification Service) para o padrão Fan-out.
- **Infraestrutura:** Terraform (IaC) para provisionamento automatizado na AWS.

## 🛠️ Pré-requisitos

- Node.js (v18+)
- Terraform instalado
- AWS CLI configurado com credenciais válidas

## 🚀 Como Iniciar

### 1. Provisionamento da Infraestrutura

Navegue até a pasta terraform e execute os comandos para criar a tabela DynamoDB e os tópicos de mensageria:

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
```

### 3. Rodando o Serviço

```bash
npm install
npm run start:dev
```

## 📡 API Endpoints

### Criar Novo Pedido

**POST** `/orders`

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

- **Logs Estruturados:** Interceptores para auditoria de requisições.
- **Tratamento de Exceções:** Global Filters para respostas padronizadas.
- **Idempotência:** Configurado via Terraform para evitar duplicidade de recursos.

> **Dica:** Lembre-se de rodar `terraform destroy` após os testes para evitar custos desnecessários em sua conta AWS.
