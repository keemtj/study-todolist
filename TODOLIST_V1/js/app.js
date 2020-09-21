// state
let todos = [];

// DOMs

// Render
const render = () => {
  // ! 3. 아래의 코드에 따라 화면에 rendering
};

// get data(=fetch temp datas)
const getTodos = () => {
  // ! 2. fetch data -> state에 할당
  todos = [
    { id: 1, content: "todo1", done: false },
    { id: 2, content: "todo2", done: false },
    { id: 3, content: "todo3", done: false },
  ];

  // ! 3. render 호출
  render();
};

// Event Binding
// ! 1. window onload
window.onload = getTodos;
