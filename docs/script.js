// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Selecionar Elementos do DOM ---
    const apiDisplayBox = document.getElementById('api-display');
    const quoteBtn = document.getElementById('get-quote-btn');
    const techniqueBtn = document.getElementById('get-technique-btn');
    const breakBtn = document.getElementById('get-break-btn');
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoListBody = document.getElementById('todo-list-body');
    // *** NOVO: Seleciona o botão de tema ***
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // --- Lógica do Seletor de Tema ---
    // Verifica se themeToggleBtn foi encontrado antes de prosseguir
    if (themeToggleBtn) {
        const currentTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Função para aplicar o tema
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggleBtn.innerHTML = '☀️ Modo Claro'; // Atualiza texto/ícone
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                themeToggleBtn.innerHTML = '🌙 Modo Escuro'; // Atualiza texto/ícone
                localStorage.setItem('theme', 'light');
            }
        }

        // Aplica tema inicial
        if (currentTheme) {
            applyTheme(currentTheme);
        } else if (prefersDark) {
             applyTheme('dark');
        } else {
            applyTheme('light'); // Default to light if no preference found
        }

        // Listener para o botão de tema
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
        });

    } else {
        console.error("Botão theme-toggle-btn não encontrado! Funcionalidade de tema desabilitada.");
    }


    // --- Restante do código (Verificações, API, To-Do) ---
    if (!todoForm || !todoInput || !todoListBody) {
        console.error("ERRO CRÍTICO: Elementos essenciais do To-Do (form, input ou list body) não encontrados!");
        // Considerar desabilitar a funcionalidade to-do se elementos faltam
        if(todoForm) todoForm.style.display = 'none'; // Exemplo: esconde o form
        return; // Interrompe parte do script, mas o tema pode já ter carregado
    }

    const API_BASE_URL = 'http://localhost:3000/api';

    async function fetchData(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao buscar dados de ${endpoint}:`, error);
            return { error: `Não foi possível carregar dados de ${endpoint}. Verifique se a API está rodando.` };
        }
    }

    function updateApiDisplay(content) {
         let displayText = '';
        if (typeof content === 'object' && content !== null) {
            if (content.error) {
                 displayText = `<span style="color: #e74c3c;">${content.error}</span>`;
            } else if (content.text && content.author) {
                displayText = `"${content.text}" - ${content.author}`;
            } else if (content.name && content.description) {
                displayText = `<strong>${content.name}:</strong> ${content.description}`;
            } else if (content.activity && content.duration_minutes) {
                 displayText = `<strong>Pausa:</strong> ${content.activity} (${content.duration_minutes} min)`;
            } else {
                 displayText = `<pre>${JSON.stringify(content, null, 2)}</pre>`;
            }
        } else if (typeof content === 'string') {
            displayText = content;
        } else {
            displayText = 'Conteúdo inválido recebido.';
        }
        if(apiDisplayBox) {
            apiDisplayBox.innerHTML = displayText;
            gsap.fromTo(apiDisplayBox, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else { console.error("Elemento apiDisplayBox não encontrado!"); }
    }

    if (quoteBtn) { quoteBtn.addEventListener('click', async () => { const data = await fetchData('/quote'); updateApiDisplay(data); }); } else { console.error("Botão quoteBtn não encontrado!"); }
    if (techniqueBtn) { techniqueBtn.addEventListener('click', async () => { const data = await fetchData('/technique'); updateApiDisplay(data); }); } else { console.error("Botão techniqueBtn não encontrado!"); }
    if (breakBtn) { breakBtn.addEventListener('click', async () => { const data = await fetchData('/break'); updateApiDisplay(data); }); } else { console.error("Botão breakBtn não encontrado!"); }

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    function saveTodos() { localStorage.setItem('todos', JSON.stringify(todos)); }

    function renderTodoList() {
        if (!todoListBody) { console.error("renderTodoList: todoListBody não encontrado!"); return; }
        todoListBody.innerHTML = '';
        if (todos.length === 0) {
            todoListBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--todo-completed-text);">Nenhuma tarefa por enquanto!</td></tr>'; // Usa variável de cor
            return;
        }
        let rowsToAnimate = [];
        todos.forEach(todo => {
            try {
                const tr = document.createElement('tr');
                tr.dataset.id = todo.id;
                if (todo.completed) { tr.classList.add('completed'); }
                const tdStatus = document.createElement('td');
                const completeBtn = document.createElement('button');
                completeBtn.classList.add('complete-btn');
                completeBtn.innerHTML = todo.completed ? '✔️' : '⚪';
                tdStatus.appendChild(completeBtn);
                const tdTask = document.createElement('td');
                tdTask.textContent = todo.text;
                const tdActions = document.createElement('td');
                tdActions.classList.add('actions');
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.innerHTML = '🗑️';
                tdActions.appendChild(deleteBtn);
                tr.appendChild(tdStatus); tr.appendChild(tdTask); tr.appendChild(tdActions);
                todoListBody.appendChild(tr);
                rowsToAnimate.push(tr);
            } catch (error) { console.error(`ERRO ao renderizar tarefa (ID ${todo.id}):`, error); }
        });
        if (rowsToAnimate.length > 0) {
             gsap.fromTo(rowsToAnimate, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power1.out' });
        }
    }

    function addTodo(taskText) { if (!taskText) return; const newTask = { id: Date.now(), text: taskText, completed: false }; todos.push(newTask); saveTodos(); renderTodoList(); }
    function toggleComplete(id) { todos = todos.map(todo => { if (todo.id === id) { return { ...todo, completed: !todo.completed }; } return todo; }); saveTodos(); renderTodoList(); }
    function deleteTodo(id) {
         if (!todoListBody) { console.error("deleteTodo: todoListBody não encontrado!"); return; }
        const rowToDelete = todoListBody.querySelector(`tr[data-id="${id}"]`);
        if (rowToDelete) {
            gsap.to(rowToDelete, { opacity: 0, x: 50, duration: 0.3, ease: 'power1.in', onComplete: () => { todos = todos.filter(todo => todo.id !== id); saveTodos(); renderTodoList(); } });
        } else { console.warn(`deleteTodo: Linha com ID ${id} não encontrada.`); todos = todos.filter(todo => todo.id !== id); saveTodos(); renderTodoList(); }
    }

    if (todoForm) {
        todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (todoInput) {
                const taskText = todoInput.value.trim();
                if (taskText) { addTodo(taskText); todoInput.value = ''; todoInput.focus(); }
            } else { console.error("Elemento todoInput não encontrado!"); }
        });
    } else { console.error("Elemento todoForm não encontrado!"); }

    if (todoListBody) {
        todoListBody.addEventListener('click', (event) => {
            const target = event.target; const parentRow = target.closest('tr');
            if (!parentRow || !parentRow.dataset.id) return;
            const todoId = Number(parentRow.dataset.id); if (isNaN(todoId)) { console.error("ID inválido:", parentRow.dataset.id); return; }
            if (target.classList.contains('complete-btn')) { toggleComplete(todoId); }
            else if (target.classList.contains('delete-btn')) { deleteTodo(todoId); }
        });
    } else { console.error("Elemento todoListBody não encontrado!"); }

    renderTodoList();
    console.log("FocusFlow Dashboard Pronto. GSAP:", typeof gsap !== 'undefined' ? 'disponível' : 'NÃO disponível');

}); // Fim do listener DOMContentLoaded