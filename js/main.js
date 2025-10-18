let tasks = [
  {
    id: 1,
    text: "Make Homework",
    category: "personal",
    completed: false,
  },
  {
    id: 2,
    text: "Make money",
    category: "house",
    completed:true,
  }
];

let nextId = 3;

function renderTasks() {
  const container = document.querySelector("#taskContainer");

  container.innerHTML = "";

  const categories = ["design", "personal", "house"];

  categories.forEach((category) => {
    const categoryTasks = tasks.filter((task) => task.category === category);

    if (categoryTasks.length > 0) {
      const title = document.createElement("div");
      title.className = "category-title";
      title.textContent = category;
      container.appendChild(title);

      categoryTasks.forEach((task) => {
        const taskDiv = document.createElement("div"); 
        taskDiv.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);

        const text = document.createElement("span");
        text.className = "task-text";
        if (task.completed) {
          text.classList.add("completed");
        }
        text.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(text);
        taskDiv.appendChild(deleteBtn);

        container.appendChild(taskDiv);
      });
    }
  });
}

renderTasks();
