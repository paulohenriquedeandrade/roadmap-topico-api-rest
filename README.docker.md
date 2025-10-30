# Docker Setup

## Pré-requisitos

- Docker
- Docker Compose

## Como rodar

1. Clone os repositórios:

```bash
git clone <backend-repo>
git clone <frontend-repo>
```

2. Configure variáveis de ambiente:

```bash
cd roadmap-topico-api-rest
cp .env.example .env
# Edite o .env com seus secrets
```

3. Suba os containers:

```bash
docker-compose up --build
```

4. Rode as migrations:

```bash
docker exec -it backend_api npx prisma migrate deploy
```

5. Acesse:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Banco: localhost:5432

## Comandos úteis

```bash
# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Acessar container
docker exec -it backend_api sh

# Limpar tudo
docker-compose down -v
```
