const showMessage = () => {
  console.log("A message is here for you !");
};

export const generateID = (list = []) => {
  let id = null;
  if (list.length === 0) {
    id = 1;
  } else if (list.length >= 1) {
    id = parseInt(list[list.length - 1].id) + 1;
  }
  return id;
};

export const createTag = (name, attr = {}, value = "") => {
  let tag = document.createElement(name);
  if (value !== undefined) {
    let textNode = document.createTextNode(value);
    tag.appendChild(textNode);
  }
  if (typeof attr === "object") {
    let props = Object.keys(attr),
      values = Object.values(attr);
    if (props.length) {
      props.forEach((prop, index) => {
        tag.setAttribute(prop, values[index]);
      });
    }
  }
  return tag;
};

export const deleteTodo = (list, id) => {
  let newList = list.filter((todo) => todo.id !== id);
  return newList;
};
export const PageReload = () => {
  window.location.reload();
};
export const setTodo = (todoLt) => {
  localStorage.setItem("todo", JSON.stringify(todoLt));
};
export const getTodo = () => {
  let todoList = JSON.parse(localStorage.getItem("todo")) || [];
  return todoList;
};
export default showMessage;
