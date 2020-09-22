// state
let todos = [];

// DOMs
const todosEl = document.querySelector(".todos");
const inputTodoEl = document.querySelector(".input-todo");

// Render
const render = () => {
  // ! 4. 아래의 코드에 따라 화면에 rendering
  let html = "";

  todos.forEach((todo) => {
    html += `<li id="${todo.id}">
    <input type="checkbox" ${todo.done && "checked"}>
    <span>${todo.content}</span>
    <button class="btn-remove-todo">X</button>
  </li>`;
  });

  todosEl.innerHTML = html;
};

// get data(=fetch temp datas)
const getTodos = () => {
  // ! 2. fetch data -> state에 할당
  todos = [
    { id: 1, content: "todo1", done: false },
    { id: 2, content: "todo2", done: false },
    { id: 3, content: "todo3", done: false },
  ].sort((a, b) => b.id - a.id);

  // ! 3. render 호출
  render();
};

// Event Binding
// ! 1. window onload
window.onload = getTodos;

inputTodoEl.onkeypress = ({ target, keyCode }) => {
  if (keyCode !== 13) return;
  const content = target.value;
  const inputTodo = (content) => {
    todos = [{ id: 4, content, done: false }, ...todos];
    inputTodoEl.value = "";
    render();
  };
  inputTodo(content);
};
