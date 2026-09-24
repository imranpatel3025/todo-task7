
const cl = console.log;

const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const todo = document.getElementById("todo");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");

todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];

function onShowTodo(arr) {
   
   let result = ``;

    arr.forEach(todo => {
        
        result += `<li class="list-group-item d-flex justify-content-between align-items-center" id="${todo.todoId}">
                                <h4><strong>${todo.todoName}</strong></h4>
                              <div>  
                                <button onclick="onEditTodo(this)" class="btn btn-warning btn-sm">Edit</button>
                                <button onclick="onRemoveTodo(this)" class="btn btn-danger btn-sm">Delete</button>
                            </div>
                            </li> `
    });
    todoList.innerHTML = result;
}
onShowTodo(todoArr);

function onAddTodo(eve) {
    eve.preventDefault();
    let todoObj = {
        todoId: Date.now(),
        todoName: todo.value
    }
    todoArr.push(todoObj);
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    todoForm.reset();
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.id = todoObj.todoId;
    li.innerHTML = `<h4><strong>${todoObj.todoName}</strong></h4>
                    <div>  
                        <button onclick="onEditTodo(this)" class="btn btn-warning btn-sm">Edit</button>
                        <button onclick="onRemoveTodo(this)" class="btn btn-danger btn-sm">Delete</button>
                    </div>`;
        swal.fire("skills added successfully", "Your skills added has been successfully.", "success");
    todoList.appendChild(li);
}

function onEditTodo(ele) {
    let EDIT_ID = ele.closest("li").id;
    
    localStorage.setItem("EDIT_ID", EDIT_ID);
    let editObj = todoArr.find(todo => todo.todoId == EDIT_ID);
  
    todo.value = editObj.todoName;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

}

function onUpdateTodo(ele) {
    let Update_ID = localStorage.getItem("EDIT_ID");

    let updateIndex = todoArr.findIndex(todo => todo.todoId == Update_ID);
    
    let updateObj = {
        todoName: todo.value,
        todoId: Update_ID
    }
    
    let li = document.getElementById(Update_ID);
    todoArr[updateIndex] = updateObj;
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    li.innerHTML = `<h4><strong>${updateObj.todoName}</strong></h4>
                    <div>  
                        <button onclick="onEditTodo(this)" class="btn btn-warning btn-sm">Edit</button>
                        <button onclick="onRemoveTodo(this)" class="btn btn-danger btn-sm">Delete</button>
                    </div>`;
        swal.fire("skills updated successfully", "Your skills updated has been successfully.", "success");
    todoForm.reset();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}

function onRemoveTodo(ele) {
    let REMOVE_ID = ele.closest("li").id;
  
   Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let removeIndex = todoArr.findIndex(todo => todo.todoId == REMOVE_ID);
  
    todoArr.splice(removeIndex, 1);
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    ele.closest("li").remove();
    swal.fire("skills deleted successfully", "Your skills deleted has been successfully.", "success");
  }
});
    
}



todoForm.addEventListener('submit', onAddTodo);
updateBtn.addEventListener('click', onUpdateTodo);
