# UGB Node API: API de Super-heróis

API REST simples para cadastrar, consultar, atualizar e remover super-heróis, feita com **JavaScript**, **Node.js** e **Express**.

> 🎓 **Projeto universitário, com fins de aprendizagem.**
> Este projeto foi desenvolvido **em sala de aula**, no curso de Engenharia de Software do **Centro Universitário Geraldo Di Biase (UGB)**, para praticar os conceitos de desenvolvimento de APIs. Ele não foi pensado para uso em produção.

---

## 📌 Objetivo

Aprender, na prática, como funciona uma API do tipo **CRUD** (Create, Read, Update, Delete), entendendo o caminho completo de uma requisição:

```
Postman → servidor → rota → controller → model → banco de dados → resposta
```

Conceitos praticados:

- Verbos HTTP: `GET`, `POST`, `PUT`, `PATCH` e `DELETE`
- Diferença entre `PUT` (substituir tudo) e `PATCH` (alterar só uma parte)
- Rotas e parâmetros de URL (`/heroes/:id`)
- Separação de responsabilidades: rotas, controllers e models
- Uso de um ORM (Sequelize) para conversar com o banco sem escrever SQL
- Códigos de status HTTP (`200`, `201`, `204`, `400`, `404`)
- Testes manuais de requisições com o Postman

---

## 🛠️ Tecnologias

| Tecnologia | Para que serve |
|---|---|
| [Node.js](https://nodejs.org/) | Executar JavaScript fora do navegador |
| [Express](https://expressjs.com/) (v5) | Criar o servidor e as rotas |
| [Sequelize](https://sequelize.org/) | ORM: mapeia tabelas para objetos JavaScript |
| [SQLite](https://www.sqlite.org/) (via `sqlite3`) | Banco de dados em um único arquivo local |
| [Postman](https://www.postman.com/) | Testar as requisições |

---

## 📁 Estrutura do projeto

```
ugb-node-api/
├── .gitignore
├── README.md
└── superheroes-api/
    ├── package.json
    ├── server.js                          # Liga o servidor na porta 3000
    └── src/
        ├── app.js                         # Configura o Express, as rotas e o banco
        ├── database/
        │   └── database.js                # Conexão com o SQLite (Sequelize)
        ├── models/
        │   ├── Hero.js                    # Estrutura da tabela de heróis
        │   └── Movie.js                   # Estrutura da tabela de filmes
        ├── routes/
        │   └── heroes.routes.js           # Liga cada URL + método a uma função
        └── controllers/
            └── heroes.controllers.js      # Lógica de cada operação
```

---

## 🚀 Como executar

**Pré-requisito:** ter o [Node.js](https://nodejs.org/) instalado (use uma versão LTS recente).

```bash
# 1. Clone o repositório
git clone https://github.com/Arthur-sz/ugb-node-api.git

# 2. Entre na pasta do projeto
cd ugb-node-api/superheroes-api

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm start
```

Para desenvolvimento, use o modo que reinicia o servidor automaticamente quando você salva um arquivo:

```bash
npm run dev
```

Se tudo der certo, o terminal mostrará:

```
Server rodando em http://localhost:3000
Banco de dados sincronizado.
```

O banco de dados é um arquivo `database.sqlite`, e as tabelas são criadas automaticamente na primeira execução.

---

## 📡 Endpoints

URL base: `http://localhost:3000`

| Método | Rota | O que faz | Status de sucesso |
|---|---|---|---|
| `GET` | `/heroes` | Lista todos os heróis | `200 OK` |
| `POST` | `/heroes` | Cria um herói | `201 Created` |
| `PUT` | `/heroes/:id` | Substitui **todos** os dados de um herói | `200 OK` |
| `PATCH` | `/heroes/:id` | Altera **só os campos enviados** | `200 OK` |
| `DELETE` | `/heroes/:id` | Remove um herói | `204 No Content` |

### Modelo `Hero`

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `id` | inteiro | gerado | Numerado automaticamente pelo banco |
| `name` | texto | sim | Nome do herói |
| `universe` | texto | sim | Universo de origem (ex.: Marvel, DC) |
| `power` | texto | sim | Poder principal |
| `createdAt` | data | gerado | Preenchido automaticamente |
| `updatedAt` | data | gerado | Atualizado automaticamente a cada alteração |

### Exemplos

**Criar um herói:** `POST /heroes`

```json
{
  "name": "Capitao America",
  "universe": "Marvel",
  "power": "Escudo"
}
```

Resposta (`201 Created`):

```json
{
  "id": 1,
  "name": "Capitao America",
  "universe": "Marvel",
  "power": "Escudo",
  "createdAt": "2026-11-05T13:49:17.227Z",
  "updatedAt": "2026-11-05T13:49:17.227Z"
}
```

**Substituir um herói:** `PUT /heroes/1` (os três campos são obrigatórios)

```json
{
  "name": "Capitao America",
  "universe": "Marvel",
  "power": "Forca"
}
```

**Alterar parte de um herói:** `PATCH /heroes/1` (envie só o que mudou)

```json
{
  "power": "Forca"
}
```

**Remover um herói:** `DELETE /heroes/1`. Não leva body, e a resposta é `204` com o corpo vazio.

### Respostas de erro

| Situação | Status | Resposta |
|---|---|---|
| `PUT` sem `name`, `universe` ou `power` | `400 Bad Request` | `{ "message": "Nome, universo e poder são obrigatórios" }` |
| `PATCH` sem nenhum campo válido | `400 Bad Request` | `{ "message": "Envie ao menos um campo: name, universe ou power" }` |
| `PUT`, `PATCH` ou `DELETE` com `id` que não existe | `404 Not Found` | `{ "message": "Herói não encontrado" }` |

> Ao enviar JSON pelo Postman, use **Body → raw → JSON**.

---

## 🧪 Como testar com o Postman

1. Inicie o servidor (`npm run dev`).
2. No Postman, crie uma requisição, escolha o método e digite a URL (ex.: `http://localhost:3000/heroes`).
3. Para `POST`, `PUT` e `PATCH`, abra a aba **Body**, marque **raw**, escolha **JSON** e cole o corpo da requisição.
4. Clique em **Send** e confira o status e a resposta.
5. Teste também os casos de erro, como um `id` que não existe, para ver os códigos `400` e `404`.

---

## 🔄 Como uma requisição percorre o código

Exemplo com `PATCH /heroes/1`:

1. **`server.js`**: o servidor está escutando a porta 3000 e recebe a requisição.
2. **`app.js`**: o `express.json()` transforma o JSON do body em um objeto, e o prefixo `/heroes` direciona para o arquivo de rotas.
3. **`heroes.routes.js`**: o método `PATCH` com o caminho `/:id` aponta para a função `partialUpdate`.
4. **`heroes.controllers.js`**: a função busca o herói pelo `id`, aplica só os campos enviados e responde.
5. **`Hero.js` + `database.js`**: o Sequelize traduz a operação para o banco SQLite.
6. A resposta volta pelo mesmo caminho até o Postman.

---

## ⚠️ Escopo e limitações

Por ser um projeto de aprendizagem, a aplicação cobre apenas o CRUD básico de `hero`. Ficaram **fora do escopo**:

- Consulta de um único herói por `id` (`GET /heroes/:id`)
- Validações mais rígidas dos dados (tipo e conteúdo dos campos)
- Tratamento centralizado de erros
- Autenticação e autorização
- Testes automatizados (os testes foram feitos manualmente pelo Postman)
- Endpoints para o model `Movie`. Ele e a relação muitos-para-muitos com `Hero` estão declarados no código, mas ainda não são usados por nenhuma rota.

Esses pontos podem ser trabalhados em evoluções futuras, conforme a orientação em sala de aula.

---

## 👤 Autor

**Arthur de Oliveira Souza**
Estudante de Engenharia de Software, Centro Universitário Geraldo Di Biase (UGB)
GitHub: [@Arthur-sz](https://github.com/Arthur-sz)
