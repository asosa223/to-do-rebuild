// eslint-disable-next-line import/no-extraneous-dependencies
import { parseISO, format } from "date-fns";

export default function handleToDo() {
    let todos = [];

    // Select our add todo form container
    const addToDoContainer = document.querySelector(".add-todo-overlay-container");
    const addTodoForm = document.querySelector("#frm-add-todo");
    const closeButton = document.querySelector("#btn-overlay-cancel");

    function displayTodos() {
        // Select and clear the main content area for our todos loop
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";

        // Loop through all of our todos and display their content
        todos.forEach((todo) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");

            // Create elements
            const content = document.createElement("div");
            const actions = document.createElement("div");
            const titleInput = document.createElement("input");
            const dateInput = document.createElement("input");
            const detailsButton = document.createElement("button");
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            content.classList.add("todo-content");
            actions.classList.add("todo-actions");

            const formattedDate = format(todo.due, "yyyy-MM-dd");

            // Set element values
            titleInput.type = "text";
            titleInput.value = todo.title;
            titleInput.id = "content-title";
            titleInput.setAttribute("readonly", true);

            dateInput.type = "date";
            dateInput.value = formattedDate;
            dateInput.id = "content-due";
            dateInput.setAttribute("readonly", true);

            detailsButton.textContent = "Details";
            editButton.textContent = "Edit";
            deleteButton.textContent = "Delete";

            // Append to main content
            content.appendChild(titleInput);
            content.appendChild(dateInput);
            actions.appendChild(editButton);
            actions.appendChild(detailsButton);
            actions.appendChild(deleteButton);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);
            mainContent.appendChild(todoItem);

            // When details is clicked, display todo details
            detailsButton.addEventListener("click", () => {
                const detailsOverlay = document.querySelector(".details-overlay-container");
                detailsOverlay.classList.add("overlay-container-show");

                // Create elements for details overlay
                const detailsContent = document.createElement("div");
                const detailsTitle = document.createElement("div");
                const detailsDescription = document.createElement("div");
                const detailsDue = document.createElement("div");
                const detailsUrgent = document.createElement("div");
                const detailsCloseButton = document.createElement("button");

                detailsContent.classList.add("details-overlay-content");

                // Set details values
                detailsTitle.textContent = todo.title;
                detailsDescription.textContent = todo.description;
                detailsDue.textContent = format(todo.due, "M/d/yyyy");
                detailsUrgent.textContent = todo.urgent ? "Yes" : "No";
                detailsCloseButton.textContent = "Close";

                // Append to details overlay
                detailsContent.appendChild(detailsTitle);
                detailsContent.appendChild(detailsDescription);
                detailsContent.appendChild(detailsDue);
                detailsContent.appendChild(detailsUrgent);
                detailsContent.appendChild(detailsCloseButton);
                detailsOverlay.appendChild(detailsContent);

                // If close button is clicked, remove show class
                detailsCloseButton.addEventListener("click", () => {
                    if (detailsOverlay.classList.contains("overlay-container-show")) {
                        detailsOverlay.classList.remove("overlay-container-show");
                    }
                });
            });

            editButton.addEventListener("click", () => {
                const inputs = content.querySelectorAll("input");
                const contentTitle = content.querySelector("#content-title");
                const contentDue = content.querySelector("#content-due");

                inputs.forEach((input) => {
                    input.removeAttribute("readonly");
                    contentTitle.focus();
                    contentTitle.style.background = "red";
                    contentDue.style.background = "red";
                    contentTitle.addEventListener("blur", (e) => {
                        contentTitle.setAttribute("readonly", true);
                        todo.title = e.target.value;
                        contentDue.addEventListener("blur", (el) => {
                            contentTitle.setAttribute("readonly", true);
                            todo.due = parseISO(el.target.value);
                            displayTodos();
                        });
                    });
                });
            });

            // When delete button is clicked, remove our todo
            deleteButton.addEventListener("click", () => {
                todos = todos.filter((t) => t !== todo);
                displayTodos();
            });
        });
    }

    // When form is submitted, todo object is created, pushed into array and displayed
    addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const todo = {
            title: e.target.elements.title.value,
            description: e.target.elements.description.value,
            due: parseISO(e.target.elements.due.value),
            urgent: e.target.elements.urgent.checked,
        };

        todos.push(todo);

        e.target.reset();

        if (addToDoContainer.classList.contains("overlay-container-show")) {
            addToDoContainer.classList.remove("overlay-container-show");
        }

        displayTodos();
        console.log(todos);
    });

    // If close button is clicked, remove show class
    closeButton.addEventListener("click", () => {
        if (addToDoContainer.classList.contains("overlay-container-show")) {
            addToDoContainer.classList.remove("overlay-container-show");
        }
    });
}
