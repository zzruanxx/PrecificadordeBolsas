# 🚀 Guia de Implantação

Este guia explica como implantar o Gestor do Ateliê Lúcia em produção.

## Opção 1: Deploy na Vercel (Recomendado)

A Vercel é a plataforma dos criadores do Next.js e oferece o melhor suporte.

### Passos:

1. **Criar conta na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta do GitHub

2. **Importar o projeto**
   - Clique em "Add New Project"
   - Selecione este repositório
   - A Vercel detectará automaticamente que é um projeto Next.js

3. **Configurar variáveis de ambiente**
   - Antes de fazer o deploy, adicione as variáveis:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde alguns minutos
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

### Domínio Personalizado

- Na Vercel, vá em Settings > Domains
- Adicione seu domínio personalizado (ex: atelie-lucia.com.br)
- Configure os DNS conforme instruções

## Opção 2: Deploy na Netlify

### Passos:

1. **Criar conta na Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Faça login com GitHub

2. **Importar projeto**
   - Clique em "Add new site"
   - Escolha "Import an existing project"
   - Selecione o repositório

3. **Configurar build**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Variáveis de ambiente**
   - Em Site settings > Environment variables
   - Adicione as mesmas variáveis do Supabase

## Configuração do Supabase

### 1. Criar projeto

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Escolha nome, região e senha do banco

### 2. Criar tabelas

Execute no SQL Editor do Supabase:

```sql
-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de materiais
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de canais de venda
CREATE TABLE sales_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  fee_percent DECIMAL(5,2) DEFAULT 0,
  fixed_fee DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de configurações do ateliê
CREATE TABLE atelier_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  pro_labore DECIMAL(10,2) NOT NULL DEFAULT 3000,
  hours_per_month INTEGER NOT NULL DEFAULT 160,
  fixed_costs DECIMAL(10,2) NOT NULL DEFAULT 800,
  depreciation DECIMAL(10,2) NOT NULL DEFAULT 200,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de peças (fichas técnicas)
CREATE TABLE pieces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  materials JSONB NOT NULL,
  labor_hours DECIMAL(10,2) NOT NULL,
  packaging_cost DECIMAL(10,2) DEFAULT 0,
  profit_margin DECIMAL(5,2) DEFAULT 30,
  production_cost DECIMAL(10,2) NOT NULL,
  suggested_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS (Row Level Security) - Cada usuário vê apenas seus dados
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE atelier_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pieces ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Users can view own materials" ON materials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own materials" ON materials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own materials" ON materials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own materials" ON materials
  FOR DELETE USING (auth.uid() = user_id);

-- Repetir para outras tabelas
CREATE POLICY "Users can manage own channels" ON sales_channels
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own settings" ON atelier_settings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own pieces" ON pieces
  FOR ALL USING (auth.uid() = user_id);
```

### 3. Configurar autenticação

1. Em Authentication > Providers
2. Habilite "Email" provider
3. Configure email templates (opcional)
4. Para Google login, configure OAuth (opcional)

### 4. Obter credenciais

1. Vá em Settings > API
2. Copie:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Variáveis de Ambiente

Crie um arquivo `.env.local` (já ignorado pelo git):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-aqui

# Opcional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

⚠️ **NUNCA** commite o arquivo `.env.local` no Git!

## Monitoramento e Manutenção

### Logs
- **Vercel**: Acesse a aba "Logs" do projeto
- **Supabase**: Acesse "Database" > "Logs"

### Backups
- Configure backups automáticos no Supabase
- Em Settings > Database > Backups
- Recomendado: backup diário

### Performance
- Use o Vercel Analytics para monitorar performance
- Configure Supabase Edge Functions se necessário

## Custos Estimados

### Tier Gratuito (Até 10k visitas/mês)
- Vercel: Gratuito
- Supabase: Gratuito
- **Total: R$ 0/mês**

### Tier Pequeno Negócio (Até 100k visitas/mês)
- Vercel Pro: ~$20/mês
- Supabase Pro: ~$25/mês
- **Total: ~R$ 225/mês**

## Suporte

Em caso de dúvidas:
- Documentação Vercel: https://vercel.com/docs
- Documentação Supabase: https://supabase.com/docs
- Documentação Next.js: https://nextjs.org/docs

## Checklist de Deploy

- [ ] Código está no GitHub
- [ ] Projeto Supabase criado
- [ ] Tabelas criadas no banco
- [ ] RLS (Row Level Security) configurado
- [ ] Autenticação configurada
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Teste de login funcionando
- [ ] Teste de criação de dados funcionando
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL/HTTPS ativo (automático na Vercel)
- [ ] Analytics configurado (opcional)

---

✅ Após seguir este guia, seu Gestor do Ateliê Lúcia estará no ar!
