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

const nextId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

const getTodos = () => {
  fetch("http://localhost:9000/todos")
    .then((res) => res.json())
    .then((data) => (todos = data))
    .then(() => console.log("[getTodos]", todos))
    .then(render);
};

const addTodo = (content) => {
  fetch("http://localhost:9000/todos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: nextId(), content, completed: false }),
  })
    .then((data) => data.json())
    .then((data) => (todos = data))
    .then(() => console.log("[addTodo]", todos))
    .then(render);
  inputEl.value = "";
};

const removeTodo = (id) => {
  fetch(`http://localhost:9000/todos/${id}`, { method: "DELETE" })
    .then((data) => data.json())
    .then((data) => (todos = data))
    .then(() => console.log("[removeTodo]", todos))
    .then(render);
};

const checkTodo = (id) => {
  const completed = !todos.find((todo) => todo.id === id).completed;
  fetch(`http://localhost:9000/todos/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ completed }),
  })
    .then((data) => data.json())
    .then((data) => (todos = data))
    .then(() => console.log("[toggleCompleted]", todos))
    .then(render);
};

const checkAll = (completed) => {
  fetch("http://localhost:9000/todos", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ completed }),
  })
    .then((data) => data.json())
    .then((data) => (todos = data))
    .then(() => console.log("[toggleCompletedAll]", todos))
    .then(render);
};

const clearChecked = () => {
  fetch("http://localhost:9000/todos/completed", { method: "DELETE" })
    .then((data) => data.json())
    .then((data) => (todos = data))
    .then(() => console.log("[removeCompleted]", todos))
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
