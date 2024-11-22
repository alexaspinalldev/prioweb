// New tasks button listener
const addNewTaskBtn = document.getElementById("addNewTaskBtn")
addNewTaskBtn.addEventListener("click", taskAddition)



///Global variables///
const taskInput = document.getElementById("taskInput");
const openTasks = document.getElementById("openTaskList");
const pastTasks = document.getElementById("pastTaskList");


////Functions///
// New tasks
function taskAddition(e) {
    e.preventDefault();
    if (taskInput.value.trim()) {
        //Create a new list item
        let newListItem = document.createElement("div");
        newListItem.classList.add("list-item")
        newListItem.innerHTML = `<li>${taskInput.value.trim()}</li>
        <button type="button" class="btn button btn-success" id="completeTaskBtn"><i class="fa-solid fa-check"></i></button>
        <button type="button" class="btn button btn-danger" id="cancelTaskBtn"><i class="fa-solid fa-x"></i></button>`;
        openTasks.appendChild(newListItem);
        
        //Reset the input box
        taskInput.value = "";
        taskInput.placeholder = "What do you need to do?";
        taskInput.classList.remove("warning");
        taskInput.focus();

        // Register the new buttons as event listeners
        const newCompleteBtn = newListItem.querySelector("#completeTaskBtn");
        const newCancelBtn = newListItem.querySelector("#cancelTaskBtn");
        newCompleteBtn.addEventListener("click", taskComplete);
        newCancelBtn.addEventListener("click", taskCancel);
    } else {
        //No task value, issue a warning
        taskInput.placeholder = "Task is missing content!";
        taskInput.classList.add("warning");

    }
}

// Complete tasks
function taskComplete(e) {
    //Grab the content of the sibling?? li as a variable
    //append it to past tasks
    //delete it from open tasks
    //focus on input
}

// Delete task
function taskCancel(e) {
    if (confirm("Cancel this task?")) {
    const taskToDelete = e.target.parentNode;
    taskToDelete.parentNode.removeChild(taskToDelete);
    taskInput.focus();
    }
}
