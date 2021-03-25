//selectors

const tdInput = document.querySelector('.todoInput');
const tdButton = document.querySelector('.todoButton');
const tdList = document.querySelector('.todoList');

//event listeners

document.addEventListener('DOMContentLoaded', getFromStorage());
tdButton.addEventListener('click', addTodo);

tdList.addEventListener('click', deleteItem);
tdList.addEventListener('click', checked);
//functions

function addTodo(event){
    event.preventDefault();
    if (tdInput.value != "") {
    const tdDiv = document.createElement('div');
    tdDiv.classList.add("todo");
    
    const newTodo = document.createElement('li');
    newTodo.innerText = tdInput.value;
    
    newTodo.classList.add('tdItem');
    tdDiv.appendChild(newTodo);
    //save to local storage
    saveLocally(tdInput.value);
    //completed task button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completedButton');
    tdDiv.appendChild(completedButton);
    //to trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add('trashButton');
    tdDiv.appendChild(trashButton);

    tdList.appendChild(tdDiv);
    //clear input
    tdInput.value = "";
    }
   
    
}

function deleteItem(event){
    const item = event.target;
    if (item.classList[0] === 'trashButton') {
        const itemParent = item.parentElement;
        itemParent.classList.add('deletion');
        removeFromStorage(itemParent);
        itemParent.addEventListener('transitionend', function(){
            itemParent.remove();
        });
        
        
    }
}

function checked(event){
    const item = event.target;
    if (item.classList[0] === 'completedButton') {
        const itemParent = item.parentElement;
        itemParent.classList.toggle('completed');
    }
}

function saveLocally(todo){
    //is there something?
    let todos;
    if(localStorage.getItem('todos') ===null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromStorage(){
    console.log('loaded');
    let todos;
    //is there something?
    
    if(localStorage.getItem('todos') ===null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo){
    const tdDiv = document.createElement('div');
    tdDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    
    newTodo.classList.add('tdItem');
    tdDiv.appendChild(newTodo);
    //completed task button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completedButton');
    tdDiv.appendChild(completedButton);
    //to trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add('trashButton');
    tdDiv.appendChild(trashButton);

    tdList.appendChild(tdDiv);
    });
}

function removeFromStorage(todo){
    let todos;

    if(localStorage.getItem('todos') ===null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}