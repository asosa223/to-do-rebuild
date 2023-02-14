// eslint-disable-next-line import/no-extraneous-dependencies
import format from "date-fns/format";
import todos from "./todo";

export default function handleToDo() {
    const mainContent = document.querySelector(".main-content");

    const ToDo = (id, title, description, due, urgent) => {
        // Get our elements
        const todoContainer = document.createElement("div");
        const ti = document.createElement("p");
        const desc = document.createElement("p");
        const du = document.createElement("p");
        const removeButton = document.createElement("button");

        const setValues = () => {
            ti.innerText = title;
            desc.innerText = description;
            du.innerText = format(due, "M/d/yyyy");
            removeButton.innerText = "Del";
        };

        const append = () => {
            setValues();

            // Add class and id to each todo
            todoContainer.classList.add("todo");
            todoContainer.setAttribute("id", `todo-${id}`);

            todoContainer.appendChild(ti);
            todoContainer.appendChild(desc);
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
