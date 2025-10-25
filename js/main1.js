// Создаем массив объектов — каждый объект это отдельная задача.
let tasks = [];

// Счетчик для создания уникальных ID
let nextId = 3;
let filterCategory = "all";

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
        taskDiv.className = "task-item";

        taskDiv.setAttribute("data-category", task.category);

        // Создаем чекбокс (галочку)
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id); // функция переключения состояния задачи при изменении чекбокса

        // Создаем текст задачи
        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        // Условие: Добавляем класс для завершенных задач, если task.completed true
        if (task.completed) {
          text.classList.add("completed");
        }

        // Создаем кнопку удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id); // функция удаления задачи при нажатии кнопки

        // Добавляем все элементы в задачу
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(text);
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

  let text = input.value.trim();

  if (text == "") {
    alert("Put your text nigga");
    return;
  }

  const newTasks = {
    id: nextId,
    text: text,
    category: category.value,
    completed: false,
  };
  nextId++;
  tasks.push(newTasks);
  input.value = "";
  console.log(tasks);
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
// Вызов функции чтобы все отобразилось при загрузке страницы
renderTasks();
