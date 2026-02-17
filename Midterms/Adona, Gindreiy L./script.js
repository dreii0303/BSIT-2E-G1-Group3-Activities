let tasks = [];
let editIndex = -1;

const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const tableBody = document.getElementById("taskTableBody");
const submitBtn = document.getElementById("submitBtn");


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (title === "" || description === "" || priority === "" || dueDate === "") {
        alert("Please fill out all fields.");
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dueDate < today) {
        alert("Due date cannot be in the past.");
        return;
    }

    const taskData = {
        title,
        description,
        priority,
        dueDate,
        completed: false
    };

    if (editIndex === -1) {
        tasks.push(taskData);
    } else {
        tasks[editIndex] = taskData;
        editIndex = -1;
        submitBtn.textContent = "Add Task";
    }

    form.reset();
    renderTasks();
});

function renderTasks() {
    tableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");

        if (task.completed) {
            row.classList.add("completed");
        }

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td class="${task.priorityColor}">${task.priority}</td>
            <td>${task.dueDate}</td>
            <td>${task.completed ? "Completed" : "Pending"}</td>
            <td>
                <button class="complete-btn" onclick="toggleComplete(${index})">Done</button>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

function editTask(index) {
    const task = tasks[index];

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;

    editIndex = index;
    submitBtn.textContent = "Update Task";
}
