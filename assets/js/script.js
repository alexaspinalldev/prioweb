/// Global variables ///
const taskInput = document.getElementById("taskInput");
const openTasks = document.getElementById("openTaskList");
const pastTasks = document.getElementById("pastTaskList");
const openTasksSec = document.getElementById("openTasks");
const pastTasksSec = document.getElementById("pastTasks");
const hint = document.getElementById("hint");
var myTaskCollection = {} // Declare an object that we will drop task objects into

/// Listeners ///
    const addNewTaskBtnLow = document.getElementById("addNewTaskBtn-LOW")
    const addNewTaskBtnMed = document.getElementById("addNewTaskBtn-MED")
    const addNewTaskBtnHig = document.getElementById("addNewTaskBtn-HIG")
    addNewTaskBtnLow.addEventListener("click", taskCollectionAdd)
    addNewTaskBtnMed.addEventListener("click", taskCollectionAdd)
    addNewTaskBtnHig.addEventListener("click", taskCollectionAdd)

    // Page load - look for a cookie
    document.addEventListener("DOMContentLoaded", () => {
        let retrievedTasks = localStorage.getItem("myTasks"); // Retrieve the JSON from local storage
        myTaskCollection = retrievedTasks ? JSON.parse(retrievedTasks) : {}; // Convert the JSON back to an object. Ignore if null.
        buildList();
    })

    // Page load - animations tbc

    // Resize input box on input
    taskInput.addEventListener("input", () => {
        taskInput.style.height = "auto"; // This ensures it is resized on every input in case it was wrong to start with
        taskInput.style.height = `${taskInput.scrollHeight}px`; // Set the height to match the content
    })

    // Enter key defaults to low P task
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            taskCollectionAdd(e); // Send an undefined input
        }
    })



//// --------------------------------------------------------- Functions --------------------------------------------------------------- ///

/// New Tasks
// New task - create object and add it to the collection
function taskCollectionAdd(e) {
    if (taskInput.value.trim()) { // Task input has a value in it
        let newTaskId = "T" + (new Date().getTime()); // Generate a uniqueID
        myTaskCollection[newTaskId] = {
            // Add task properties
            content: taskInput.value.trim(),
            priority: e.target.closest("button")?.dataset.priority || "0-low",
            created: (new Date().toLocaleString()), // This will just be for the user - the TaskId is better for sorting
            state: "open",
            // Any future task properties will go here
        };

        // Update local storage with the new list of tasks as a JSON
        sortList() // Sort myTaskCollection now the new task has all its properties
        let tasksToCache = JSON.stringify(myTaskCollection);
        localStorage.setItem("myTasks", tasksToCache);

        // Update the DOM list
        buildList(newTaskId, "adding");

        //Reset the input box
        taskInput.value = "";
        taskInput.placeholder = "What do you need to do?";
        taskInput.classList.remove("warning");
        taskInput.style.height = "auto";
        taskInput.focus();

    } else {
        // No task value, issue a warning
        taskInput.placeholder = "Task is missing content!";
        taskInput.classList.add("warning");
    }
}



/// Building the DOM list
function buildList(newTaskId, action) {
    // If passed no argument...
    if (!newTaskId) {
        // ...build the list from scratch
        for (let [key,value] of Object.entries(myTaskCollection)) {
            let newListItem = document.createElement("div"); // Create a new list item

            // Need to encapsulate this in a function
            switch (value.priority) { // Classify and style according to priority. If undefined assume low.
                case ("0-low"):
                    newListItem.classList.add("task-lw");
                    break;
                case "1-medium":
                    newListItem.classList.add("task-md");
                    break;
                case "2-high":
                    newListItem.classList.add("task-hi");
                    break;
                default:
                    newListItem.classList.add("task-lw"); // Default used for error handling robustness
            }
            // Apply all the relevant classes
            newListItem.classList.add("list-item");
            newListItem.classList.add("task-effect-in")
            newListItem.innerHTML = `<li>${value.content} <span class="task-time">Created - ${value.created}</span></li>
                <button type="button" class="btn button btn-success" id="completeTaskBtn" aria-label="Mark task complete"><i class="fa-solid fa-check"></i></button>
                <button type="button" class="btn button btn-danger" id="cancelTaskBtn" aria-label="Cancel task"><i class="fa-solid fa-trash-can"></i></button>`;
            openTasks.appendChild(newListItem);
            requestAnimationFrame(() => {
                newListItem.classList.add("effect-static")
            })

            // Get the number of children of #openTasks, if this is the first loop
            let openTaskCount = openTasksSec.getElementsByClassName("list-item");
            if (openTaskCount.length === 1) {
                requestAnimationFrame(() => { // Hide the hint text
                    hint.classList.add("zero-opac");
                })
                hint.classList.add("element-hide");
                // The first task reveals the box
                openTasksSec.classList.remove("element-hide");
                openTasksSec.classList.remove("zero-opac");
            } // Any subsequent tasks do nothing

            

            // Register the new buttons as event listeners
            const newCompleteBtn = newListItem.querySelector("#completeTaskBtn");
            const newCancelBtn = newListItem.querySelector("#cancelTaskBtn");
            newCompleteBtn.addEventListener("click", taskComplete);
            newCancelBtn.addEventListener("click", taskCancel);
        }
    } else {
        // ...whereas if passed a TaskId argument we want to add/remove only the new item to the existing DOM list
        console.log("We just got one item here")
        switch (action) {
            case ("adding"):
                console.log("Adding " + newTaskId);
                //buildListSingle(newTaskId,adding)

                break;
            case ("removing"):
                console.log("Removing " + newTaskId);
                break;
            case ("updating"):
                console.log("Updating " + newTaskId);
                break;
            default:
                console.error("Don't know what to do with this!");
        }

    }
}

function sortList() {
// Let's cache the user's sorting preference. Have an option on the DOM to change the sorting preference.
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

// New task - compare the new collection to the existing list
// New tasks - create the div
function buildListSingle(newTaskId) {

    //Create a new list item
    let newListItem = document.createElement("div");
    // let priority = e.target.closest("button").id;
    newListItem.classList.add("list-item")

    // Classify and style according to priority. If undefined assume low.
    switch (this.priority) {
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

    // Sort the list high to low (tbc)

    // Register the new buttons as event listeners
    const newCompleteBtn = newListItem.querySelector("#completeTaskBtn");
    const newCancelBtn = newListItem.querySelector("#cancelTaskBtn");
    newCompleteBtn.addEventListener("click", taskComplete);
    newCancelBtn.addEventListener("click", taskCancel);
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
            newListItem.classList.add("effect-static")
        })

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
            subheading.classList.add("element-hide")
        });
        ;
    }
    if (elementTop > scrollPointUp) {
        logo.classList.remove("minimise-logo");
        subheading.classList.remove("element-hide");
        subheading.classList.remove("zero-opac");
    }
});
