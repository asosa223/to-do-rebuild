// eslint-disable-next-line import/no-extraneous-dependencies
import parseISO from "date-fns/parseISO";
import handleForm from "./handleForm";
import handleToDo from "./handleToDo";

export default function handleOverlays() {
    const content = document.querySelector(".content");

    (function addToDoOverlay() {
        const overlayContainerAddToDo = document.createElement("div");
        overlayContainerAddToDo.classList.add("overlay-container"); // ❗️ Change class
        document.body.insertBefore(overlayContainerAddToDo, content);

        const overlayContent = document.createElement("div");
        overlayContent.classList.add("overlay-content"); // ❗️ Change class
        overlayContainerAddToDo.appendChild(overlayContent);

        // Handle to-do button to add overlay
        const addToDoBtn = document.querySelector("#btn-add-todo");

        // Add class to show the add To Do overlay
        addToDoBtn.addEventListener("click", () => {
            overlayContainerAddToDo.classList.add("overlay-container-show");
        });

        // Add form to overlay
        const addToDoForm = handleForm(overlayContent);
        addToDoForm.createFormItem("input", "Title", "input");
        addToDoForm.createFormItem("textarea", "Description");
        addToDoForm.createFormItem("input", "Date", "date");
        addToDoForm.createFormItem("input", "Urgent", "checkbox");
        addToDoForm.createFormBtn("Cancel");
        addToDoForm.createFormBtn("Add");

        (function handleBtns() {
            const cancelBtn = document.querySelector("#btn-overlay-cancel");
            const addBtn = document.querySelector("#btn-overlay-add");

            // When cancel is clicked, remove overlay-container-show class
            cancelBtn.addEventListener("click", () => {
                if (overlayContainerAddToDo.classList.contains("overlay-container-show")) {
                    overlayContainerAddToDo.classList.remove("overlay-container-show");
                }
            });

            // will hold count of added items
            let count = 0;

            // When add button is clicked:
            // pass information and create to-do object
            // display to-do object
            addBtn.addEventListener("click", () => {
                // select form
                const selectForm = document.querySelector("#frm-add-todo");

                // pass form data
                const title = selectForm.elements["add-todo-title"];
                const description = selectForm.elements["add-todo-description"];
                const d = selectForm.elements["add-todo-date"];
                const urgent = selectForm.elements["add-todo-urgent"];
                const date = parseISO(d.value); // Change user input into ISO midnight time

                // Pass values to create todo
                handleToDo().ToDo(count, title.value, description.value, date, urgent.checked).displayToDo();

                // clear form input
                title.value = "";
                description.value = "";
                d.value = "";
                urgent.checked = false;

                // Increase click count
                count++;

                // remove overlay-container-show class to remove overlay
                if (overlayContainerAddToDo.classList.contains("overlay-container-show")) {
                    overlayContainerAddToDo.classList.remove("overlay-container-show");
                }
            });
        })();
    })();
}
