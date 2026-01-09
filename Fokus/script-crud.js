const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnRemoverTarefa = document.querySelector('.app__form-footer__button--delete');
const btnCencelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const bnExcluirTodasTarefas = document.querySelector('#btn-remover-todas');
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaEmEdicao = null;
let paragrafoEmEdicao = null;

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;
    
    svg.onclick = () => {
        svg.classList.toggle('app__section-task-list-item-complete');
        li.classList.toggle('app__section-task-list-item-complete');
        tarefa.concluida = li.classList.contains('app__section-task-list-item-complete');
        atualizarTarefas();
    };

    const p = document.createElement('p');
    p.textContent = tarefa.descricao;
    p.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        textarea.value = tarefa.descricao;
        formAdicionarTarefa.classList.remove('hidden');
        tarefaEmEdicao = tarefa;
        paragrafoEmEdicao = p;
    };

    const imgEditar = document.createElement('img');
    imgEditar.src = './imagens/edit.png';
    botao.append(imgEditar);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('app_button-edit');

    const imgExcluir = document.createElement('img');
    imgExcluir.src = './imagens/trash.svg';
    botaoExcluir.append(imgExcluir);

    botaoExcluir.onclick = () => {
        li.remove();
        let i = tarefas.indexOf(tarefa);
        if (i > -1) tarefas.splice(i, 1);
        atualizarTarefas();
    };

  
    btnRemoverTarefa.onclick = () => {
        li.remove();
        let i = tarefas.indexOf(tarefa);
        if (i > -1) tarefas.splice(i, 1);
        formAdicionarTarefa.classList.toggle('hidden');
        atualizarTarefas();
    };

    li.append(svg, p, botao, botaoExcluir);

    li.onclick = () => {
        const jaAtiva = li.classList.contains('app__section-task-list-item-active');

        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(e => e.classList.remove('app__section-task-list-item-active'));

        if (jaAtiva) {
            paragrafoDescricaoTarefa.textContent = '';
            return;
        }

        li.classList.add('app__section-task-list-item-active');
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
    };

    return li;
}


btnCencelarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.add('hidden');
    tarefaEmEdicao = null;
    paragrafoEmEdicao = null;
    textarea.value = '';
});

bnExcluirTodasTarefas.onclick = () => {
    localStorage.removeItem('tarefas');
    tarefas.length = 0;
    ulTarefas.innerHTML = '';
    paragrafoDescricaoTarefa.textContent = '';
};

btnRemoverConcluidas.onclick = () => {
    tarefas = tarefas.filter(t => !t.concluida);
    ulTarefas.innerHTML = '';
    tarefas.forEach(t => ulTarefas.append(criarElementoTarefa(t)));
    atualizarTarefas();
    paragrafoDescricaoTarefa.textContent = '';
};

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
    tarefaEmEdicao = null;
    paragrafoEmEdicao = null;
    textarea.value = '';
});

formAdicionarTarefa.addEventListener('submit', e => {
    e.preventDefault();
    if (tarefaEmEdicao) {
        tarefaEmEdicao.descricao = textarea.value;
        paragrafoEmEdicao.textContent = textarea.value;
    } else {
        const tarefa = {
            descricao: textarea.value,
            concluida: false
        };
        tarefas.push(tarefa);
        ulTarefas.append(criarElementoTarefa(tarefa));
    }
    atualizarTarefas();
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
    tarefaEmEdicao = null;
    paragrafoEmEdicao = null;
});

// Inicialização
tarefas.forEach(t => ulTarefas.append(criarElementoTarefa(t)));