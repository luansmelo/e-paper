
# **e-paper**

Um sistema de gerenciamento de documentos, desenvolvido com **NestJS**, utilizando **PostgreSQL** como banco de dados e **MinIO** para armazenamento de arquivos. Este projeto foi projetado para ser executado em um ambiente Docker, garantindo portabilidade e facilidade de execução.

## **Sumário**
1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Requisitos](#requisitos)
3. [Configuração do Ambiente](#configuração-do-ambiente)
4. [Iniciando o Projeto](#iniciando-o-projeto)
5. [Rotas e Estruturas](#rotas-e-estruturas)
6. [Comandos Úteis](#comandos-úteis)
7. [Execução de Testes](#execução-de-testes)
8. [Estrutura do Projeto](#estrutura-do-projeto)
9. [Dicas](#dicas)

## **Tecnologias Utilizadas**
- **Node.js** (v20+)
- **NestJS** (Framework Backend)
- **PostgreSQL** (Banco de Dados)
- **MinIO** (Armazenamento de Arquivos)
- **Drizzle ORM** (Gerenciamento de Banco de Dados)
- **Docker** e **Docker Compose**
- **Swagger** (Documentação da API)
- **ts-rest** (Rotas e Contratos)
- **zod** (Validação e Tipagem)
- **nestjs-zod** (Criação de DTOs e validação com Zod)

## **Requisitos**
1. **Node.js** e **npm** (opcional, se for rodar localmente).
2. **Docker** e **Docker Compose**.
3. Banco de dados **PostgreSQL** e **MinIO**.

## **Configuração do Ambiente**
O projeto utiliza dois arquivos `.env`:
1. **.env.production**
2. **.env.development**

### **Exemplo de Configuração**
```env
# Configurações Gerais
PORT=3000

# Configuração do Banco de Dados
DATABASE_URL=postgres://postgres:epap3r@db:5432/e-paper

# Configuração do MinIO
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password
MINIO_ENDPOINT=http://minio:9000
MINIO_BUCKET=e-paper
```

## **Iniciando o Projeto**
### **Passos para execução no Docker**
1. **Construa os serviços:**
   ```bash
   docker-compose build
   ```
2. **Inicie os serviços:**
   ```bash
   docker-compose up
   ```

## **Swagger**
Acesse a documentação da API no navegador após iniciar o projeto:
```
http://localhost:3000/api  
```
### **Configuração do Swagger**
O Swagger foi configurado utilizando os contratos definidos com o **ts-rest**, garantindo que os endpoints e tipos sejam sincronizados automaticamente.

## **Melhorias Realizadas**
1. **Integração com Swagger:** Configurada a documentação da API no endpoint `/api` utilizando os contratos do **ts-rest** e validações com **zod**.
2. **Validação com `nestjs-zod`:** DTOs e validações centralizadas utilizando **zod**, garantindo consistência entre os tipos e validação em tempo de execução.
3. **Uso do `ts-rest`:** Simplificação da definição de rotas e contratos com **ts-rest**, alinhando documentação, tipos e validação.
4. **Melhoria na Estrutura:** A lógica de aplicação foi reorganizada para aproveitar melhor o poder do **nestjs-zod** e do **ts-rest**.
5. **Sincronização de Tipos:** Eliminação de redundância entre os DTOs e validações através da inferência automática com o **zod**.

## **Rotas e Estruturas**
Abaixo estão as rotas da API, com os dados esperados e retornados em formato **JSON**:

### **1. Criar Documento**
- **Método:** `POST`
- **Rota:** `/document`
- **Body:**
  ```json
  {
    "origin": "string",
    "type": "string"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Documento criado com sucesso!",
    "data": {
      "id": "string",
      "origin": "string",
      "type": "string",
      "name": "string",
      "issuer": "string",
      "totalTaxValue": 0,
      "netValue": 0,
      "fileUrl": "string",
      "createdAt": "2024-11-23T00:00:00.000Z",
      "updatedAt": "2024-11-23T00:00:00.000Z"
    }
  }
  ```

### **2. Upload de Arquivo**
- **Método:** `POST`
- **Rota:** `/document/upload/:documentId`
- **Body:** Multipart Form
  ```json
  {
    "file": "file"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Arquivo enviado com sucesso!",
    "data": {
      "id": "string",
      "fileUrl": "string"
    }
  }
  ```

### **3. Buscar Documento por ID**
- **Método:** `GET`
- **Rota:** `/document/:id`
- **Resposta:**
  ```json
  {
    "id": "string",
    "origin": "string",
    "type": "string",
    "name": "string",
    "issuer": "string",
    "totalTaxValue": 0,
    "netValue": 0,
    "fileUrl": "string",
    "createdAt": "2024-11-23T00:00:00.000Z",
    "updatedAt": "2024-11-23T00:00:00.000Z"
  }
  ```

### **4. Listar Documentos**
- **Método:** `GET`
- **Rota:** `/document`
- **Query Params:**
  ```json
  {
    "type": "string",
    "issuer": "string",
    "createdAtStart": "2024-11-23T00:00:00.000Z",
    "createdAtEnd": "2024-11-23T00:00:00.000Z",
    "totalTaxValueMin": 0,
    "totalTaxValueMax": 0,
    "netValueMin": 0,
    "netValueMax": 0,
    "sortBy": "string",
    "sortOrder": "asc | desc",
    "page": 1,
    "pageSize": 10
  }
  ```
- **Resposta:**
  ```json
  {
    "data": [
      {
        "id": "string",
        "origin": "string",
        "type": "string",
        "name": "string",
        "issuer": "string",
        "totalTaxValue": 0,
        "netValue": 0,
        "fileUrl": "string",
        "createdAt": "2024-11-23T00:00:00.000Z",
        "updatedAt": "2024-11-23T00:00:00.000Z"
      }
    ],
    "totalItems": 2,
    "totalPages": 1
  }
  ```

### **5. Deletar Documento**
- **Método:** `DELETE`
- **Rota:** `/document/:id`
- **Resposta:**
  ```json
  {
    "message": "Documento deletado com sucesso!"
  }
  ```

### **6. Atualizar Documento**
- **Método:** `PATCH`
- **Rota:** `/document/:id`
- **Body:**
  ```json
  {
    "name": "string",
    "issuer": "string",
    "totalTaxValue": 0,
    "netValue": 0,
    "fileUrl": "string"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Documento atualizado com sucesso!",
    "data": {
      "id": "string",
      "name": "string",
      "issuer": "string",
      "totalTaxValue": 0,
      "netValue": 0,
      "fileUrl": "string",
      "updatedAt": "2024-11-23T00:00:00.000Z"
    }
  }
  ```

## **Comandos Úteis**
- **Rodar o projeto:** 
  ```bash
  docker-compose up
  ```
- **Executar testes unitários:**
  ```bash
  npm run test:unit
  ```
- **Executar migrações manualmente:**
  ```bash
  npm run run:migration
  ```

## **Estrutura do Projeto**
- **src/domain**: Entidades e interfaces do domínio.
- **src/application**: Casos de uso e lógica de aplicação.
- **src/infra**: Implementações e infraestrutura.
- **src/presentation**: Controladores e rotas.

## **Dicas**
- Certifique-se de que os serviços estão rodando corretamente antes de acessar o sistema.
- Use ferramentas como **Postman** ou **Insomnia** para testar as rotas.
