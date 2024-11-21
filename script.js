// New tasks
const addNewTaskBtn = document.getElementById("addNewTaskBtn")
addNewTaskBtn.addEventListener("click", taskAddition)

function taskAddition(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById("taskInput");
    const openTasks = document.getElementById("openTaskList");
    const warningText = document.getElementById("warningText");

    if (taskInput.value.trim()) {
        let newListElement = document.createElement("div");
        newListElement.innerHTML = `<li>${taskInput.value.trim()}</li><button><i class="fa-solid fa-check"></i></button>`;
        openTasks.appendChild(newListElement);
        
        taskInput.value = "";
        // warningText.innerText = "";
        taskInput.placeholder = "What do you need to do?";
        taskInput.classList.remove("warning");
    } else {
        // warningText.innerText = "Task is missing content";
        taskInput.placeholder = "Task is missing content!";
        taskInput.classList.add("warning");

    }
}

//Complete tasks
// Event listener for complete btn

function taskComplete(e) {
    const pastTasks = document.getElementById("pastTaskList")

}


// Event listeners to catch the Add Task click
    // button click
    // key press

// Function add task
    // check if it's the enter key 13
    // Check inpu text value is true
    // Create new li item
    // Append the list
    // Clear text box
    // Focus on text box


// Event listener to catch the Complete Task click

// Function complete task (move it to the comnplete list)

// Event listener to catch the Delete Task click (If this is oging to be per list item it needs to be in that function)

// Function delete task