// Создаем массив объектов — каждый объект это отдельная задача.
let tasks = [];

// Счетчик для создания уникальных ID
let nextId = 3;
let filterCategory = "all";
let filterPriority = "allPriority";

// Функция для отображения всех задач
function renderTasks() {
  // Получаем контейнер для задач
  const container = document.querySelector("#tasksContainer");

  // Очищаем контейнер
  container.innerHTML = "";

  // Группируем задачи по категориям    
  const categories = ["design", "personal", "house"];
  // Проходим по каждой категории
  categories.forEach((category) => {
    // Находим задачи этой категории
    const categoryTasks = tasks.filter((task) => task.category === category);

    // Если есть задачи в этой категории
    if (categoryTasks.length > 0) {
      // Создаем заголовок категории
      const title = document.createElement("div"); // создаем div для заголовка категории
      title.className = "category-title"; // добавляем класс для стилизации
      title.textContent = category; // устанавливаем текст заголовка
      container.appendChild(title); // добавляем заголовок в контейнер

      // Добавляем каждую задачу
      categoryTasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task-item ${task.priority}`;

        taskDiv.setAttribute("data-category", task.category);
        taskDiv.setAttribute("data-priority", task.priority);

        // Создаем чекбокс (галочку)
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id); // функция переключения состояния задачи при изменении чекбокса

        const textPriority = document.createElement("p");
        textPriority.textContent = task.priority;

        // Создаем текст задачи
        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;
        if (task.completed) {
          text.classList.add("completed");
        }
        const deadlineValue=new Date(task.deadline);
        const newFormatDeadline=deadlineValue.toLocaleDateString("en-Gb",{
            day: "numeric",
            month:"long",
            year:"numeric"
        });
        const deadline = document.createElement("span");
        deadline.className="task-deadline";
        deadline.textContent= newFormatDeadline;
        // Создаем кнопку удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id); // функция удаления задачи при нажатии кнопки

        // Добавляем все элементы в задачу
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(text);
        taskDiv.appendChild(textPriority);
        taskDiv.appendChild(deadline);
        taskDiv.appendChild(deleteBtn);

        // Добавляем задачу в контейнер
        container.appendChild(taskDiv);
      });
    }
  });
}
const addTaskButton = document.querySelector(".add-button");
addTaskButton.addEventListener("click", addTask);
function addTask() {
  const input = document.querySelector(".task-input");
  const category = document.querySelector("#categorySelect");
  const priority = document.querySelector("#prioritySelect");
  const deadline=document.querySelector("#deadlineInput");

  let text = input.value.trim();

  if (text == "") {
    alert("Put your text nigga");
    return;
  }

  const newTasks = {
    id: nextId,
    text: text,
    category: category.value,
    priority: priority.value,
    deadline: deadline.value,
    completed: false,
  };
  nextId++;
  tasks.push(newTasks);
  input.value = "";
  deadline.value="";
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((element) => element.id === id);
  task.completed = !task.completed;
  renderTasks();
}
const input = document.querySelector(".task-input");
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}
const filterCategorySelect = document.querySelector("#filterCategorySelect");
filterCategorySelect.addEventListener("change", function () {
  changeSelectCategory(filterCategorySelect.value);
});
function changeSelectCategory(value) {
  filterCategory = value;
  const taskElements = document.querySelectorAll(".task-item");
  taskElements.forEach((element) => {
    const category = element.getAttribute("data-category");
    if (filterCategory == "all" || category == filterCategory) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}
const filterProritySelect = document.querySelector("#filterPrioritySelect");
filterProritySelect.addEventListener("change", function () {
  changePriorityCategory(filterProritySelect.value);
});
function changePriorityCategory(valuePrio) {
  filterPriority = valuePrio;
  const taskElementsPrio = document.querySelectorAll(".task-item");
  taskElementsPrio.forEach((elementprio) => {
    const priority = elementprio.getAttribute("data-priority");
    if (elementprio == "allPriority" || priority == filterPriority) {
      elementprio.classList.remove("hide");
    } else {
      elementprio.classList.add("hide");
    }
  });
}
