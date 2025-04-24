# FocusFlow: API & Frontend 🧘‍♀️☀️/🌙

Este repositório contém tanto a **FocusFlow API** (uma API Node.js/Express) quanto o **FocusFlow Frontend** (uma aplicação web Vanilla JS) desenvolvidos para auxiliar na manutenção do foco e produtividade.

**Acesse a Aplicação Online:** ✨ [**FocusFlow Dashboard no GitHub Pages**](https://thauan0.github.io/FocusFlowAPI/) ✨

## Visão Geral do Projeto

O objetivo foi criar uma ferramenta útil e agradável para combater a distração e gerenciar tarefas diárias, utilizando:

1.  Uma **API RESTful** que fornece recursos como citações motivacionais, técnicas de foco e sugestões de pausa.
2.  Um **Frontend Interativo** que consome essa API, apresenta os dados dinamicamente, oferece uma To-Do List funcional e permite alternar entre temas claro e escuro.

---

## 1. FocusFlow API (Backend)

API simples desenvolvida em Node.js e Express para fornecer os recursos de apoio ao foco.

### API Online

A API está hospedada no Render e pode ser acessada (embora geralmente seja consumida pelo frontend) em:
*   **URL Base:** `https://focusflowapi.onrender.com`

### Funcionalidades (Endpoints)

A API oferece os seguintes endpoints GET públicos (prefixados com `/api`):

*   **`GET /api/quote`**
    *   **Descrição:** Retorna um objeto JSON contendo uma citação motivacional aleatória.
    *   **Exemplo de Resposta:**
        ```json
        {
            "id": 15,
            "text": "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
            "author": "Robert Collier"
        }
        ```

*   **`GET /api/technique`**
    *   **Descrição:** Retorna um objeto JSON contendo uma técnica de foco ou produtividade aleatória.
    *   **Exemplo de Resposta:**
        ```json
        {
            "id": 17,
            "name": "Getting Things Done (GTD) - Captura",
            "description": "Tenha um sistema confiável (app, caderno) para capturar *imediatamente* todas as ideias, tarefas e lembretes que surgem, liberando sua mente."
        }
        ```

*   **`GET /api/break`**
    *   **Descrição:** Retorna um objeto JSON contendo uma sugestão de pausa aleatória.
    *   **Exemplo de Resposta:**
        ```json
        {
            "id": 16,
            "suggestion": "Leia uma página de um livro não relacionado ao trabalho.",
            "duration_minutes": 4
        }
        ```

*   **`GET /api/pomodoro/default`**
    *   **Descrição:** Retorna um objeto JSON com os parâmetros de tempo padrão recomendados para a Técnica Pomodoro.
    *   **Exemplo de Resposta:**
        ```json
        {
            "work_minutes": 25,
            "short_break_minutes": 5,
            "long_break_minutes": 15,
            "cycles_before_long_break": 4
        }
        ```

### Tecnologias Utilizadas (API)

*   **Node.js:** Ambiente de execução JavaScript no servidor.
*   **Express.js:** Framework web para Node.js.
*   **Cors:** Middleware para habilitar o Cross-Origin Resource Sharing.

### Como Executar a API Localmente

1.  **Pré-requisitos:** Node.js (v18.x ou superior recomendado) e npm instalados.
2.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Thauan0/FocusFlowAPI.git
    cd FocusFlowAPI
    ```
3.  **Instale as Dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o Servidor (Desenvolvimento):**
    ```bash
    npm run dev
    ```
    (A API rodará em `http://localhost:3000`)

---

## 2. FocusFlow Frontend

Interface web construída com HTML, CSS e JavaScript puro (Vanilla JS) que consome a FocusFlow API. Os arquivos do frontend residem na pasta `/docs` deste repositório para permitir o deploy via GitHub Pages.

### Frontend Online

*   **URL:** [https://thauan0.github.io/FocusFlowAPI/](https://thauan0.github.io/FocusFlowAPI/)

### Funcionalidades (Frontend)

*   **Integração com API:** Busca e exibe dados (citações, técnicas, pausas) da API online no Render.
*   **To-Do List:** Permite adicionar, marcar como concluída/incompleta e remover tarefas.
*   **Persistência Local:** Salva as tarefas e a preferência de tema no `localStorage` do navegador.
*   **Tema Claro/Escuro:** Botão para alternar entre os modos de visualização.
*   **Animações:** Usa GSAP para transições suaves na interface.

### Tecnologias Utilizadas (Frontend)

*   **HTML5**
*   **CSS3** (com Variáveis CSS para temas)
*   **JavaScript (Vanilla JS - ES6+)** (Fetch API, DOM, LocalStorage)
*   **GSAP (GreenSock Animation Platform):** Biblioteca de animação.

### Como Executar o Frontend Localmente

1.  **Pré-requisitos:** Um navegador web moderno.
2.  **Clone o Repositório** (se ainda não o fez):
    ```bash
    git clone https://github.com/Thauan0/FocusFlowAPI.git
    cd FocusFlowAPI
    ```
3.  **Abra o Arquivo HTML:**
    *   Navegue até a pasta `/docs`.
    *   Abra o arquivo `index.html` diretamente no seu navegador.
    *   *(Opcional: Use a extensão "Live Server" no VS Code para melhor experiência).*
4.  **Nota:** A versão local usará a API online hospedada no Render por padrão (conforme configurado no `script.js`). Para usar a API localmente, você precisaria iniciar o servidor da API (passos da seção API) e alterar a constante `API_BASE_URL` em `docs/script.js` para `http://localhost:3000/api`.

---

## Estrutura do Projeto 📂

FocusFlowAPI/
├── docs/ # Código do Frontend (para GitHub Pages)
│ ├── index.html
│ ├── script.js
│ └── style.css
├── src/ # Código da API (Backend)
│ ├── controllers/
│ ├── data/
│ ├── routes/
│ ├── utils/
│ ├── app.js
│ └── server.js
├── .gitignore
├── package.json # Dependências e scripts da API
├── package-lock.json
└── README.md 



## Autor ✒️

*   **Thauan** - [GitHub: Thauan0](https://github.com/Thauan0)
    *   *www.linkedin.com/in/thauan-carneiro-0428th*
