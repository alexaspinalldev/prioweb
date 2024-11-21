// Element references

const addNewTaskBtn = document.getElementById("addNewTaskBtn")
addNewTaskBtn.addEventListener("click", taskAddition)

function taskAddition(e) {
    e.preventDefault(); // Prevent form submission
    
    const taskInput = document.getElementById("taskInput");
    const openTasks = document.getElementById("openTaskList");
    const warningText = document.getElementById("warningText");

    if (taskInput.value.trim()) {
        let newListElement = document.createElement("li");
        newListElement.innerText = taskInput.value.trim();
        openTasks.appendChild(newListElement);
        
        taskInput.value = ""; // Clear the input box after adding the task
        warningText.innerText = ""; // Clear the warning text if previously shown
    } else {
        warningText.innerText = "Task is missing content";
    }
}

// const pastTasks = document.getElementById("pastTaskList")



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