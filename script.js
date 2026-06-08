let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function filterTasks(filter){
    currentFilter = filter;
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if(currentFilter === "active")
            return !task.completed;

        if(currentFilter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach(task => {
        let index = tasks.indexOf(task);

        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}"
            onclick="toggleTask(${index})">
            ${task.text}
            </span>

            <button onclick="deleteTask(${index})">
            Delete
            </button>
        `;

        list.appendChild(li);
    });
}

renderTasks();
