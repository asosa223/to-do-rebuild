export default function Form(appendTo) {
    // Create form
    const formCreate = document.createElement("form");
    formCreate.setAttribute("method", "post");
    formCreate.setAttribute("action", "#");
    formCreate.setAttribute("id", "frm-add-todo"); // ❗️ Make dynamic
    appendTo.appendChild(formCreate);

    // Create label for form element
    const createLabel = (labelFor, labelText) => {
        // Create label
        const label = document.createElement("label");
        label.setAttribute("for", labelFor);
        label.setAttribute("required", "required");
        label.textContent = `${labelText}: `;
        formCreate.appendChild(label);

        return label;
    };

    // Create form element
    const createFormItem = (element, name, type) => {
        const el = document.createElement(element);
        if (type !== undefined) {
            el.setAttribute("type", type);
        }
        el.setAttribute("name", name);
        el.setAttribute("id", `add-todo-${name.toLowerCase()}`);
        el.setAttribute("maxlength", "40");

        // if checkbox, append inside label
        if (type === "checkbox") {
            createLabel(`add-todo-${name.toLowerCase()}`, `${name}`).appendChild(el);
        } else if (element === "textarea") {
            createLabel(`add-todo-${name.toLowerCase()}`, `${name}`);
            el.setAttribute("rows", "3");
            el.setAttribute("cols", "32");
            el.setAttribute("maxlength", "50");
            formCreate.appendChild(el);
        } else {
            createLabel(`add-todo-${name.toLowerCase()}`, `${name}`);
            formCreate.appendChild(el);
        }
    };

    // Create overlay container for buttons
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-overlay-container"); // ❗️ Move to own module
    appendTo.appendChild(btnContainer); // ❗️ Move to own module

    // Create button for add to-do overlay
    const createFormBtn = (text, type) => {
        const btn = document.createElement("button");
        if (type !== undefined) {
            btn.setAttribute("type", type.toLowerCase());
        } else {
            btn.setAttribute("type", "button");
        }
        btn.setAttribute("id", `btn-overlay-${text.toLowerCase()}`);
        btn.classList.add("btn-overlay");
        btn.textContent = text;
        btnContainer.appendChild(btn);
    };

    return { createFormItem, createFormBtn };
}
