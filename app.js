let inp = document.querySelector(".container input");
let ul = document.querySelector(".container ul");
let addBtn = document.querySelector(".container #addBtn");
let log = document.querySelector(".login");
let about = document.querySelector(".about");
let loginClose = document.querySelector(".login h2 i");
let signClose = document.querySelector(".sign h2 i");
let aboutClose = document.querySelector(".about h2 i");
let sig = document.querySelector(".sign");
let todo_container = document.querySelector(".todo_container");

let taskAll = getTodoFromLS();

updateTodoList();

function createTodo(task, idx) {
  if (task) {
    let li = document.createElement("li");
    let del = document.createElement("button");
    li.innerHTML = `<i class="fa-regular fa-square-check"></i>${task.Todo}`;

    del.innerText = "Delete";
    del.addEventListener("click", () => {
      delTodoFromLS(idx);
    });

    let i = li.querySelector("i");
    i.addEventListener("click", () => {
      isDone(i, idx);
    });
    if (task.isDone == false) {
      i.classList.add("fa-regular");
      i.classList.remove("fa-solid");
    } else {
      li.style.opacity = "0.4";
      i.classList.remove("fa-regular");
      i.classList.add("fa-solid");
    }
    li.append(del);
    ul.append(li);
  }
}

function isDone(i, idx) {
  taskAll[idx].isDone = taskAll[idx].isDone ? false : true;
  saveToLS();
}
function updateTodoList() {
  if (taskAll) {
    taskAll.forEach((task, idx) => {
      createTodo(task, idx);
    });
  }
}

inp.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    accessInputValue();
  }
});

addBtn.addEventListener("click", () => {
  accessInputValue();
});

function accessInputValue() {
  let todo = inp.value;
  if (todo) {
    taskAll.push({ Todo: todo, isDone: false });
    inp.value = "";
    saveToLS();
  } else {
    alert("Enter the Task Please");
  }
}

function saveToLS() {
  localStorage.setItem("data", JSON.stringify(taskAll));
  ul.innerText = "";
  updateTodoList();
}

function delTodoFromLS(idx) {
  taskAll = taskAll.filter((task, id) => id != idx);
  saveToLS();
}

function getTodoFromLS() {
  let todoList = JSON.parse(localStorage.getItem("data"));
  return todoList || [];
}

function login() {
  log.classList.remove("displayClose");
  log.classList.add("displaay");
  sig.classList.add("displayClose");
  about.classList.add("displayClose");
}
function sign() {
  log.classList.add("displayClose");
  sig.classList.remove("displayClose");
  sig.classList.add("displaay");
  about.classList.add("displayClose");
}
function aboutUs() {
  log.classList.add("displayClose");
  about.classList.remove("displayClose");
  about.classList.add("displaay");
  sig.classList.add("displayClose");
}

loginClose.addEventListener("click", function () {
  log.classList.toggle("displayClose");
});
signClose.addEventListener("click", function () {
  sig.classList.toggle("displayClose");
});
aboutClose.addEventListener("click", function () {
  about.classList.toggle("displayClose");
});
