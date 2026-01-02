 let tasks = [];

    function renderTasks() {
      const pendingList = document.getElementById("pendingTasks");
      const completedList = document.getElementById("completedTasks");
      pendingList.innerHTML = "";
      completedList.innerHTML = "";

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${task.text}</span>
          <div class="timestamp">Added: ${task.createdAt}</div>
          ${task.completed ? `<div class="timestamp">Completed: ${task.completedAt}</div>` : ''}
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          ${!task.completed ? `<button class="complete-btn" onclick="completeTask(${index})">Complete</button>` : ''}
        `;
        (task.completed ? completedList : pendingList).appendChild(li);
      });
    }

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        tasks.push({
          text: taskText,
          completed: false,
          createdAt: new Date().toLocaleString(),
          completedAt: null
        });
        taskInput.value = "";
        renderTasks();
      }
    }

    function completeTask(index) {
      tasks[index].completed = true;
      tasks[index].completedAt = new Date().toLocaleString();
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    function editTask(index) {
      const newTask = prompt("Edit your task", tasks[index].text);
      if (newTask !== null) {
        tasks[index].text = newTask.trim();
        renderTasks();
      }
    }

    renderTasks();