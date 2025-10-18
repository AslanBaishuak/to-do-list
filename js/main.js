let tasks = [];

let nextId = 0;

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
function deleteTask(a) {
  tasks = tasks.filter((task) => task.id !== a);
  renderTasks();
}
function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}
let add = document.querySelector(".add-button");
let input = document.querySelector("#taskInput");
let choosedCategory = document.querySelector("#categorySelect");
add.addEventListener("click", function () {
  let taskText = input.value;
  let taskCategory = choosedCategory.value;
  if (!taskText || !taskCategory) return;

  const newTask = {
    id: nextId,
    text: taskText,
    category: taskCategory,
    completed: false,
  };
  tasks.push(newTask);
  nextId++;
  renderTasks();
  input.value = "";
});
