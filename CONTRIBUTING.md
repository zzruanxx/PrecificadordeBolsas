# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o Gestor do Ateliê Lúcia! Este documento fornece diretrizes para contribuir com o projeto.

## 🎯 Como Posso Contribuir?

### Reportar Bugs

Se você encontrar um bug, por favor crie uma issue incluindo:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. comportamento atual
- Screenshots (se aplicável)
- Ambiente (navegador, sistema operacional)

### Sugerir Melhorias

Tem uma ideia para melhorar a aplicação? Crie uma issue descrevendo:

- O problema que sua sugestão resolve
- Como você imagina a solução
- Alternativas consideradas

### Contribuir com Código

1. **Fork o repositório**
2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/PrecificadordeBolsas.git
   ```

3. **Crie uma branch**
   ```bash
   git checkout -b feature/minha-feature
   ```

4. **Faça suas alterações**
   - Siga o guia de estilo
   - Adicione testes se aplicável
   - Atualize a documentação

5. **Commit suas mudanças**
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

6. **Push para seu fork**
   ```bash
   git push origin feature/minha-feature
   ```

7. **Abra um Pull Request**

## 📋 Guia de Estilo

### TypeScript/React

- Use TypeScript para todo código novo
- Componentes funcionais com hooks
- Props tipadas com interfaces/types
- Evite `any`, prefira tipos específicos

```typescript
// ✅ Bom
interface Props {
  name: string
  age: number
}

// ❌ Evitar
interface Props {
  data: any
}
```

### Componentes

- Um componente por arquivo
- Nomes em PascalCase
- Use client components (`'use client'`) apenas quando necessário

```typescript
// ✅ Bom
'use client'

interface ButtonProps {
  label: string
  onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
```

### Estilização

- Use Tailwind CSS para estilos
- Siga a paleta de cores do projeto
- Use as classes utilitárias do `cn()` para composição

```typescript
// ✅ Bom
<div className={cn(
  "rounded-lg border",
  isActive && "bg-[#3A5A40]"
)}>
```

### Commits

Siga o padrão Conventional Commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adicionar ou corrigir testes
- `chore:` atualização de build, dependências, etc

Exemplos:
```
feat: adiciona filtro de pesquisa no estoque
fix: corrige cálculo de margem de lucro
docs: atualiza README com instruções de instalação
```

## 🧪 Testes

Antes de submeter um PR:

1. **Verificar build**
   ```bash
   npm run build
   ```

2. **Executar linter**
   ```bash
   npm run lint
   ```

3. **Testar localmente**
   ```bash
   npm run dev
   ```

## 📁 Estrutura do Projeto

```
├── app/                    # Páginas Next.js (App Router)
│   ├── dashboard/         # Páginas do dashboard
│   ├── login/             # Autenticação
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Input, etc)
│   └── ...
├── lib/                  # Utilitários e configurações
│   ├── supabase.ts      # Cliente Supabase
│   └── utils.ts         # Funções auxiliares
└── public/              # Assets estáticos
```

## 🎨 Paleta de Cores

Mantenha consistência com a paleta existente:

```typescript
const colors = {
  background: '#FDFBF6',  // Creme quente
  primary: '#3A5A40',     // Verde esmeralda
  secondary: '#556B2F',   // Verde musgo
  accent: '#BC6C25',      // Terracota
  text: '#333333',        // Cinza escuro
}
```

## 🚀 Funcionalidades Sugeridas

Ideias para contribuir:

### Prioridade Alta
- [ ] Integração completa com Supabase (CRUD)
- [ ] Autenticação real (login/logout)
- [ ] Persistência de dados
- [ ] Validação de formulários

### Prioridade Média
- [ ] Exportação de fichas técnicas para PDF
- [ ] Gráficos de análise de lucro
- [ ] Histórico de alterações de preços
- [ ] Calculadora de impostos

### Prioridade Baixa
- [ ] Dark mode
- [ ] Tema personalizável
- [ ] Múltiplos idiomas
- [ ] App mobile (React Native)

## 📝 Documentação

Ao adicionar novas funcionalidades, atualize:

- README.md (se for feature importante)
- Comentários no código (para lógica complexa)
- DEPLOYMENT.md (se afetar deploy)
- Este arquivo (se afetar contribuições)

## 🐛 Debugging

### Logs úteis

```typescript
// Para desenvolvimento
console.log('Debug:', { variable })

// Remova antes de commitar
```

### Ferramentas

- **React DevTools**: Inspecionar componentes
- **Next.js DevTools**: Integrado no navegador
- **Supabase Studio**: Inspecionar banco de dados

## ❓ Dúvidas?

- Abra uma issue com a tag `question`
- Descreva sua dúvida claramente
- Inclua contexto relevante

## 📜 Código de Conduta

- Seja respeitoso e inclusivo
- Aceite feedback construtivo
- Foque no que é melhor para a comunidade
- Mantenha discussões profissionais

## 🎉 Reconhecimento

Contribuidores serão adicionados ao README.md!

---

Obrigado por contribuir! 💚
