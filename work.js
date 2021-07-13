//Selectors
const input = document.querySelector('.todoInput');
const addButton = document.querySelector('.addButton');
const todoList = document.querySelector('.todoList');
const todoItem = document.querySelector('.todo');
const status = document.querySelector('.status');
const clearButton = document.querySelector('.clearButton');
const typeOfTodo = document.querySelector('select');

// Event Listeners
addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
clearButton.addEventListener('click', clearTodo);
typeOfTodo.addEventListener('change', filterTodo);

//hover effect
addButton.addEventListener('mouseover', function() {
	addButton.firstElementChild.style.color = 'rgb(142, 73, 233)';
	addButton.style.backgroundColor = 'white';
	addButton.style.border = '1px solid rgb(142, 73, 233)';
});

addButton.addEventListener('mouseout', function() {
	addButton.firstElementChild.style.color = 'white';
	addButton.style.backgroundColor = 'rgb(142, 73, 233)';
	addButton.style.border = 'none';
});

// Functions
function addTodo(event) {
	event.preventDefault();

	if(input.value) {
		const list = document.querySelector('.todoList');

		const todo = document.createElement('div');
		todo.classList.add('todo');

		const p = document.createElement('p');
		p.innerText = input.value;
		p.classList.add('todoItem');
		todo.appendChild(p);

		const completeButton = document.createElement('button');
		completeButton.innerHTML = '<i class="fas fa-check"></i>';
		completeButton.classList.add('completeButton');
		todo.appendChild(completeButton);

		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add('deleteButton');
		todo.appendChild(trashButton);

		list.appendChild(todo);

		//reset the input field
		input.value = "";

		statusCheck();
	} 

	else {
		alert('Add Todo thing before clicking the button');
	}
	
}

function deleteAndCheck(e) {
	const item = e.target;

	if(item.classList.contains('deleteButton')) {
		item.parentElement.classList.add('removeTodo');
		item.parentElement.addEventListener('transitionend', function() {
			item.parentElement.remove();
			statusCheck();
		});
	}

	if(item.classList.contains('completeButton')) {
		item.parentElement.classList.toggle('workDone');
		statusCheck();
	}
}

function clearTodo() {
	todoList.innerText = '';
	statusCheck();
}

function statusCheck() {
	status.parentElement.style.display = 'flex';
	status.parentElement.style.justifyContent = 'space-around';
	const completed =document.querySelectorAll('.workDone').length;
	const task = ((todoList.childElementCount - completed) > 1) ? 'tasks' : 'task';

	status.innerText = `You have ${todoList.childElementCount - completed} pending ${task}`;
}

function filterTodo() {
	const type = typeOfTodo.value;
	const todos = document.querySelectorAll('.todo');

	todos.forEach(function(todo) {

		switch(type) {

			case 'all':
				todo.style.display = 'flex';
				break;

			case 'completed':
				if (todo.classList.contains('workDone')){
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;

			case 'uncompleted':
				if (!todo.classList.contains('workDone')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}

	});

	
}