const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

const todoList = JSON.parse(localStorage.getItem('notes'));

if (todoList) {
    todoList.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    addTodo();

})

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }


    if (todoText) {
        const todoEl = document.createElement('li');

        todoEl.innerText = todoText;
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updatLS();
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updatLS();

        })

        todos.appendChild(todoEl);
        input.value = "";

        updatLS();
    }
}

function updatLS() {
    const notesEL = document.querySelectorAll('li')

    const notes = [];

    notesEL.forEach(noteEL => {
        notes.push({
            text: noteEL.innerText,
            completed: noteEL.classList.contains('completed')
        })
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}