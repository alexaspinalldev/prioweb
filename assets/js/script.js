// New task buttons listeners
const addNewTaskBtnLow = document.getElementById("addNewTaskBtn-LOW")
const addNewTaskBtnMed = document.getElementById("addNewTaskBtn-MED")
const addNewTaskBtnHig = document.getElementById("addNewTaskBtn-HIG")
addNewTaskBtnLow.addEventListener("click", taskArrayAdd)
addNewTaskBtnMed.addEventListener("click", taskArrayAdd)
addNewTaskBtnHig.addEventListener("click", taskArrayAdd)

///Global variables///
const taskInput = document.getElementById("taskInput");
const openTasks = document.getElementById("openTaskList");
const pastTasks = document.getElementById("pastTaskList");
const openTasksSec = document.getElementById("openTasks");
const pastTasksSec = document.getElementById("pastTasks");
const hint = document.getElementById("hint");
const myTaskArray = []


//// ---------- Functions ---------- ///
// Page load - look for a cookie
document.addEventListener("DOMContentLoaded", () => {
myTaskArray = (document.cookie);
// fucntion to build the list
// cookie is a string not an array so this won't work
});

// Page load - animations

// New task addition
    // Resize input box on input
    taskInput.addEventListener("input", () => {
            taskInput.style.height = "auto"; // This ensures it is resized on every input in case it was wrong to start with
            taskInput.style.height = `${taskInput.scrollHeight}px`; // Set the height to match the content
    })

    // Enter key defaults to low P task
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            taskArrayAdd(); // Send an undefined input
        }
    })

    // New task - create object and add it to array
    function taskArrayAdd(e) {
        e.preventDefault();
        let newTask;
        newTask.value = taskInput.value.trim()
        newTask.id = (new Date().getTime());
        newTask.priority = e.target.closest("button").id;
        /// Need to ^ include code to handle null input
        console.log(newTask);
        myTaskArray.push(newTask);
        console.log(newTaskArray);

        
        // Task list - store/update cookie
        let myTasksString = // Something
        document.cookie = "myTasks=" + myTasksString;
    }

    // ------------------------------------------------------------------------------------------ //

    // New task - compare the new array to the existing list
    // New tasks - create the div
    function taskDivCreate(priority) {
        if (taskInput.value.trim()) {
            //Create a new list item
            let newListItem = document.createElement("div");
            // let priority = e.target.closest("button").id;
            newListItem.classList.add("list-item")

            // Classify and style according to priority. If undefined assume low.
            switch (priority) {
                case ("addNewTaskBtn-LOW"):
                    newListItem.classList.add("task-lw");
                    break;

                case "addNewTaskBtn-MED":
                    newListItem.classList.add("task-md");
                    break;

                case "addNewTaskBtn-HIG":
                    newListItem.classList.add("task-hi");
                    break;

                default:
                    newListItem.classList.add("task-lw"); // Default used for error handling robustness
            }

            newListItem.classList.add("task-effect-in")
            newListItem.innerHTML = `<li>${taskInput.value.trim()}</li>
            <button type="button" class="btn button btn-success" id="completeTaskBtn" aria-label="Mark task complete"><i class="fa-solid fa-check"></i></button>
            <button type="button" class="btn button btn-danger" id="cancelTaskBtn" aria-label="Cancel task"><i class="fa-solid fa-trash-can"></i></button>`;
            openTasks.appendChild(newListItem);
            requestAnimationFrame(() => {
                newListItem.classList.add("effect-static")
            })

            // Get the number of children of #openTasks, if >0, remove hiding classes
            let openTaskCount = openTasksSec.getElementsByClassName("list-item");
            if (openTaskCount.length <= 1) {
                // Hide the hint
                requestAnimationFrame(() => {
                    hint.classList.add("zero-opac");
                })
                hint.classList.add("element-hide");
                // The first task reveals the box
                openTasksSec.classList.remove("element-hide");
                openTasksSec.classList.remove("zero-opac");
                
                
            } // Any subsequent tasks do nothing

            //Reset the input box
            taskInput.value = "";
            taskInput.placeholder = "What do you need to do?";
            taskInput.classList.remove("warning");
            taskInput.style.height = "auto";
            taskInput.focus();

            // Sort the list high to low (tbc)

            // Register the new buttons as event listeners
            const newCompleteBtn = newListItem.querySelector("#completeTaskBtn");
            const newCancelBtn = newListItem.querySelector("#cancelTaskBtn");
            newCompleteBtn.addEventListener("click", taskComplete);
            newCancelBtn.addEventListener("click", taskCancel);
        } else {
            // No task value, issue a warning
            taskInput.placeholder = "Task is missing content!";
            taskInput.classList.add("warning");
        }
    }

// Complete tasks
function taskComplete(e) {
    taskInput.blur();
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

        // Get the number of children of #pastTasks, if >0, remove hiding classes
        let pastTaskCount = pastTasksSec.getElementsByClassName("list-item");
        if (pastTaskCount.length <= 1) {
            // The first task reveals the box
            pastTasksSec.classList.remove("element-hide");
            pastTasksSec.classList.remove("zero-opac");
        } // Any subsequent tasks do nothing
    }
}

// Delete task
function taskCancel(e) {
    taskInput.blur();
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
        subheading.classList.add("zero-opac");
        subheading.addEventListener("transitionend", () => {
            subheading.classList.add("element-hide")});
        ;
    }
    if (elementTop > scrollPointUp){
        logo.classList.remove("minimise-logo");
        subheading.classList.remove("element-hide");
        subheading.classList.remove("zero-opac");
    }
});
