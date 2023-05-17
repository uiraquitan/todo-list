const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputForm = document.querySelector('.input-task');

const fetchTask = async () => {
    const response = await fetch("http://localhost:3333/task");
    const tasks = await response.json();
    return tasks
}

const addTask = async (e) => {
    e.preventDefault();

    const task = { title: inputForm.value };

    await fetch("http://localhost:3333/task", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });

    inputForm.value = "";
    loadTask();
}

const formateDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

const createSelect = (value) => {
    const optons = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluido">concluído</option>
    `;

    const select = createElement('select', '', optons);
    select.value = value;
    return select;
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/task/${id}`, {
        method: 'DELETE'
    });

    loadTask();
}

const updateTask = async ({ id, title, status }) => {
    await fetch(`http://localhost:3333/task/${id}`, {
        method: 'put',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ id, title, status })
    });
    
    loadTask();
}
const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement("tr");
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formateDate(created_at));
    const tdStatus = createElement('td');
    const tdAction = createElement('td');
    const editButton = createElement('button', '', '<span class="material-symbols-outlined"> edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined"> delete</span>');

    const select = createSelect(status)
    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }))

    const editForm = createElement('form')
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateTask({ id, title: editInput.value, status });
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);

    tdAction.appendChild(editButton);
    tdAction.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAction);
    return tr;

}

const loadTask = async () => {

    const tasks = await fetchTask();
    tbody.innerHTML = '';
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);

    });
}

addForm.addEventListener('submit', addTask);

loadTask();
