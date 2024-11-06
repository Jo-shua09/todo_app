import message, {
  generateID,
  createTag,
  deleteTodo,
  getTodo,
  setTodo,
  PageReload,
} from "./extra.js";
message();

let todoList = getTodo();
let errors = [];
const form = document.forms.todoFrm;
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let formData = new FormData(evt.target);
  formData.append("id", generateID(todoList));
  let actualData = {};
  let values = ["id", "title", "description"];
  values.forEach((value) => {
    if (formData.has(value)) {
      let deValue = formData.get(value).trim();
      if (deValue === "") {
        errors.push(`${value} is require`);
      }
      actualData[value] = deValue;
    }
  });
  if (errors.length == 0) {
    setTodo([...todoList, actualData]);
    PageReload();
  } else {
    console.log(errors);
  }
  evt.target.reset();
});
const showTodoList = (list = [], element) => {
  if (list.length) {
    let tab = document.querySelector("#target table");
    let table = createTag("table", { border: 1, width: "100%" });
    let tr = createTag("tr");
    tr.innerHTML = `
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Action</th>
  `;
    table.appendChild(tr);
    list.forEach((todo) => {
      let tr = createTag("tr");

      Object.values(todo).forEach((prop) => {
        let td = createTag("td", {}, prop);
        tr.appendChild(td);
      });
      let td = createTag("td");
      let button = createTag("button", {}, "delete");
      button.addEventListener("click", () => {
        if (confirm("Sure you want to Delete Todo ?", "")) {
          let newList = deleteTodo(todoList, todo.id);

          todoList = [...newList];
          setTodo(todoList);
          PageReload();
        }
        return;
      });
      td.appendChild(button);
      tr.appendChild(td);
      table.appendChild(tr);
    });
    console.log(table);
    tab === null
      ? element.appendChild(table)
      : element.replaceChild(table, tab);
    // element.appendChild(table);
  }
};

let target = document.querySelector("#target");
showTodoList(todoList, target);
