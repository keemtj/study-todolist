// State
let todos = [
  // { id: 3, content: "Javascript으로 동적인 페이지 만들기", done: false },
  // { id: 2, content: "CSS로 멋진 스타일링", done: false },
  // { id: 1, content: "HTML의 중요성", done: false },
];
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
  const filteredTodos = todos.filter(({ done }) =>
    nav === "all" ? true : nav === "active" ? !done : done
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

  if (!filteredTodos.length && nav === "done") {
    todosEl.style.border = "none";
    list += `<li class="none-todos">
    <div>완료된 Todo가 없습니다.</div>
    </li>`;
  }

  filteredTodos.forEach(
    ({ id, done, content }) =>
      (list += `<li class="todo" id=${id}>
  <input id="todo-${id}" type="checkbox" ${done && "checked"}/>
  <label for="todo-${id}">${content}</label>
  <i class="far fa-trash-alt"></i>
</li>`)
  );

  todosEl.innerHTML = list;
  leftItemsEl.textContent = todos.filter((todo) => !todo.done).length;
  checkedItemsEl.textContent = todos.filter((todo) => todo.done).length;

  console.log(todos);
};

// Get data(temp)
const getData = () => {
  todos = [
    { id: 3, content: "Javascript으로 동적인 페이지 만들기", done: true },
    { id: 2, content: "CSS로 멋진 스타일링", done: false },
    { id: 1, content: "HTML의 중요성", done: false },
  ];

  render();
};

const nextId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

const addTodo = (content) => {
  todos = [{ id: nextId(), content, done: false }, ...todos];
  render();
  inputEl.value = "";
};

const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  render();
};

const checkTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  render();
};

const checkAll = (done) => {
  todos = todos.map((todo) => ({ ...todo, done }));
  render();
};

const clearChecked = () => {
  todos = todos.filter((todo) => !todo.done);
  render();
};

const navChange = (id) => {
  [...navEl.children].map((child) =>
    child.classList.toggle("active", child.id === id)
  );
  nav = id;
  render();
};

// Event Binding
window.onload = getData;

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
