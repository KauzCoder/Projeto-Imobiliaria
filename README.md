# Projeto Imobiliaria

Site imobiliario em React, Node.js, Express, MongoDB e Tailwind CSS, organizado com backend em arquitetura MVC e JavaScript puro.

## Estrutura

```txt
app/
  components/        # Componentes React reutilizaveis
  data/              # Dados locais de fallback
  routes/            # Paginas Home, Sobre nos e Imoveis
  services/          # Comunicacao com a API
server/
  config/            # Conexao com MongoDB
  controllers/       # Regras das requisicoes
  data/              # Dados de seed
  models/            # Models do Mongoose
  routes/            # Rotas Express
```

## Requisitos

- Node.js
- MongoDB local ou uma string do MongoDB Atlas

## Configuracao

Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

Variaveis principais:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/projeto-imobiliaria
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:4000/api
```

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

Com o MongoDB rodando e `.env` configurado:

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
