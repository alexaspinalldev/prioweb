// New tasks buttons listeners
const addNewTaskBtnLow = document.getElementById("addNewTaskBtn-LOW")
const addNewTaskBtnMed = document.getElementById("addNewTaskBtn-MED")
const addNewTaskBtnHig = document.getElementById("addNewTaskBtn-HIG")
addNewTaskBtnLow.addEventListener("click", taskAddition)
addNewTaskBtnMed.addEventListener("click", taskAddition)
addNewTaskBtnHig.addEventListener("click", taskAddition)



///Global variables///
const taskInput = document.getElementById("taskInput");
const openTasks = document.getElementById("openTaskList");
const pastTasks = document.getElementById("pastTaskList");


////Functions///
// New tasks
function taskAddition(e) {
    e.preventDefault();
    // console.log(e)
    //There must be a way to use (e) to get the ID of the nearest button and use that to add a priority to the task - even if it's just colour to start with
    
    if (taskInput.value.trim()) {
        //Create a new list item
        let newListItem = document.createElement("div");
        newListItem.classList.add("list-item")

        // Style according to priority
        // if object.property(priority) is high/medium/low
        // newListItem.classList.add("task-hi");
        // newListItem.classList.add("task-md");
        newListItem.classList.add("task-lw");

        newListItem.classList.add("task-effect-in")
        newListItem.innerHTML = `<li>${taskInput.value.trim()}</li>
        <button type="button" class="btn button btn-success" id="completeTaskBtn"><i class="fa-solid fa-check"></i></button>
        <button type="button" class="btn button btn-danger" id="cancelTaskBtn"><i class="fa-solid fa-trash-can"></i></button>`;
        openTasks.appendChild(newListItem);
        requestAnimationFrame(() => {
            newListItem.classList.add("effect-static")})

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
    if (confirm("Mark this task complete?")) {
        const taskToComplete = e.target.closest('.list-item');
        const completedTask = taskToComplete.querySelector('li');

        // Create a new div in the Past Tasks section
        let newListItem = document.createElement("div");
        newListItem.classList.add("list-item")
        newListItem.classList.add("task-effect-in")
        newListItem.innerHTML = `<li>${completedTask.textContent}</li>`;
        pastTasks.appendChild(newListItem);
        requestAnimationFrame(() => {
            newListItem.classList.add("effect-static")})
        
        //Remove the old task from the old list
        taskToComplete.parentNode.removeChild(taskToComplete);
        taskInput.focus();
    }
}

// Delete task
function taskCancel(e) {
    if (confirm("Cancel this task?")) {
        const taskToDelete = e.target.closest(".list-item");

        // Remove conflicting classes?
        taskToDelete.classList.remove("task-effect-in");

        // NOT CONVINCED THIS IS WORKING CONSISTENTLY

        // Add the "task-effect-out" class to start the animation
        requestAnimationFrame(() => {
            taskToDelete.classList.add("task-effect-out");

            // Wait for the animation to complete before removing the element
            taskToDelete.addEventListener("transitionend", () => {
                taskToDelete.parentNode.removeChild(taskToDelete);
            }, {
                once: true
            }); // { once: true } ensures the listener runs only once
        })
        taskInput.focus();
    }
}
