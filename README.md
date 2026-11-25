# trilha. — Organizador de Estudos e Matérias

Aplicação web desenvolvida como projeto final da disciplina de **Desenvolvimento de Interfaces (2/2026)** no **Centro Universitário de Brasília (CEUB)**, ministrada pelo **Prof. Dr. Felipe Batista da Silva**.

O **trilha.** é uma plataforma de organização acadêmica voltada para estudantes gerenciarem suas disciplinas, metas diárias de foco, cronogramas de provas, revisões e estratégias de aprendizagem.

---

## Demonstração Online

- **GitHub Pages:** `https://Massaru20.github.io/trilha-projeto/`

---

## Passo a Passo da Construção do Projeto

1. **Prototipação de Interface (Figma):** Criação dos wireframes e telas de alta fidelidade definindo a navegação lateral fixa, hierarquia visual do dashboard, fluxos de cadastro de matérias/eventos e página de estratégias de estudo.
2. **Arquitetura e Estruturação Semântica (HTML5):** Separação das responsabilidades em arquivos independentes (`index.html`, `style.css` e `script.js`), utilizando tags semânticas (`<aside>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) e atributos ARIA para leitores de tela.
3. **Identidade Visual e Acessibilidade (CSS3 & WCAG):** Adaptação da paleta de cores do protótipo para atender aos critérios de contraste **WCAG AA/AAA**, estruturando o layout responsivo com **CSS Grid** e **Flexbox**.
4. **Interatividade e Gerenciamento de Estado (JavaScript Vanilla):** Implementação dinâmica de criação de matérias, acompanhamento de progresso por etapas, calendário mensal e anual (2026) com feriados nacionais, agenda de eventos e janelas modais acessíveis (suporte à tecla `Esc` e foco).

---

## Funcionalidades Implementadas

- **Visão Geral (Dashboard):** Exibição da meta diária de sessões, métricas de horas estudadas na semana, atividades concluídas no mês e dias seguidos de constância.
- **Gestão de Matérias:** Cards individuais com barra de progresso, dias da semana, professor responsável e modal para cadastro de novas disciplinas.
- **Pesquisa e Filtros Dinâmicos:** Barra de busca em tempo real (por matéria, professor ou tema) e abas de filtragem por dias da semana e progresso.
- **Trilha de Estudos por Matéria:** Visualização detalhada das etapas de cada disciplina com botão interativo para avançar e contabilizar atividades concluídas.
- **Calendário Mensal e Anual (2026):** Mini calendário na barra lateral e modal com os 12 meses de 2026 destacando feriados nacionais e pontos facultativos.
- **Agenda de Compromissos:** Cadastro de provas, aulas e revisões integrados aos dias do calendário.
- **Guia "Como Estudar":** Seção dedicada a hábitos de estudo (planejamento, recuperação ativa e revisão espaçada) e ciclo de sessão de foco.
- **Seção "Sobre Nós" e Carrossel Interativo:** Apresentação dos 4 pilares do projeto (*Propósito*, *Constância*, *Planejamento* e *Inclusão*) com controles de navegação, indicadores clicáveis, suporte às setas do teclado e cartões explicativos.
- **Painel de Acessibilidade (WCAG):** Alternância entre Modo Claro, Modo Escuro e Alto Contraste, além de redimensionamento de fonte (`-A`, `A`, `+A`) com preferências salvas no `localStorage`.
- **Configurações e Suporte:** Modais para ajuste de meta diária, duração das sessões, perguntas frequentes (FAQ), formulário funcional de contato com geração de protocolo, canais de atendimento e rodapé informativo.

---

## Planejamento das Próximas Versões (Roadmap v2.0)

Acompanhamento dos requisitos finais da disciplina:
- [x] Carrossel interativo de imagens e cartões explicativos na seção "Sobre nós".
- [x] Painel de Acessibilidade (alternância entre Modo Claro/Escuro/Alto Contraste e controle de tamanho de fonte `+A` / `-A`).
- [x] Abas de pesquisa e filtros dinâmicos de matérias.
- [x] Formulário funcional de envio de mensagens na seção de contato.
- [ ] Tela/Modal de Login ("Entrar com conta") para autenticação do estudante.

---

## Paleta de Cores e Análise de Contraste (WCAG)

As cores foram escolhidas combinando psicologia das cores (foco, clareza e energia) com legibilidade mínima exigida pela WCAG 2.1:

| Elemento / Função | Cor (Hex) | Contraste | Nível WCAG |
| :--- | :---: | :---: | :---: |
| **Primária (Terracota / Ação)** | `#C2380C` sobre `#FFFFFF` | **5.47:1** | AA / AAA (texto grande) |
| **Menu Lateral (Slate Profundo)** | `#F8FAFC` sobre `#0B131E` | **18.4:1** | AAA |
| **Texto Principal** | `#0F172A` sobre `#FFFFFF` | **17.9:1** | AAA |
| **Texto Secundário** | `#475569` sobre `#FFFFFF` | **7.5:1** | AAA |
| **Matéria — Matemática (Azul)** | `#1D4ED8` sobre `#FFFFFF` | **6.7:1** | AA / AAA |
| **Matéria — Biologia (Verde)** | `#047857` sobre `#FFFFFF` | **5.48:1** | AA / AAA |
| **Matéria — Redação (Roxo)** | `#6D28D9` sobre `#FFFFFF` | **7.05:1** | AAA |

---

## Estrutura de Pastas

```text
trilha-estudos/
├── index.html    # Estrutura semântica das telas e modais
├── style.css     # Estilização, variáveis CSS, responsividade e contraste WCAG
├── script.js     # Lógica de estado, calendário 2026, filtros e manipulação do DOM
└── README.md     # Documentação do projeto