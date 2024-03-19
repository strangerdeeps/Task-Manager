document.addEventListener("DOMContentLoaded", function() {
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);

    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function updateDateTime() {
    const dateTimeDiv = document.getElementById("datetime");
    const currentDate = new Date();
    dateTimeDiv.textContent = "Current Date and Time: " + currentDate.toLocaleString();
}

function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
            <button onclick="removeTask(${index})">Remove</button>
        `;
        taskList.appendChild(li);
    });
    
    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    
    if (taskName !== "") {
        const newTask = {
            name: taskName,
            completed: false
        };
        
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        renderTasks(tasks);
        
        taskInput.value = "";
    }
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}