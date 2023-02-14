// eslint-disable-next-line import/no-extraneous-dependencies
import { endOfWeek, isSameDay } from "date-fns";
import handleToDo from "./handleToDo";
import todos from "./todo";

// Handle todays to-dos display
export default function handleTabs() {
    // Select add todo button
    const addTodoBtn = document.querySelector(".btn-add-todo");

    // Get current day and set time to midnight
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Get end of current week and set time to midnight
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
    endOfCurrentWeek.setHours(0, 0, 0, 0);

    // Reassign main content element
    const content = handleToDo().mainContent;

    (function homeTab() {
        // Select home tab
        const navHome = document.querySelector("#nav-item-home");

        // When home tab is clicked, display all todos
        navHome.addEventListener("click", () => {
            // If add todo button is hidden, remove the hiding class
            if (addTodoBtn.classList.contains("btn-add-todo-hide")) {
                addTodoBtn.classList.remove("btn-add-todo-hide");
            }

            // Remove all todos displayed
            while (content.firstChild) {
                content.removeChild(content.lastChild);
            }

            todos.forEach((todo) => {
                todo.displayToDo();
            });
        });
    })();

    (function todayTab() {
        // Select today tab
        const navToday = document.querySelector("#nav-item-today");

        // When today tab is clicked, filter todos into their own array and display them
        navToday.addEventListener("click", () => {
            const todayTodos = todos.filter((el) => isSameDay(el.due, currentDate));

            // Hide add todo button
            addTodoBtn.classList.add("btn-add-todo-hide");

            // Remove all todos displayed
            while (content.firstChild) {
                content.removeChild(content.lastChild);
            }

            todayTodos.forEach((todo) => {
                todo.displayToDo();
            });
        });
    })();

    (function weekTab() {
        // Select week tab
        const navWeek = document.querySelector("#nav-item-week");

        // When week tab is clicked, filter todos into their own array and display them
        navWeek.addEventListener("click", () => {
            const weekTodos = todos.filter((el) => el.due <= endOfCurrentWeek);

            // Hide add todo button
            addTodoBtn.classList.add("btn-add-todo-hide");

            // Remove all todos displayed
            while (content.firstChild) {
                content.removeChild(content.lastChild);
            }

            weekTodos.forEach((todo) => {
                todo.displayToDo();
            });
        });
    })();
}
