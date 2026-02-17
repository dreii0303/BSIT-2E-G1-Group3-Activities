const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDueDateInput = document.getElementById("taskDueDate");
const saveTaskButton = document.getElementById("saveTaskBtn");
const taskTableBody = document.getElementById("taskTableBody");
const currentDateText = document.getElementById("currentDate");

let editingRow = null;

/* Show Current Date */
const today = new Date();
currentDateText.textContent = today.toDateString();

/* Prevent Past Date */
taskDueDateInput.min = today.toISOString().split("T")[0];

/* Save Task */
saveTaskButton.addEventListener("click", function () {

    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const priority = taskPriorityInput.value;
    const dueDate = taskDueDateInput.value;

    if (title === "" || description === "" || priority === "" || dueDate === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (editingRow) {
        updateTask(title, description, priority, dueDate);
    } else {
        addTask(title, description, priority, dueDate);
    }

    clearForm();
});

/* Add Task */
function addTask(title, description, priority, dueDate) {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td class="${priority.toLowerCase()}">${priority}</td>
        <td>${dueDate}</td>
        <td class="status">Pending</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">✓</button>
        </td>
    `;

    addEventListeners(row);
    taskTableBody.appendChild(row);
}

/* Update Task */
function updateTask(title, description, priority, dueDate) {

    editingRow.cells[0].textContent = title;
    editingRow.cells[1].textContent = description;
    editingRow.cells[2].textContent = priority;
    editingRow.cells[2].className = priority.toLowerCase();
    editingRow.cells[3].textContent = dueDate;

    editingRow = null;
    saveTaskButton.textContent = "Save Task";
}

/* Add Event Listeners to Row Buttons */
function addEventListeners(row) {

    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");
    const completeButton = row.querySelector(".complete-btn");
    const statusCell = row.querySelector(".status");

    editButton.addEventListener("click", function () {
        taskTitleInput.value = row.cells[0].textContent;
        taskDescriptionInput.value = row.cells[1].textContent;
        taskPriorityInput.value = row.cells[2].textContent;
        taskDueDateInput.value = row.cells[3].textContent;

        editingRow = row;
        saveTaskButton.textContent = "Update Task";
    });

    deleteButton.addEventListener("click", function () {
        row.remove();
    });

    completeButton.addEventListener("click", function () {

        if (statusCell.textContent === "Pending") {
            statusCell.textContent = "Completed";
            row.classList.add("completed");
        } else {
            statusCell.textContent = "Pending";
            row.classList.remove("completed");
        }
    });
}

/* Clear Form */
function clearForm() {
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskPriorityInput.value = "";
    taskDueDateInput.value = "";
}
