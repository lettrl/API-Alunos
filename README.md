## Exercício de Fixação — Ordenação, Contagem, Busca por Id, Atualização e Remoção

Este projeto evolui a API de Alunos com os seguintes recursos:

### GET /alunos
Lista paginada de alunos, agora com suporte a ordenação e contagem total.
- Query params: `page`, `pageSize`, `orderBy` (campo, padrão `id`), `order` (`asc` ou `desc`, padrão `asc`)
- Resposta: `{ "alunos": [...], "total": N }`

### GET /alunos/:id
Busca um único aluno pelo id.
- Retorna `200` com o aluno, ou `404` (`AlunoNaoEncontradoError`) se não existir.

### PUT /alunos/:id
Atualiza nome e/ou email de um aluno.
- `404` se o aluno não existir.
- `400` se nenhum campo válido for enviado, ou se o email já pertencer a outro aluno.

### DELETE /alunos/:id
Remove um aluno.
- `204` em caso de sucesso (sem corpo na resposta).
- `404` se o aluno não existir.

### Tratamento de erros
Todas as rotas seguem o padrão do projeto: o Service lança exceções personalizadas (`AlunoInvalidoError`, `AlunoNaoEncontradoError`), estendendo `ApiError`; o Controller captura com `try...catch` e responde com `error.statusCode` e `error.message`.