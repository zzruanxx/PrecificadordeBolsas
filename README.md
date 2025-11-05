# 🎨 Gestor do Ateliê Lúcia

Uma aplicação web profissional e multi-página projetada para ser a ferramenta central de gestão financeira de uma artesã. Esta ferramenta elimina a complexidade da precificação, permitindo que a usuária mova-se de "adivinhação" para "precisão" em seus cálculos.

## ✨ Características Principais

### 📊 Dashboard Intuitivo
- Visão geral com KPIs importantes (peças calculadas, materiais em estoque, lucro médio)
- Alertas de estoque baixo
- Ações rápidas para navegação eficiente

### 🧮 Calculadora de Preços Avançada
- **Ficha Técnica Completa**: Nome da peça, materiais, tempo de trabalho, embalagem
- **Análise de Preço em Tempo Real**: Cálculo automático de:
  - Custo de materiais
  - Custo de mão de obra (baseado no valor/hora configurado)
  - Custos fixos proporcionais
  - Margem de lucro personalizável
- **Simulador Multi-Canal**: Preços ajustados para diferentes plataformas:
  - Venda Direta (sem taxas)
  - Instagram (sem taxas)
  - Elo7 (18% + R$ 0,40)
  - Mercado Livre (15%)

### 📦 Gestão de Estoque
- Cadastro de materiais com preço de custo e unidade
- Controle de quantidade em estoque
- Alertas visuais para materiais com estoque baixo
- Interface tabular para fácil visualização

### 🏷️ Gerenciamento de Canais de Venda
- Configuração de taxas por plataforma
- Taxa percentual e taxa fixa por transação
- Utilizado automaticamente no simulador de preços

### ⚙️ Configurações do Ateliê
- **Pró-labore mensal**: Quanto você deseja ganhar
- **Horas trabalhadas**: Média mensal de dedicação
- **Custos fixos**: Aluguel, luz, internet, etc.
- **Depreciação**: Equipamentos e ferramentas
- **Cálculo automático**: Valor da hora de trabalho

### 📝 Minhas Peças
- Catálogo de fichas técnicas salvas
- Visualização rápida de custo de produção e preço sugerido
- Edição e exclusão de peças

## 🎨 Design e Identidade Visual

### Paleta de Cores
- **Background**: `#FDFBF6` (creme quente e orgânico)
- **Primária**: `#3A5A40` (verde esmeralda elegante)
- **Secundária**: `#556B2F` (verde musgo)
- **Acento**: `#BC6C25` (terracota dourado)
- **Texto**: `#333333` (cinza escuro morno)

### Tipografia
- **Títulos**: Playfair Display (serif) - elegância artesanal
- **Corpo**: Inter (sans-serif) - legibilidade moderna

### UI/UX
- Cards com sombras suaves e cantos arredondados
- Inputs limpos com bordas sutis que destacam ao focar
- Sidebar de navegação fixa com ícones intuitivos
- Design responsivo e profissional

## 🚀 Stack Tecnológica

- **Framework**: Next.js 16 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Gerenciamento de Estado**: 
  - React Query (TanStack Query) para dados do servidor
  - Zustand para estado global da UI
- **Backend**: Supabase (configurado, aguardando credenciais)
- **Ícones**: Lucide React
- **Gráficos**: Recharts (pronto para visualizações)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🔧 Configuração do Supabase

Para habilitar a persistência de dados:

1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie as credenciais do projeto
3. Configure as variáveis de ambiente:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

### Schema do Banco de Dados (Sugestão)

```sql
-- Tabela de materiais
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de canais de venda
CREATE TABLE sales_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  fee_percent DECIMAL(5,2) DEFAULT 0,
  fixed_fee DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de configurações do ateliê
CREATE TABLE atelier_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  pro_labore DECIMAL(10,2) NOT NULL,
  hours_per_month INTEGER NOT NULL,
  fixed_costs DECIMAL(10,2) NOT NULL,
  depreciation DECIMAL(10,2) NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de peças (fichas técnicas)
CREATE TABLE pieces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  materials JSONB NOT NULL,
  labor_hours DECIMAL(10,2) NOT NULL,
  packaging_cost DECIMAL(10,2) DEFAULT 0,
  profit_margin DECIMAL(5,2) DEFAULT 30,
  production_cost DECIMAL(10,2) NOT NULL,
  suggested_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📂 Estrutura do Projeto

```
├── app/
│   ├── dashboard/          # Páginas do dashboard
│   │   ├── calculator/     # Calculadora de preços
│   │   ├── channels/       # Canais de venda
│   │   ├── inventory/      # Estoque
│   │   ├── pieces/         # Minhas peças
│   │   ├── settings/       # Configurações
│   │   ├── layout.tsx      # Layout do dashboard
│   │   └── page.tsx        # Dashboard home
│   ├── login/              # Página de login
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Redirecionamento para login
│   ├── providers.tsx       # React Query Provider
│   └── globals.css         # Estilos globais
├── components/
│   ├── ui/                 # Componentes reutilizáveis
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── header.tsx          # Header do dashboard
│   └── sidebar.tsx         # Sidebar de navegação
├── lib/
│   ├── supabase.ts         # Cliente Supabase
│   └── utils.ts            # Funções utilitárias
└── public/                 # Assets estáticos
```

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de autenticação (UI pronta)
- ✅ Dashboard com KPIs
- ✅ Calculadora de preços com simulador multi-canal
- ✅ Gestão de estoque com alertas
- ✅ Configuração de canais de venda
- ✅ Configurações do ateliê
- ✅ Catálogo de peças salvas
- ✅ Design responsivo e acessível
- ✅ Navegação por sidebar
- ✅ Cálculos em tempo real

## 🔜 Próximos Passos (Para Produção)

- [ ] Integrar autenticação real com Supabase Auth
- [ ] Implementar CRUD de materiais com persistência
- [ ] Implementar CRUD de canais de venda
- [ ] Salvar e carregar fichas técnicas do banco
- [ ] Persistir configurações do ateliê
- [ ] Adicionar validação de formulários
- [ ] Implementar filtros e busca
- [ ] Adicionar gráficos e relatórios
- [ ] Exportação de dados (PDF, Excel)
- [ ] Deploy na Vercel/Netlify

## 📱 Páginas do Sistema

1. **Login** - Autenticação da usuária
2. **Dashboard** - Visão geral do negócio
3. **Calculadora** - Precificação de peças
4. **Minhas Peças** - Catálogo de fichas técnicas
5. **Estoque** - Gestão de materiais
6. **Canais de Venda** - Configuração de plataformas
7. **Configurações** - Custos base do ateliê

## 🤝 Contribuindo

Este projeto foi desenvolvido como uma ferramenta especializada para artesãs. Contribuições são bem-vindas!

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

Desenvolvido com 💚 para artesãs que buscam profissionalizar sua gestão financeira.
