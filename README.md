# Projeto Imobiliaria

Site imobiliario em React, Node.js, Express, PostgreSQL/Neon e Tailwind CSS, organizado com backend em arquitetura MVC e JavaScript puro.

## Estrutura

```txt
app/
  components/        # Componentes React reutilizaveis
  data/              # Dados locais de fallback
  routes/            # Paginas Home, Sobre nos e Imoveis
  services/          # Comunicacao com a API
server/
  config/            # Conexao e schema do PostgreSQL
  controllers/       # Regras das requisicoes
  data/              # Dados de seed
  models/            # Repositorios PostgreSQL
  routes/            # Rotas Express
```

## Requisitos

- Node.js
- PostgreSQL online pelo Neon

## Configuracao

Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

Variaveis principais:

```env
PORT=4000
DATABASE_URL=postgresql://usuario:senha@host/neondb?sslmode=require
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:4000/api
```

Cole em `DATABASE_URL` a connection string do Neon. No painel do Neon, ela normalmente aparece em **Connect** como uma URL PostgreSQL com `sslmode=require`.

## Instalar dependencias

```bash
npm install
```

## Rodar o projeto

Frontend:

```bash
npm run dev:client
```

API:

```bash
npm run dev:server
```

Para desenvolver, rode o frontend e a API em dois terminais.

## Popular o banco

Para cadastrar os imoveis iniciais no banco configurado:

```bash
npm run seed
```

## Rotas da API

Base: `http://localhost:4000/api`

- `GET /health`
- `GET /properties`
- `GET /properties/:id`
- `POST /properties`
- `PUT /properties/:id`
- `DELETE /properties/:id`

## Paginas

- `/` - Home
- `/sobre` - Sobre nos
- `/imoveis` - Catalogo com mapa interativo
