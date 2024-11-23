# **e-paper**

Um sistema de gerenciamento de documentos, desenvolvido com **NestJS**, utilizando **PostgreSQL** como banco de dados e **MinIO** para armazenamento de arquivos. Este projeto foi projetado para ser executado em um ambiente Docker, garantindo portabilidade e facilidade de execução.

---

## **Sumário**
1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Requisitos](#requisitos)
3. [Configuração do Ambiente](#configuração-do-ambiente)
4. [Iniciando o Projeto](#iniciando-o-projeto)
5. [Comandos Úteis](#comandos-úteis)
6. [Execução de Testes](#execução-de-testes)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [Dicas](#dicas)

---

## **Tecnologias Utilizadas**
- **Node.js** (v20+)
- **NestJS** (Framework Backend)
- **PostgreSQL** (Banco de Dados)
- **MinIO** (Armazenamento de Arquivos)
- **Drizzle ORM** (Gerenciamento de Banco de Dados)
- **Docker** e **Docker Compose**

---

## **Requisitos**
1. **Node.js** e **npm** (opcional, se for rodar localmente)
2. **Docker** e **Docker Compose**
3. Banco de dados **PostgreSQL** e **MinIO**

---

## **Configuração do Ambiente**
O projeto utiliza dois arquivos `.env`:
1. **.env.production**
2. **.env.development**

### **Exemplo de Configuração**
```env
# Configurações Gerais
PORT=3000

# Configuração do Banco de Dados
DATABASE_URL=postgres://postgres:postgres@db:5432/e-paper_

# Configuração do MinIO
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password
MINIO_ENDPOINT=http://minio:9000
MINIO_BUCKET=e-paper
