// New tasks
const addNewTaskBtn = document.getElementById("addNewTaskBtn")
addNewTaskBtn.addEventListener("click", taskAddition)

function taskAddition(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById("taskInput");
    const openTasks = document.getElementById("openTaskList");
    const warningText = document.getElementById("warningText");

    if (taskInput.value.trim()) {
        let newListItem = document.createElement("div");
        newListItem.classList.add("list-item")
        newListItem.innerHTML = `<li>${taskInput.value.trim()}</li>
        <button type="submit" class="btn button btn-success" id="completeTaskBtn"><i class="fa-solid fa-check"></i></button>
        <button type="submit" class="btn button btn-danger" id="cancelTaskBtn"><i class="fa-solid fa-x"></i></button>`;
        openTasks.appendChild(newListItem);
        
        taskInput.value = "";
        // warningText.innerText = "";
        taskInput.placeholder = "What do you need to do?";
        taskInput.classList.remove("warning");
        taskInput.focus();
    } else {
        // warningText.innerText = "Task is missing content";
        taskInput.placeholder = "Task is missing content!";
        taskInput.classList.add("warning");

    }
}

//Complete tasks
/// Event listener for complete btn

function taskComplete(e) {
    const pastTasks = document.getElementById("pastTaskList")
    //Grab the content of the sibling?? li as a variable
    //append it to past tasks
    //delete it from open tasks
}


// Event listener to catch the Delete Task click (If this is oging to be per list item it needs to be in that function)
// Function delete task