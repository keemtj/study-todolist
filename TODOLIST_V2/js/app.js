// State
let todos = [
  // { id: 3, content: "Javascript으로 동적인 페이지 만들기", done: false },
  // { id: 2, content: "CSS로 멋진 스타일링", done: false },
  // { id: 1, content: "HTML의 중요성", done: false },
];

// DOMs
const todosEl = document.querySelector(".todos");
const inputEl = document.querySelector(".input-todo");

// Render
const render = () => {
  let list = "";

  if (!todos.length) {
    list += "<div>todos 없을때 스타일 해결해라</div>";
  }

  todos.forEach(
    ({ id, done, content }) =>
      (list += `<li class="todo" id=${id}>
  <input type="checkbox" ${done && "checked"}/>
  <span>${content}</span>
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

const addTodo = (content) => {
  todos = [{ id: 4, content, done: false }, ...todos];
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
