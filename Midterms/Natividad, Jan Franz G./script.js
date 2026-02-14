let editingRow = null;

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const today = new Date().toISOString().split("T")[0];

    if (title === "" || desc === "" || dueDate === "") {
        alert("All fields are required.");
        return;
    }

    if (dueDate < today) {
        alert("Due date cannot be in the past.");
        return;
    }

    if (editingRow) {
        updateTask(title, desc, dueDate, priority);
    } else {
        addTask(title, desc, dueDate, priority);
    }

    this.reset();
});

function addTask(title, desc, dueDate, priority) {
    const tableBody = document.getElementById("taskTableBody");
    const row = tableBody.insertRow();

    row.insertCell(0).innerText = title;
    row.insertCell(1).innerText = desc;
    row.insertCell(2).innerText = dueDate;

    const priorityCell = row.insertCell(3);
    priorityCell.innerText = priority;
    priorityCell.className = priority.toLowerCase();

    row.insertCell(4).innerText = "Pending";

    const actionCell = row.insertCell(5);

    actionCell.innerHTML = `
        <button class="action-btn complete-btn" onclick="toggleComplete(this)">Complete</button>
        <button class="action-btn edit-btn" onclick="editTask(this)">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
}

function deleteTask(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function toggleComplete(button) {
    const row = button.parentElement.parentElement;
    row.classList.toggle("completed");

    const statusCell = row.cells[4];
    statusCell.innerText = row.classList.contains("completed") ? "Completed" : "Pending";
}

function editTask(button) {
    const row = button.parentElement.parentElement;

    document.getElementById("taskTitle").value = row.cells[0].innerText;
    document.getElementById("taskDesc").value = row.cells[1].innerText;
    document.getElementById("dueDate").value = row.cells[2].innerText;
    document.getElementById("priority").value = row.cells[3].innerText;

    editingRow = row;
}

function updateTask(title, desc, dueDate, priority) {
    editingRow.cells[0].innerText = title;
    editingRow.cells[1].innerText = desc;
    editingRow.cells[2].innerText = dueDate;
    editingRow.cells[3].innerText = priority;
    editingRow.cells[3].className = priority.toLowerCase();
    editingRow = null;
}

