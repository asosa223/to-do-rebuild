// eslint-disable-next-line import/no-extraneous-dependencies
import format from "date-fns/format";
import todos from "./todos";

export default function handleToDo() {
    const mainContent = document.querySelector(".main-content");

    const ToDo = (id, title, description, due, urgent) => {
        // Get our elements
        const todoContainer = document.createElement("div");
        // Add class and id to each todo
        todoContainer.classList.add("todo");
        todoContainer.setAttribute("id", `todo-${id}`);

        const ti = document.createElement("p");

        const detailsButton = document.createElement("button");
        detailsButton.classList.add("todo-details-btn");
        detailsButton.setAttribute("id", `todo-details-${id}`);

        const editButton = document.createElement("button");
        editButton.classList.add("todo-edit-btn");
        editButton.setAttribute("id", `todo-edit-${id}`);

        const du = document.createElement("p");
        const removeButton = document.createElement("button");

        const setValues = () => {
            ti.innerText = title;
            detailsButton.innerText = "Details";
            du.innerText = format(due, "M/d/yyyy");
            removeButton.innerText = "Del";
        };

        const append = () => {
            setValues();

            todoContainer.appendChild(ti);
            todoContainer.appendChild(detailsButton);
            todoContainer.appendChild(editButton);
            todoContainer.appendChild(du);
            todoContainer.appendChild(removeButton);
        };

        const removeToDo = () => {
            // When remove button is clicked, remove same todo element
            removeButton.addEventListener("click", () => {
                todoContainer.remove(`todo-${id}`);

                // iterate through todos array backwards and splice item with matching id
                for (let i = todos.length - 1; i >= 0; --i) {
                    if (todos[i].id === id) {
                        todos.splice(i, 1);
                    }
                }
            });
        };

        // if urgent is checks, add our urgent class
        const handleUrgent = () => {
            if (urgent === true) {
                todoContainer.classList.add("todo-urgent");
            }
        };

        const displayToDo = () => {
            append();
            removeToDo();
            handleUrgent();
            mainContent.appendChild(todoContainer);
        };

        todos.push({ id, title, description, due, urgent, displayToDo });
        return { displayToDo };
    };

    return { mainContent, ToDo };
}
