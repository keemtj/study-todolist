// State
let todos = [
  // { id: 3, content: "Javascript으로 동적인 페이지 만들기", done: false },
  // { id: 2, content: "CSS로 멋진 스타일링", done: false },
  // { id: 1, content: "HTML의 중요성", done: false },
];

// DOMs
const todosEl = document.querySelector(".todos");
const inputEl = document.querySelector(".input-todo");
const checkAllEl = document.querySelector(".check-all");
const clearCheckedEl = document.querySelector(".btn-remove-checked");

// Render
const render = () => {
  let list = "";

  // if (!todos.length) {
  //   list += "<div>todos 없을때 스타일 해결해라</div>";
  // }

  todos.forEach(
    ({ id, done, content }) =>
      (list += `<li class="todo" id=${id}>
  <input id="todo-${id}" type="checkbox" ${done && "checked"}/>
  <label for="todo-${id}">${content}</label>
  <i class="far fa-trash-alt"></i>
</li>`)
  );

  todosEl.innerHTML = list;
  console.log(todos);
};

// Get data(temp)
const getData = () => {
  todos = [
    { id: 3, content: "Javascript으로 동적인 페이지 만들기", done: false },
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
