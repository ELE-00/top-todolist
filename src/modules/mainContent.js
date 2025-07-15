//UIcontner.js
import {getTasksbyProjectId, deleteTaskItem, getAllTasks} from "./storage.js";
import {initUIContent} from "./initUI.js";


export function initContent() {
    const mainContentContainer = document.querySelector(".contentContainer");
    mainContentContainer.innerHTML = `
        <div class="initialMessage">
            <h2>Oh la la! Looks like you dont have any projects!</h2>
            <p>Click '+' on the dashboard to get started :).</p>
        </div>
    `;
}




export function buildMainContent(projectName = "") {
    const contentContainer = document.querySelector(".contentContainer");
    if (!contentContainer) {
        console.error("❌ .contentContainer not found in the DOM");
        return;
    }

    // Clear any previous content
    contentContainer.innerHTML = "";

    // Create projectTitle
    const projectTitle = document.createElement("div");
    projectTitle.className = "projectTitle";
    projectTitle.id = "projectTitle";
    projectTitle.textContent = projectName;



    // Create headerBtnContainer
    const headerBtnContainer = document.createElement("div");
    headerBtnContainer.className = "headerBtnContainer";
    
    // Create addTaskBtnContainer
    const addTaskBtnContainer = document.createElement("div");
    addTaskBtnContainer.className = "addTaskBtnContainer";

    // AddTask SVG
    const addTaskIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    addTaskIcon.setAttribute("id", "addTaskIcon");
    addTaskIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    addTaskIcon.setAttribute("viewBox", "0 0 24 24");
    addTaskIcon.innerHTML = `<path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />`;

    // AddTask Button
    const addTaskBtn = document.createElement("button");
    addTaskBtn.className = "projAddBtn";
    addTaskBtn.id = "projAddBtn";
    addTaskBtn.textContent = "Add task";

    // Create BtnContainer
    const delProjBtnContainer = document.createElement("div");
    delProjBtnContainer.className = "delProjBtnContainer";

    // DeleteProject SVG
    const deleteProjectBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    deleteProjectBtn.setAttribute("id", "projDelIcon");
    deleteProjectBtn.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    deleteProjectBtn.setAttribute("viewBox", "0 0 24 24");
    deleteProjectBtn.innerHTML = `<path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />`;
    
    // AddTask Button
    const delprojBtn = document.createElement("button");
    delprojBtn.className = "deleteProjectBtn";
    delprojBtn.id = "deleteProjectBtn";
    delprojBtn.textContent = "Delete Project";




    // Append buttons to containers
    addTaskBtnContainer.appendChild(addTaskIcon);
    addTaskBtnContainer.appendChild(addTaskBtn);
    delProjBtnContainer.appendChild(delprojBtn);
    delProjBtnContainer.appendChild(deleteProjectBtn);

    
    headerBtnContainer.appendChild(addTaskBtnContainer);
    headerBtnContainer.appendChild(delProjBtnContainer);

    // Separator
    const separator = document.createElement("div");
    separator.className = "seperator";

    // Task container
    const taskContainer = document.createElement("div");
    taskContainer.className = "taskContainer";

    // Append all to contentContainer
    contentContainer.appendChild(projectTitle);
    contentContainer.appendChild(headerBtnContainer);
    contentContainer.appendChild(separator);
    contentContainer.appendChild(taskContainer);
};




//Renders the main content
export function displayContent(projectName, id){
    buildMainContent(projectName);

    //Render today tasks

    let tasks = []
    

    if (id === "today") {
        const today = new Date().toISOString().split("T")[0];
        console.log("Filtering today tasks:", today);
        tasks = getAllTasks().filter(task => task.dueDate === today);
    } else if (id === "upcoming") {
        const today = new Date().toISOString().split("T")[0];
        console.log("Filtering upcoming tasks after:", today);
        tasks = getAllTasks().filter(task => task.dueDate > today);
    } else {
        console.log("Filtering tasks for project id:", id);
        tasks = getTasksbyProjectId(id);
    }
    console.log("Filtered tasks:", tasks);

    tasks.forEach(task => {

        const tasksContainer = document.querySelector(".taskContainer");

        const taskCBSection = document.createElement("div");
        taskCBSection.classList.add("taskCBSection")

        const taskItemSection = document.createElement("div");
        taskItemSection.classList.add("taskItemSection")

        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("taskItemContainer")

        const itemTopContainer = document.createElement("div");
        itemTopContainer.classList.add("itemTopContainer")
        
        const itemMidContainer = document.createElement("div");
        itemMidContainer.classList.add("itemMidContainer")

        const itemBottomContainer = document.createElement("div");
        itemBottomContainer.classList.add("itemBottomContainer")
        

        const completed = document.createElement("input");
        completed.classList.add("taskCB")
        completed.type = "checkbox"


        const taskTitle = document.createElement("div");
        taskTitle.classList.add("taskTitle")
        taskTitle.textContent = task.title;

        const descSubHeader = document.createElement("div");
        descSubHeader.classList.add("subheaders")
        descSubHeader.textContent = "Description: ";

        const taskDesc = document.createElement("div");
        taskDesc.classList.add("taskDesc")
        taskDesc.textContent = task.description;

        const dateSubHeader = document.createElement("div");
        dateSubHeader.classList.add("subheaders")
        dateSubHeader.textContent = "Due Date: ";

        const taskdueDate = document.createElement("div");
        taskdueDate.classList.add("dueDate")
        taskdueDate.textContent = task.dueDate;

        const prioritySubHeader = document.createElement("div");
        prioritySubHeader.classList.add("subheaders")
        prioritySubHeader.textContent = "Priority: ";;

        const taskpriority = document.createElement("div");
        taskpriority.classList.add("priority");

        // Add priority class based on value
        if (task.priority.toLowerCase() === "urgent") {
            taskpriority.classList.add("priority-urgent");
        } else if (task.priority.toLowerCase() === "important") {
            taskpriority.classList.add("priority-important");
        } else if (task.priority.toLowerCase() === "low priority") {
            taskpriority.classList.add("priority-low");
        } else {
            taskpriority.classList.add("priority-normal");
        }

        taskpriority.textContent = task.priority;





        // "X" icon to remove book    
        const svgNS = "http://www.w3.org/2000/svg";

        // Create the <svg> element with namespace
        const svgCloseIcon = document.createElementNS(svgNS, "svg");
        svgCloseIcon.classList.add("deleteIcon");
        svgCloseIcon.setAttribute("viewBox", "0 0 24 24");

        // Create the <path> element with namespace
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z");
        svgCloseIcon.dataset.id = task.id;

        svgCloseIcon.addEventListener("click", () => {
            console.log("Sending task id: " + task.id)
            deleteTaskItem(task.id);
            displayContent(projectName, id);
            initUIContent();
        });

        svgCloseIcon.appendChild(path);

        itemTopContainer.appendChild(taskTitle)
        itemTopContainer.appendChild(svgCloseIcon);

        itemMidContainer.appendChild(descSubHeader)
        itemMidContainer.appendChild(taskDesc)
        itemBottomContainer.appendChild(dateSubHeader)
        itemBottomContainer.appendChild(taskdueDate)
        itemBottomContainer.appendChild(prioritySubHeader)
        itemBottomContainer.appendChild(taskpriority)

        taskCBSection.appendChild(completed)
        taskItemSection.appendChild(itemTopContainer)
        taskItemSection.appendChild(itemMidContainer)
        taskItemSection.appendChild(itemBottomContainer)

        taskItemContainer.appendChild(taskCBSection)
        taskItemContainer.appendChild(taskItemSection)
        tasksContainer.appendChild(taskItemContainer)
  
    })};



