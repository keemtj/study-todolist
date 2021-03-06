// State
let todos = [];
let nav = "all";

// DOMs
const todosEl = document.querySelector(".todos");
const inputEl = document.querySelector(".input-todo");
const checkAllEl = document.querySelector(".check-all");
const clearCheckedEl = document.querySelector(".btn-remove-checked");
const leftItemsEl = document.querySelector(".left-items");
const checkedItemsEl = document.querySelector(".checked-items");
const navEl = document.querySelector(".nav");

// Render
const render = () => {
  const filteredTodos = todos.filter(({ completed }) =>
    nav === "all" ? true : nav === "active" ? !completed : completed
  );
  let list = "";

  if (!filteredTodos.length && nav === "all") {
    todosEl.style.border = "none";
    list += `<li class="none-todos">
    <div>등록된 Todo가 없습니다.</div>
    <div>새로운 Todo를 작성하세요.</div>
    </li>`;
  }

  if (!filteredTodos.length && nav === "active") {
    todosEl.style.border = "none";
    list += `<li class="none-todos">
    <div>진행중인 Todo가 없습니다.</div>
    </li>`;
  }

  if (!filteredTodos.length && nav === "completed") {
    todosEl.style.border = "none";
    list += `<li class="none-todos">
    <div>완료된 Todo가 없습니다.</div>
    </li>`;
  }

  filteredTodos.forEach(
    ({ id, completed, content }) =>
      (list += `<li class="todo" id=${id}>
  <input id="todo-${id}" type="checkbox" ${completed && "checked"}/>
  <label for="todo-${id}">${content}</label>
  <i class="far fa-trash-alt"></i>
</li>`)
  );

  todosEl.innerHTML = list;
  leftItemsEl.textContent = todos.filter((todo) => !todo.completed).length;
  checkedItemsEl.textContent = todos.filter((todo) => todo.completed).length;
};

// request
const promise = (method, url, payload) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });

const nextId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

const getTodos = () => {
  promise("GET", "http://localhost:9000/todos")
    .then((data) => (todos = data))
    .then(() => console.log("[promise, getTodos]", todos))
    .then(render);
};

const addTodo = (content) => {
  promise("POST", "http://localhost:9000/todos", {
    id: nextId(),
    content,
    completed: false,
  })
    .then((data) => (todos = data))
    .then(() => console.log("[promise, addTodo]", todos))
    .then(render);
  inputEl.value = "";
};

const removeTodo = (id) => {
  promise("DELETE", `http://localhost:9000/todos/${id}`)
    .then((data) => (todos = data))
    .then(() => console.log("[promise, removeTodo]", todos))
    .then(render);
};

const checkTodo = (id) => {
  const completed = !todos.find((todo) => todo.id === id).completed;
  promise("PATCH", `http://localhost:9000/todos/${id}`, { completed })
    .then((data) => (todos = data))
    .then(() => console.log("[promise, toggleCompleted]", todos))
    .then(render);
};

const checkAll = (completed) => {
  promise("PATCH", "http://localhost:9000/todos", { completed })
    .then((data) => (todos = data))
    .then(() => console.log("[promise, toggleCompletedAll]", todos))
    .then(render);
};

const clearChecked = () => {
  promise("DELETE", "http://localhost:9000/todos/completed")
    .then((data) => (todos = data))
    .then(() => console.log("[promise, removeCompleted]", todos))
    .then(render);
};

const navChange = (id) => {
  [...navEl.children].map((child) =>
    child.classList.toggle("active", child.id === id)
  );
  nav = id;
  render();
};

// Event Binding
window.onload = getTodos;

inputEl.onkeypress = ({ target, keyCode }) => {
  let content = target.value;
  if (keyCode !== 13 || content.trim() === "") return;
  addTodo(content);
};

todosEl.onclick = ({ target }) => {
  if (!target.matches(".todos > li > i")) return;
  removeTodo(+target.parentNode.id);
};

todosEl.onchange = ({ target }) => {
  checkTodo(+target.parentNode.id);
};

checkAllEl.onchange = ({ target }) => {
  checkAll(target.checked);
};

clearCheckedEl.onclick = () => {
  checkAllEl.checked = false;
  clearChecked();
};

navEl.onclick = ({ target }) => {
  if (target.matches(".nav" && ".nav > li.active")) return;
  navChange(target.id);
};
