const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners(params) {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTask);
  filter.addEventListener("keydown", filterTask);
  document.querySelector("#getName").addEventListener("submit", getName);
  document.querySelector("#logout").addEventListener("click", logout);
}
function logout(e) {
  localStorage.clear();
  window.location.reload();
}
function getTasks() {
  if (localStorage.getItem("name") !== null) {
    document.querySelector("#logout").style.display = "block";
  } else {
    document.querySelector("#logout").style.display = "none";
  }
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let name;
  if (localStorage.getItem("name") === null) {
    name = "";
  } else {
    name = JSON.parse(localStorage.getItem("name"));
  }

  document.querySelector("h3").textContent = name;

  if (document.querySelector("h3").textContent) {
    document.querySelector("#name").style.display = "none";
  }

  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement("li");
    //add class to li element
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "X";
    link.style.border = "1px solid orange";
    link.style.padding = "5px";

    //append the link to li
    li.appendChild(link);
    taskList.appendChild(li);
  });
}
function getName(e) {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  localStorage.setItem("name", JSON.stringify(name));

  document.querySelector("h3").textContent =
    "你好," + " " + JSON.parse(localStorage.getItem("name"));
  if (document.querySelector("h3").textContent !== "") {
    document.querySelector("#name").style.display = "none";
    document.querySelector("#logout").style.display = "block";
  }
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("You have to add task");
  }
  let time = prompt("你想要什么时候完成？");

  //create li element
  const li = document.createElement("li");
  //add class to li element
  li.className = "collection-item";
  //create text node and append to li
  // li.appendChild(document.createTextNode(taskInput.value));
  let note = taskInput.value + time;
  li.innerHTML = taskInput.value + time;

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "X";
  link.style.border = "1px solid orange";
  link.style.padding = "5px";

  //append the link to li

  li.appendChild(link);
  taskList.appendChild(li);

  storeTaskInLocalStorage(note);
  taskInput.value = "";
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  console.log(e.target);
  if (e.target.classList.contains("delete-item")) {
    console.log("clicked");
    if (confirm("确定删除?")) {
      e.target.parentElement.remove();
      let tasks;
      if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      console.log(e.target.parentElement.textContent);

      tasks.forEach(function(task, index) {
        if (e.target.parentElement.textContent.includes(task)) {
          tasks.splice(index, 1);
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}

function clearTask(e) {
  // taskList.innerHTML = ''

  //Faster way of doing this
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    localStorage.removeItem("tasks");
  }
}

function filterTask(e) {
  const text = e.target.value;

  document.querySelectorAll(".collection-item").forEach(function(x) {
    const item = x.firstChild.textContent;
    if (item.indexOf(text) != -1) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });
}
