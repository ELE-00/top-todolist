//task.js

import {getAllTasks, addTaskToStorage, getNextTaskId}  from "./storage.js";

export default function addNewTask (projectId,title,description,dueDate,priority) {

    //New Project
    const newTask = {
        id: getNextTaskId(),
        projectId: projectId,
        title: title,
        description: description,
        dueDate: dueDate,
        priority:  priority,
        completed: false,
    };

  
    //Save updated list
    addTaskToStorage(newTask);

};

