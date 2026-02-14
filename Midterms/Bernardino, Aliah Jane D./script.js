const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const descriptionInput = document.getElementById("description");
const taskTableBody = document.getElementById("taskTableBody");
const errorMessage = document.getElementById("errorMessage");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addTask();
});

function addTask() {

    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const description = descriptionInput.value.trim();
    const today = new Date().toISOString().split("T")[0];

    if (taskName === "" || dueDate === "" || priority === "" || description === "") {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    if (dueDate < today) {
        errorMessage.textContent = "Due date cannot be in the past.";
        return;
    }

    errorMessage.textContent = "";

    const newRow = document.createElement("tr");

    let priorityClass = "";
    if (priority === "High") priorityClass = "priority-high";
    if (priority === "Medium") priorityClass = "priority-medium";
    if (priority === "Low") priorityClass = "priority-low";

    newRow.innerHTML = `
        <td>${taskName}</td>
        <td>${dueDate}</td>
        <td class="${priorityClass}">${priority}</td>
        <td>${description}</td>
        <td>Pending</td>
        <td>
            <button class="complete-btn" onclick="toggleComplete(this)">Complete</button>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </td>
    `;

    taskTableBody.appendChild(newRow);
    taskForm.reset();
}

function toggleComplete(button) {
    const row = button.parentElement.parentElement;
    const statusCell = row.children[4];

    row.classList.toggle("completed");

    if (row.classList.contains("completed")) {
        statusCell.textContent = "Completed";
        button.textContent = "Undo";
    } else {
        statusCell.textContent = "Pending";
        button.textContent = "Complete";
    }
}

function deleteTask(button) {
    const row = button.parentElement.parentElement;
    taskTableBody.removeChild(row);
}

function editTask(button) {
    const row = button.parentElement.parentElement;

    const taskCell = row.children[0];
    const dateCell = row.children[1];
    const priorityCell = row.children[2];
    const descriptionCell = row.children[3];

    const newTask = prompt("Edit Task Name:", taskCell.textContent);
    const newDate = prompt("Edit Due Date (YYYY-MM-DD):", dateCell.textContent);
    const newPriority = prompt("Edit Priority (High/Medium/Low):", priorityCell.textContent);
    const newDescription = prompt("Edit Description:", descriptionCell.textContent);

    if (newTask && newDate && newPriority && newDescription) {

        taskCell.textContent = newTask;
        dateCell.textContent = newDate;
        descriptionCell.textContent = newDescription;

        priorityCell.classList.remove("priority-high", "priority-medium", "priority-low");

        if (newPriority === "High") priorityCell.classList.add("priority-high");
        if (newPriority === "Medium") priorityCell.classList.add("priority-medium");
        if (newPriority === "Low") priorityCell.classList.add("priority-low");

        priorityCell.textContent = newPriority;
    }
}
