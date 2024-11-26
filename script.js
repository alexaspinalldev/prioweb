document.addEventListener("DOMContentLoaded", () => {
    taskInput.focus()});

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
    if (taskInput.value.trim()) {
        //Create a new list item
        let newListItem = document.createElement("div");
        let priority = e.target.closest("button").id;
        newListItem.classList.add("list-item")

        // Classify and style according to priority
        switch (priority) {
            case "addNewTaskBtn-LOW":
            newListItem.classList.add("task-lw");
            break;

            case "addNewTaskBtn-MED":
            newListItem.classList.add("task-md");
            break;

            case "addNewTaskBtn-HIG":
            newListItem.classList.add("task-hi");
        }

        newListItem.classList.add("task-effect-in")
        newListItem.innerHTML = `<li>${taskInput.value.trim()}</li>
        <button type="button" class="btn button btn-success" id="completeTaskBtn"><i class="fa-solid fa-check"></i></button>
        <button type="button" class="btn button btn-danger" id="cancelTaskBtn"><i class="fa-solid fa-trash-can"></i></button>`;
        openTasks.appendChild(newListItem);
        requestAnimationFrame(() => {
            newListItem.classList.add("effect-static")})

        // Sort the list high to low
        
        
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
        newListItem.classList.add("task-comp")
        newListItem.classList.add("task-effect-in")
        newListItem.innerHTML = `<li>${completedTask.textContent}</li>`;
        pastTasks.appendChild(newListItem);
        requestAnimationFrame(() => {
            newListItem.classList.add("effect-static")})
        
        //Remove the old task from the old list
        taskToComplete.parentNode.removeChild(taskToComplete);
        // taskInput.focus();
    }
}

// Delete task
function taskCancel(e) {
    if (confirm("Cancel this task?")) {
        const taskToDelete = e.target.closest(".list-item");

        // Remove conflicting classes
        taskToDelete.classList.remove("task-effect-in");
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
        // taskInput.focus();
    }
}

// Minimise header on scroll
window.addEventListener("scroll", () => {
    const logo = document.querySelector("#logo");
    const subheading = document.querySelector("#subheading");
    const scrollPointDown = 170;
    const scrollPointUp = 170;
    const targetElement = document.querySelector("#taskInput");
    const elementTop = Math.floor(targetElement.getBoundingClientRect().top);
    if (elementTop <= scrollPointDown) {
        logo.classList.add("minimise-logo");
        subheading.classList.add("subhead-opac");
        subheading.addEventListener("transitionend", () => {
            subheading.classList.add("subhead-hide")});
        ;
    }
    if (elementTop > scrollPointUp){
        logo.classList.remove("minimise-logo");
        subheading.classList.remove("subhead-hide");
        subheading.classList.remove("subhead-opac");
    }
});
