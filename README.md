# Controle de Gastos Pessoais

Projeto simples de controle financeiro desenvolvido com **HTML, CSS e JavaScript puro**.

O objetivo é praticar fundamentos de desenvolvimento front-end e criar um projeto de portfólio para GitHub.

## ✨ Funcionalidades

### Básicas
- ✅ Adicionar receitas
- ✅ Adicionar despesas
- ✅ Calcular saldo automaticamente
- ✅ Exibir total de receitas e despesas
- ✅ Excluir movimentações
- ✅ Limpar todos os registros
- ✅ Armazenar dados no navegador com `localStorage`
- ✅ Layout responsivo para computador e celular

### Novas (v2.0) 🎉
- ✅ **Categorias de gastos** - Selecione categorias pré-definidas para cada transação
- ✅ **Edição de movimentações** - Altere dados de transações existentes
- ✅ **Filtro por mês** - Filtre transações por período
- ✅ **Modo escuro** - Toggle entre tema claro e escuro
- ✅ **Confirmação antes de deletar** - Evite exclusões acidentais
- ✅ **Validações aprimoradas** - Mensagens de erro específicas
- ✅ **Notificações** - Feedback visual de cada ação

## 🛠️ Tecnologias

- HTML5
- CSS3 (com suporte a dark mode)
- JavaScript Vanilla
- LocalStorage API

## 🚀 Como executar

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` no navegador
3. Comece a cadastrar receitas e despesas

Não é necessário instalar nenhuma dependência.

## 📁 Estrutura

```
controle-gastos/
├── index.html          # Estrutura HTML
├── style.css           # Estilos (light/dark mode)
├── script.js           # Lógica da aplicação
├── MELHORIAS.md        # Changelog detalhado
├── .gitignore
└── README.md
```

## 📚 O que pratiquei neste projeto

### Conceitos Básicos
- Manipulação do DOM
- Eventos em JavaScript
- Arrays e objetos
- Funções
- `filter`, `reduce` e `sort`
- Formatação de moeda e datas
- Persistência de dados com LocalStorage
- Responsividade com CSS

### Conceitos Avançados (v2.0)
- Estado centralizado e gerenciamento
- Validações robustas de entrada
- Modal e confirmação do usuário
- Tema dinâmico (dark/light mode)
- Organização de código com comentários
- Acessibilidade (aria-labels, semântica)
- Notificações e feedback visual
- Filtros e manipulação de dados

## 🎯 Funcionalidades Detalhadas

### Categorias
**Receitas**: Salário, Freelancer, Investimentos, Bônus, Outro
**Despesas**: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Compras, Contas, Outro

### Filtro por Mês
- Filtra automaticamente receitas, despesas e saldo
- Por padrão, mostra o mês atual
- Botão para limpar filtro e ver todas as transações

### Modo Escuro
- Clique no ícone 🌙 para alternar tema
- Preferência salva no navegador
- Cores otimizadas para cada modo

### Edição
- Clique no ícone ✎ para editar qualquer transação
- Formulário é populado com os dados
- Clique em "Salvar alterações" ou "Cancelar edição"

## 📱 Responsividade

- **Desktop**: Layout com 2 colunas (formulário + histórico)
- **Tablet**: Layout adaptativo
- **Mobile**: Layout em coluna única, totalmente funcional

## 🔐 Dados

- Todos os dados são salvos localmente no navegador
- Nenhum dado é enviado para servidor
- Funciona completamente offline
- Dados persistem entre sessões

## 🎓 Aprendizados

Este projeto é excelente para aprender:
- Como organizar código JavaScript
- Boas práticas de UX/UI
- Manipulação avançada do DOM
- Padrões de estado e validação
- Acessibilidade web
- Design responsivo
- CSS variables e temas

## 📈 Próximos Passos (Roadmap)

- [ ] Gráficos com Chart.js
- [ ] Exportação para CSV/PDF
- [ ] Busca de transações
- [ ] Agrupamento por categoria
- [ ] Relatórios mensais detalhados
- [ ] Backend com Node.js + MongoDB
- [ ] Autenticação de usuários
- [ ] Sincronização em nuvem
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

## 💡 Dicas de Uso

1. **Primeiro acesso**: O filtro abre no mês atual por padrão
2. **Edição**: Clique no ícone ✎ para modificar qualquer transação
3. **Segurança**: Confirmações impedem exclusões acidentais
4. **Tema**: Sua preferência de tema é salva
5. **Dados**: Tudo é salvo automaticamente no navegador

## 🤝 Contribuições

Este é um projeto de portfólio e aprendizado. Sinta-se livre para:
- Fazer um fork
- Sugerir melhorias
- Reportar bugs
- Compartilhar ideias

## 👤 Autor

**>jh__rocha** - José Henrique Rocha

Projeto desenvolvido para estudo e portfólio em desenvolvimento de software.

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript puro**
