// eslint-disable-next-line import/no-extraneous-dependencies
import { parseISO, format } from "date-fns";
import handleForm from "./handleForm";
import handleToDo from "./handleToDo";
import todos from "./todos";

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
                console.log(todos);
                // remove overlay-container-show class to remove overlay
                if (overlayContainerAddToDo.classList.contains("overlay-container-show")) {
                    overlayContainerAddToDo.classList.remove("overlay-container-show");
                }
            });
        })();
    })();

    (function detailsOverlay() {
        // Create container for our details overlay
        const overlayContainerDetails = document.createElement("div");
        overlayContainerDetails.classList.add("overlay-container-details"); // ❗️ Change class
        document.body.insertBefore(overlayContainerDetails, content);

        // create a container for our details content
        const overlayContentDetails = document.createElement("div");
        overlayContentDetails.classList.add("overlay-content-details"); // ❗️ Change class
        overlayContainerDetails.appendChild(overlayContentDetails);

        // Create elements to display our todo details
        const detailTitle = document.createElement("p");
        const detailDescription = document.createElement("p");
        const detailDue = document.createElement("p");
        const detailUrgent = document.createElement("p");
        const closeDetailsBtn = document.createElement("button");
        closeDetailsBtn.innerText = "x";

        // Look for when the todo details button is clicked
        document.addEventListener("click", (e) => {
            const detailsClicked = e.target;

            if (detailsClicked.classList.contains("todo-details-btn")) {
                overlayContainerDetails.classList.add("overlay-container-show");

                // Loop through todos array
                todos.forEach((todo) => {
                    // Store todo object values
                    const id = Object.values(todo)[0];
                    const titleForDetail = Object.values(todo)[1];
                    const descriptionForDetail = Object.values(todo)[2];
                    const dueForDetail = Object.values(todo)[3];
                    const urgent = Object.values(todo)[4];
                    const isUrgent = urgent ? "Yes" : "No";

                    // If the details button id matches the same todo object id, then populate that objects values into overlay
                    if (detailsClicked.id === `todo-details-${id}`) {
                        detailTitle.innerText = titleForDetail;
                        detailDescription.innerText = `Notes: ${descriptionForDetail}`;
                        detailDue.innerText = `Due: ${format(dueForDetail, "M/d/yyyy")}`;
                        detailUrgent.innerText = `Urgent: ${isUrgent}`;
                    }
                });
                overlayContentDetails.appendChild(detailTitle);
                overlayContentDetails.appendChild(detailDescription);
                overlayContentDetails.appendChild(detailDue);
                overlayContentDetails.appendChild(detailUrgent);
                overlayContentDetails.appendChild(closeDetailsBtn);

                closeDetailsBtn.addEventListener("click", () => {
                    if (overlayContainerDetails.classList.contains("overlay-container-show")) {
                        overlayContainerDetails.classList.remove("overlay-container-show");
                    }
                });
            }
        });
    })();
}
