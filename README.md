# API REST - Copa do Mundo 2022

API RESTful desenvolvida durante o estágio, implementando conceitos de arquitetura de APIs, versionamento, documentação, persistência de dados e TypeScript.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Swagger/OpenAPI
- pnpm

## Estrutura do Projeto# API REST - Gerenciamento de Seleções Copa 2022

API RESTful desenvolvida em Node.js com TypeScript, Express e Prisma ORM, seguindo princípios de arquitetura em camadas e boas práticas de desenvolvimento.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- Bcrypt
- Swagger (documentação)

## Descrição

Esta API permite gerenciar seleções e jogadores da Copa do Mundo 2022, com sistema completo de autenticação JWT, refresh tokens e proteção de rotas. Implementa arquitetura em camadas (Repository → Service → Controller) para melhor organização e manutenibilidade.

## Funcionalidades

### Autenticação

- **Registro de usuários** com hash de senha (bcrypt)
- **Login** com validação de credenciais
- **Refresh tokens** para renovação de access tokens
- **Proteção de rotas** com middleware JWT
- **Access tokens** com expiração de 15 minutos
- **Refresh tokens** com expiração de 7 dias

### Seleções

- Listar todas as seleções
- Buscar seleção por ID
- Criar nova seleção (rota protegida)
- Atualizar seleção (rota protegida)
- Deletar seleção (rota protegida)

### Jogadores

- Listar todos os jogadores
- Buscar jogador por ID
- Criar novo jogador (rota protegida)
- Atualizar jogador (rota protegida)
- Deletar jogador (rota protegida)
- Listar jogadores por seleção

## Arquitetura

### Camadas

```
src/
├── config/
│   └── database.ts
├── controllers/
│   ├── selecaoController.ts
│   └── jogadorController.ts
├── services/
│   ├── selecaoService.ts
│   └── jogadorService.ts
├── repositories/
│   ├── selecaoRepository.ts
│   └── jogadorRepository.ts
├── middlewares/
│   ├── logger.ts
│   ├── validarSelecoes.ts
│   └── tratarErros.ts
├── routes/
│   ├── v1/
│   │   └── selecoes.ts
│   ├── v2/
│   │   └── selecoes.ts
│   └── v3/
│       ├── selecoes.ts
│       └── jogadores.ts
├── swagger/
│   └── swagger.ts
├── types/
│   ├── selecao.types.ts
│   ├── jogador.types.ts
│   └── index.ts
├── errors/
│   └── NotFoundError.ts
├── app.ts
└── prisma/
    ├── schema.prisma
    └── migrations/
server.ts
```

## Entregas Implementadas

### Tópico 10: API Express com Rotas e Middlewares

**Rotas GET/POST:**

- GET `/selecoes` - Listar todas as seleções
- POST `/selecoes` - Adicionar nova seleção

**Middlewares:**

- Logger - Registra todas as requisições (método, URL, timestamp)
- Validação - Valida dados do POST antes de processar
- Tratamento de erros - Captura e trata erros globalmente

### Tópico 11: Documentação e Versionamento

**Documentação com Swagger:**

- Interface interativa em `/api-docs`
- Documentação de todos os endpoints com anotações JSDoc
- Schemas de request/response definidos

**Versionamento:**

- v1 - Retorna array simples de seleções
- v2 - Retorna objeto com metadados (total + array)
- v3 - Integração com banco de dados (Prisma)

### Tópico 13: Banco de Dados SQL

**Esquema implementado no MySQL:**

- Tabela `selecoes` com constraints (PRIMARY KEY, UNIQUE, DEFAULT)
- Tabela `jogadores` com relacionamento 1:N
- FOREIGN KEY para integridade referencial
- CHECK constraints e ENUM para validação

**Queries implementadas:**

- Consultas simples com SELECT
- Filtros com WHERE
- Ordenação com ORDER BY
- JOIN entre tabelas
- Agregação com COUNT e GROUP BY

### Tópico 14: CRUD com Prisma

**Modelagem:**

- Schema Prisma com models Selecao e Jogador
- Relacionamento 1:N configurado
- Enum para posições dos jogadores

**Migrations:**

- Migration inicial criada e aplicada
- Banco PostgreSQL no Neon

**CRUD Completo:**

**Seleções (v3):**

- GET `/v3/selecoes` - Listar todas
- GET `/v3/selecoes/:id` - Buscar por ID
- POST `/v3/selecoes` - Criar
- PUT `/v3/selecoes/:id` - Atualizar
- DELETE `/v3/selecoes/:id` - Deletar

**Jogadores (v3):**

- GET `/v3/jogadores` - Listar todos (com dados da seleção)
- GET `/v3/jogadores/:id` - Buscar por ID
- POST `/v3/jogadores` - Criar
- PUT `/v3/jogadores/:id` - Atualizar
- DELETE `/v3/jogadores/:id` - Deletar

### Tópico 15: Migração para TypeScript

**Tipagem forte implementada:**

- Interfaces para Selecao e Jogador
- Types auxiliares (Create, Update) usando Omit e Partial
- Enum EnumPosicao para posições
- Tipagem de Request, Response e NextFunction
- Type safety nas operações do Prisma

**Benefícios:**

- Erros detectados em tempo de desenvolvimento
- Autocomplete e IntelliSense
- Refatoração segura
- Código autodocumentado

### Tópico 16: Arquitetura MVC

**Implementação de arquitetura em camadas:**

Refatoração completa do projeto para separar responsabilidades em camadas distintas, seguindo o padrão MVC adaptado para APIs REST.

**Estrutura das camadas:**

```
Controller → Service → Repository → Database (Prisma)
```

**Controller (Camada de Apresentação):**

- Recebe requisições HTTP
- Valida entrada básica
- Chama métodos do Service
- Retorna respostas HTTP com status apropriado
- Trata erros específicos (404, 500)

**Service (Camada de Negócio):**

- Contém lógica de negócio
- Valida regras de domínio
- Orquestra operações complexas
- Lança erros customizados (NotFoundError)
- Reutilizável por múltiplos Controllers

**Repository (Camada de Dados):**

- Encapsula acesso ao banco de dados
- Abstrai operações do Prisma
- Métodos: findAll, findById, create, update, delete
- Sem lógica de negócio

**Benefícios da arquitetura:**

1. **Separação de Responsabilidades:** Cada camada tem um propósito específico e bem definido

2. **Testabilidade:** Camadas podem ser testadas isoladamente com mocks

3. **Manutenibilidade:** Mudanças localizadas (trocar banco afeta apenas Repository)

4. **Reutilização:** Services podem ser compartilhados entre Controllers

5. **Escalabilidade:** Estrutura preparada para crescimento do projeto

**Exemplo de fluxo de requisição:**

```
GET /v3/selecoes/1

1. Controller recebe requisição
   - Extrai id dos params
   - Chama selecaoService.buscarPorId(1)

2. Service processa
   - Chama selecaoRepository.findById(1)
   - Valida se existe
   - Se não: lança NotFoundError
   - Se sim: retorna seleção

3. Repository executa
   - Chama prisma.selecao.findUnique()
   - Retorna resultado do banco

4. Controller retorna
   - Status 200 + JSON (sucesso)
   - Status 404 + erro (não encontrado)
   - Status 500 + erro (erro servidor)
```

**Tratamento de erros:**

- Classe `NotFoundError` customizada
- Validações centralizadas nos Services
- Controllers capturam e retornam status HTTP correto

## Schema do Banco de Dados

### Model: Selecao

```prisma
model Selecao {
  id        Int       @id @default(autoincrement())
  nome      String    @unique
  grupo     String
  titulos   Int       @default(0)
  jogadores Jogador[]
}
```

### Model: Jogador

```prisma
enum EnumPosicao {
  GOLEIRO
  ZAGUEIRO
  LATERAL
  VOLANTE
  MEIA
  ATACANTE
}

model Jogador {
  id           Int         @id @default(autoincrement())
  nome         String
  posicao      EnumPosicao
  numeroCamisa Int
  selecaoId    Int
  selecao      Selecao     @relation(fields: [selecaoId], references: [id])
}
```

## Como Executar

### Instalação

```bash
pnpm install
```

### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="sua-connection-string-do-neon"
```

### Executar Migrations

```bash
npx prisma migrate dev
```

### Desenvolvimento

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Produção

```bash
pnpm start
```

## Documentação da API

Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

A interface do Swagger permite visualizar e testar todos os endpoints disponíveis.

## Exemplos de Uso

### Criar uma Seleção

```bash
POST http://localhost:3000/v3/selecoes
Content-Type: application/json

{
  "nome": "Brasil",
  "grupo": "G",
  "titulos": 5
}
```

### Criar um Jogador

```bash
POST http://localhost:3000/v3/jogadores
Content-Type: application/json

{
  "nome": "Neymar",
  "posicao": "ATACANTE",
  "numeroCamisa": 10,
  "selecaoId": 1
}
```

### Listar Jogadores com Seleções

```bash
GET http://localhost:3000/v3/jogadores
```

Resposta:

```json
[
  {
    "id": 1,
    "nome": "Neymar",
    "posicao": "ATACANTE",
    "numeroCamisa": 10,
    "selecaoId": 1,
    "selecao": {
      "id": 1,
      "nome": "Brasil",
      "grupo": "G",
      "titulos": 5
    }
  }
]
```

## Middlewares

### Logger

Registra todas as requisições no formato:

```
GET /v3/selecoes - 2025-01-23T10:30:45.123Z
```

### Validação

Valida campos obrigatórios antes de processar requisições POST.

### Tratamento de Erros

Captura erros não tratados e retorna resposta padronizada com status 500.

## Versionamento da API

A API mantém três versões simultâneas:

- **v1:** Implementação inicial com dados em memória
- **v2:** Versão com formato de resposta aprimorado
- **v3:** Versão com persistência em banco de dados e arquitetura MVC completa

Isso permite retrocompatibilidade e migração gradual de clientes.
