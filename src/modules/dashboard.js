import { getAllProjects } from "./storage.js";
import { displayContent, initContent } from "./mainContent.js";
import { setCurrentProject } from "./state.js";
import { attachContentListeners } from "./initUI.js";

export function renderDashboard() {
    const projectItemContainer = document.querySelector(".projectItemContainer");
    const todayBtn = document.getElementById("todayBtn");
    const upcomingBtn = document.getElementById("upcomingBtn");

    
    todayBtn.addEventListener("click", () => {
        const todayTasks = { id: "today", name: "Today" };
        displayContent(todayTasks.name, todayTasks.id);
    });
    

    upcomingBtn.addEventListener("click", () => {
        const upComingTasks = { id: "upcoming", name: "Upcoming" };
        displayContent(upComingTasks.name, upComingTasks.id);
    });

    
    
    projectItemContainer.innerHTML = "";

    const projects = getAllProjects();
    console.log(projects)

    projects.forEach((project) => {
        const projectItem = document.createElement("li");
        projectItem.classList.add("projectsList");
        projectItem.textContent = project.name;

        projectItem.addEventListener("click", () => {
            console.log("Clicked project: " + project.id)
            console.log("Clicked project: " + project.name)
            
            setCurrentProject(project.name, project.id);
            displayContent(project.name, project.id);
            attachContentListeners();
            console.log("Added to dash :" + project.name)
        });

        projectItemContainer.appendChild(projectItem);
    });

    if (projects.length === 0) {
        initContent();
        setCurrentProject("", "");
    } else {
        setCurrentProject(projects[0].name, projects[0].id);
        displayContent(projects[0].name, projects[0].id);
        attachContentListeners();
    }
}
