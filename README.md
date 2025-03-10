# TechTestFairy
Desafio FullStack para criação de tarafas.

# Aplicação Node
API HTTP em Node.js com TypeScript, NestJS, Prisma, Docker e PostgreSQL.

## Guia de desenvolvimento
Prerequisites:

-  caso não utilize docker é recomendado ter uma versao do node mais atual.
- `yarn` ou `npm` (para gerenciamento de dependências e execução de scripts)
- `docker` e `docker-compose` (para executar o servidor, banco de dados localmente de forma isolada e reproduzível)

### Backend:
Em primeiro lugar se faz necessário preencher as variáveis de ambiente do backend. Crie um arquivo .env na raíz do projeto backend (exemplo abaixo).

```
DATABASE_URL=
PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
JWT_SECRET=

```
Exemplo de DATABASE_URL:
```
DATABASE_URL="postgresql://postgres:postgres@db:5432/techtest?schema=public"

```

Em seguida é so subir o container docker:
```
sudo docker compose up
```

Antes de testar qualquer endpoint rode o comando para executar as migrations:
```

docker exec techtest_api npx prisma migrate dev
```

Sem o docker:

```
npm i
npm run start
yarn start
```

### Swaager:

Documentação disponível em http://localhost:{PORTA}/api

### Frontend
Para startar a aplicação frontend é necessário preencher a variavel de ambiente:

```
VITE_PORT=
```

E depois rodar o projeto: 
```
cd frontend
npm run dev
```
Qualquer duvida só me chamar pelo linkedin

https://www.linkedin.com/in/gabriel-rodrigues-aaa352207/
