# Café Bugado – Plataforma de Talentos

Aplicação de cadastro de membros da comunidade Café Bugado. Uma landing page completa com formulário validado, modais de feedback e integração com Supabase.

## Stack

- React 19 + Vite 6
- TypeScript
- Tailwind CSS v4
- React Hook Form + Zod
- Supabase JS
- Lucide React
- Sonner (toasts)

## Funcionalidades

- Cadastro de membros com validação completa (Zod + React Hook Form)
- LinkedIn e GitHub obrigatórios
- Campos únicos no banco: nome, e-mail, LinkedIn e GitHub
- Modal de boas-vindas personalizado após cadastro
- Modal de perfil duplicado com contato via WhatsApp
- Validação em tempo real com mensagens de erro por campo
- Contador de caracteres no campo "Sobre"
- Máscara de telefone no campo WhatsApp
- Responsivo para mobile, tablet e desktop
- Scrollbar customizada na cor da marca

## Instalação

### 1. Clone e instale as dependências

```bash
git clone https://github.com/seu-usuario/cafe-bugado-talentos.git
cd cafe-bugado-talentos
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 3. Configure o banco de dados no Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Crie um novo projeto ou use um existente
3. Vá em **SQL Editor**
4. Execute os arquivos na ordem abaixo:

```
sql/schema.sql                              # Cria a tabela, trigger, RLS e índices
sql/migration_001_remove_profile_image.sql  # Remove coluna profile_image_url
sql/migration_002_unique_constraints.sql    # Adiciona constraints únicos
```

O schema irá:
- Criar a tabela `community_members`
- Configurar o trigger automático de `updated_at`
- Habilitar RLS com policies de INSERT público e SELECT autenticado
- Criar índices de performance
- Adicionar constraints únicos para nome, e-mail, LinkedIn e GitHub

### 4. Rode o projeto

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Verificar linting |

## Estrutura

```
src/
├── components/
│   ├── ui/           # Button, Input, Select, Textarea, FormField
│   │                 # DuplicateModal, WelcomeModal
│   ├── sections/     # Hero, Benefits, MemberForm
│   └── layout/       # Footer
├── pages/            # Home
├── lib/              # Cliente Supabase
├── hooks/            # useRegisterMember
├── services/         # memberService (insert + tratamento de erros)
├── schemas/          # memberSchema (Zod)
├── types/            # member.ts
├── constants/        # Áreas, níveis, estados BR
└── utils/            # Máscara de WhatsApp
sql/
├── schema.sql
├── migration_001_remove_profile_image.sql
└── migration_002_unique_constraints.sql
```

## Campos do formulário

| Campo | Obrigatório | Observação |
|---|---|---|
| Nome completo | Sim | Único no banco |
| E-mail | Sim | Único no banco |
| Cidade | Sim | — |
| Estado (UF) | Sim | — |
| Área de interesse | Sim | Select com 11 opções |
| Sobre você | Sim | Mín. 20 / máx. 600 caracteres |
| LinkedIn | Sim | URL válida, único no banco |
| GitHub | Sim | URL válida, único no banco |
| Portfólio | Não | URL válida |
| WhatsApp | Não | Formato BR com máscara |
| Cargo atual | Não | — |
| Nível de experiência | Não | Select |
| Disponibilidade | Não | Select |
| Aceitar termos | Sim | Obrigatório true |

## Segurança

- RLS habilitado no Supabase
- INSERT público permitido apenas para `anon`
- Leitura restrita a usuários autenticados
- Validação dupla: client (Zod) + banco (constraints únicos)
- Sem exposição de dados sensíveis no client

## Contato da comunidade

- Email: comunidade.cafebugado@gmail.com
- WhatsApp: +55 11 96188-9886
- Comunidade: [cafebugado.com.br/comunidade](https://cafebugado.com.br/comunidade)

## Deploy

Compatível com Vercel, Netlify ou qualquer CDN estático.

```bash
npm run build
# dist/ pronto para deploy
```
