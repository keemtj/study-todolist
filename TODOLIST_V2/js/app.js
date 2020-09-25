// State
let todos = [];

// DOMs
const todosEl = document.querySelector(".todos");

// Render
const render = () => {
  let html = "";
  todos.forEach(
    (todo) =>
      (html += `<li class="todo" id=${todo.id}>
  <input type="checkbox" ${todo.done && checked}/>
  <span>${todo.content}</span>
  <i class="far fa-trash-alt"></i>
</li>`)
  );

  todosEl.innerHTML = html;
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

// Event Binding
window.onload = getData;
