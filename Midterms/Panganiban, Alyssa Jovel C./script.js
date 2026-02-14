 const taskForm = document.getElementById("taskForm");
    const taskNameInput = document.getElementById("taskName");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const taskTableBody = document.getElementById("taskTableBody");

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addTask();
    });

   
    function sortTasks() {
        const rows = Array.from(taskTableBody.querySelectorAll("tr"));
        const priorityMap = { "High": 1, "Medium": 2, "Low": 3 };

        rows.sort((a, b) => {
            const valA = priorityMap[a.children[3].textContent] || 4;
            const valB = priorityMap[b.children[3].textContent] || 4;
            return valA - valB;
        });

       
        rows.forEach(row => taskTableBody.appendChild(row));
    }

    function addTask() {
        const taskName = taskNameInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const today = new Date().toISOString().split("T")[0];

        if (taskName === "" || taskDescription === "" || dueDate === "" || priority === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (dueDate < today) {
            alert("Due date cannot be in the past.");
            return;
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDescription}</td>
            <td>${dueDate}</td>
            <td>${priority}</td>
            <td>Pending</td>
            <td>
                <button onclick="toggleComplete(this)">Complete</button>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            </td>
        `;

        taskTableBody.appendChild(newRow);
        
        
        sortTasks();

        taskForm.reset(); 
        taskNameInput.focus(); 
    }

    function toggleComplete(button) {
        const row = button.parentElement.parentElement;
        row.classList.toggle("completed");
        row.children[4].textContent = row.classList.contains("completed") ? "Completed" : "Pending";
    }

    function deleteTask(button) {
        button.parentElement.parentElement.remove();
    }

    function editTask(button) {
        const row = button.parentElement.parentElement;
        const taskCell = row.children[0];
        const descriptionCell = row.children[1];
        const dateCell = row.children[2];
        const priorityCell = row.children[3];

        const newTask = prompt("Edit Task Name:", taskCell.textContent);
        const newDescription = prompt("Edit Description:", descriptionCell.textContent);
        const newDate = prompt("Edit Due Date (YYYY-MM-DD):", dateCell.textContent);
        const newPriority = prompt("Edit Priority (High/Medium/Low):", priorityCell.textContent);

        if (newTask && newDescription && newDate && newPriority) {
            taskCell.textContent = newTask;
            descriptionCell.textContent = newDescription;
            dateCell.textContent = newDate;
            priorityCell.textContent = newPriority;
            
           
            sortTasks();
        }
    }
