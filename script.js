/*******************************************************************************************
This ToDo app can save the data at browser's local storage and get the data from there also. 
********************************************************************************************/

//below function for getting data from input field.
const getElementsFromInputField = (id) => {
    const getInputField = document.getElementById(id);
    const getInputFieldValue = getInputField.value;
    getInputField.value = '';
    return getInputFieldValue;
};

//below function for save the data at local storage.
const setValueAtLocalStorage = () => {
    const inputText = getElementsFromInputField('todo-text');

    if(inputText != ''){
        const getValueFromLocalStorage = JSON.parse(localStorage.getItem('ToDoos'));
        const ToDoItem = JSON.stringify({title: inputText});
    
        if(!getValueFromLocalStorage){
            const ToDoItem = [{title: inputText}];
            localStorage.setItem('ToDoos', JSON.stringify(ToDoItem))
        }else{
            const ToDoItem = [...getValueFromLocalStorage, {title: inputText}];
            localStorage.setItem('ToDoos', JSON.stringify(ToDoItem))
        };
    };
    displayToDo();
};

//below function for get the data from local storage and display it on the browser.
const displayToDo = () => {
    const ToDoItems = JSON.parse(localStorage.getItem('ToDoos'));
    const getDisplayField = document.getElementById('todo-list');
    getDisplayField.innerText = '';

    if(ToDoItems){
        for(let ToDoItem of ToDoItems){
            const listItem = document.createElement('li');
            listItem.classList.add('flex', 'justify-between', 'delete-btn', 'my-2');
            listItem.innerHTML = `
            <span>${ToDoItem.title}</span> 
            <i onclick="deleteButton(this)" class="fa-solid fa-square-minus text-[30px] text-red-400"></i>`;
            getDisplayField.appendChild(listItem);
        }
    }else{
        const listItem = document.createElement('li');
        listItem.innerText = `No data found`;
        getDisplayField.appendChild(listItem);
    };
};

//below function for delele single data and rearange all data at local storage.
const deleteButton = (event) => {
    const getDisplayField = document.getElementById('todo-list');
    const deleteItem = event.parentNode.firstElementChild.innerText;
    const ToDoItems = JSON.parse(localStorage.getItem('ToDoos'));

    const newDataAtLocalStorageAfterDeleteItem = [];

    ToDoItems.find(item => {
        
        if(item.title != deleteItem){
            newDataAtLocalStorageAfterDeleteItem.push(item)
        }

        localStorage.setItem('ToDoos', JSON.stringify(newDataAtLocalStorageAfterDeleteItem));
    });
    displayToDo();    
};

//below event handler used for calling setValueAtLocalStorage() function after pressed 'Enter' key at inputfield.
document.getElementById('todo-text').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        setValueAtLocalStorage();
    }
});

//below function for delete all data from local storage.
document.getElementById('all-clear').addEventListener('click', function(){
    localStorage.removeItem('ToDoos');
    displayToDo();
});

displayToDo();