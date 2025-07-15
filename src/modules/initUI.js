import addNewTask from "./task.js";
import { displayContent, initContent, buildMainContent } from "./mainContent.js";
import { getCurrentProject, setCurrentProject } from "./state.js";
import newProject from "./projects.js";
import { renderDashboard } from "./dashboard.js";
import { deleteProject, getAllProjects } from "./storage.js";

// Initialize the Dashboard UI and event listeners (only static buttons here)
export function initUIDash() {
    const newProjectDialog = document.getElementById("newProjectDialog");
    const newProjectBtn = document.getElementById("newProjectBtn");

    newProjectBtn.addEventListener("click", () => {
        document.getElementById("title").value = "";
        newProjectDialog.showModal();
        document.querySelector(".closeBtn").addEventListener("click", () => newProjectDialog.close());

    });

    //Event listener to submit project form
    document.getElementById("newProject").addEventListener("submit", function(event) {
        event.preventDefault();

        const projectTitle = document.getElementById("title").value;
        const projectId = newProject(projectTitle);
        newProjectDialog.close();
        renderDashboard();

        let allProjects = getAllProjects() 
        console.log(allProjects)

        if(allProjects.length === 1) {
            buildMainContent(projectTitle);
        }
        setCurrentProject(projectTitle, projectId);
        displayContent(projectTitle, projectId);
        attachContentListeners();
 
    });

    console.log("✅ Dashboard UI initialized");
}


// Initialize static UI Content (dialogs, etc)
export function initUIContent() {
    const newTaskDialog = document.getElementById("newTaskDialog");
    
    // Close button inside new task dialog (static)
    document.querySelector(".taskcloseBtn").addEventListener("click", () => newTaskDialog.close());

    console.log("✅ Content UI initialized");
}

// Attach listeners to dynamic content buttons after UI rebuild
export function attachContentListeners() {
    const newTaskDialog = document.getElementById("newTaskDialog");
    const newTaskForm = document.getElementById("newTaskForm");
    const deleteProjectBtn = document.getElementById("deleteProjectBtn");


    // Apply the same logic to both the button and the icon
    const taskTriggers = ["projAddBtn", "addTaskIcon"];
    taskTriggers.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);
            clone.addEventListener("click", () => {
                newTaskDialog.showModal();
                // Reset form values when opening dialog
                document.getElementById("itemTitle").value = "";
                document.getElementById("itemDesc").value = "";
                document.getElementById("itemDueDate").value = "";
                document.getElementById("itemPriority").value = "";
            });
        }
    });


    
    if (newTaskForm) {
        const newTaskFormClone = newTaskForm.cloneNode(true);
        newTaskForm.parentNode.replaceChild(newTaskFormClone, newTaskForm);
        newTaskFormClone.addEventListener("submit", function(event) {
            event.preventDefault();

            const { id, name } = getCurrentProject();

            const itemTitle = document.getElementById("itemTitle").value;
            const itemDesc = document.getElementById("itemDesc").value;
            const itemDueDate = document.getElementById("itemDueDate").value;
            const itemPriority = document.getElementById("itemPriority").value;

            addNewTask(id, itemTitle, itemDesc, itemDueDate, itemPriority);
            newTaskDialog.close();
            displayContent(name, id);
            attachContentListeners(); // reattach because content rebuilt
        });
    }

    
    // ✅ Always reattach close button event
    const taskCloseBtn = document.querySelector(".taskcloseBtn");
    if (taskCloseBtn) {
        taskCloseBtn.addEventListener("click", () => newTaskDialog.close());
    }

    const deleteProjectTriggers = ["deleteProjectBtn", "projDelIcon"];

    deleteProjectTriggers.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);

            clone.addEventListener("click", () => {
                const { id, name } = getCurrentProject();
                deleteProject(id);

                const allProjects = getAllProjects();
                renderDashboard();

                if (allProjects.length === 0) {
                    initContent();
                    setCurrentProject("", "");
                } else {
                    setCurrentProject(allProjects[0].name, allProjects[0].id);
                    displayContent(allProjects[0].name, allProjects[0].id);
                    attachContentListeners();
                }
            });
        }
    });

}

