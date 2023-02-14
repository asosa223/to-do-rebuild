import "./style.css";
import handleOverlays from "./handleOverlays";
import handleTabs from "./handleTabs";

(function () {
    // load all of our components
    handleOverlays();
    handleTabs();
})();

/**
 * Add a complete checkbox to todos display
 * * When complete box is checked, add indication that task is complete(Ex: line across, check mark)
 * -----------------------------------------------------------------------
 * Add details button to todos display
 * * When button is clicked, overlay showing title, notes, due, urgent should show
 * -----------------------------------------------------------------------
 * Add edit button to todos display
 * * When edit button is clicked, open todo info to edit title, notes, due date, urgent
 * -----------------------------------------------------------------------
 * Add a create project button
 * * When clicked, user can give title to project
 * * * When adding todo, user will have option to select project or home default
 * * * * todo will then be added to respective project
 * * * * will need to add tab functionality to project selected
 */
