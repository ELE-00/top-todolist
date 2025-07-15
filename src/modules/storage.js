

/// PROJECTS

export function addProjectToStorage(newProject) {
  const projects = getAllProjects();
  projects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function saveProjectID(projectId) {
  localStorage.setItem("projectId", projectId);
}

export function getNextProjectId() {
  const projects = getAllProjects();
  if (projects.length === 0) return 1;
  return Math.max(...projects.map(p => Number(p.id))) + 1;
}


export function getAllProjects() {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
}

export function getProjectbyId(projectId) { 
  const projects = getAllProjects();
  return projects.find(project => String(project.id) === String(projectId));
}


export function deleteProject(projectId) {
  let projects = getAllProjects();
  projects = projects.filter(project => String(project.id) !== String(projectId));
  localStorage.setItem("projects", JSON.stringify(projects));

  // Delete all tasks associated with this project
  deleteTasksByProjectId(projectId);

  // Remove saved projectId if it's the one being deleted
  const savedProjectId = localStorage.getItem("projectId");
  if (savedProjectId === String(projectId)) {
    localStorage.removeItem("projectId");
  }
}




///TASKS

export function addTaskToStorage(newTask) {
  const tasks = getAllTasks();
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


export function saveTaskID(taskId) {
  localStorage.setItem("taskId", taskId);
}



export function getAllTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}


export function getTasksbyProjectId(projectId) {
  const allTasks = getAllTasks();
  return allTasks.filter(task => String(task.projectId) === String(projectId));
}


export function getNextTaskId() {
  const tasks = getAllTasks();
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map(t => Number(t.id))) + 1;
}


export function deleteTaskItem(taskId) {
  let tasks = getAllTasks();
  tasks = tasks.filter(task => String(task.id) !== String(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Remove saved taskId if it's the one being deleted
  const savedTaskId = localStorage.getItem("taskId");
  if (savedTaskId === String(taskId)) {
    localStorage.removeItem("taskId");
  }
}


export function updateTaskCompletion(taskId, isCompleted) {
  let tasks = getAllTasks();
  const index = tasks.findIndex(task => String(task.id) === String(taskId));
  if (index !== -1) {
    tasks[index].completed = isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

export function getTaskById(taskId) {
  const tasks = getAllTasks();
  return tasks.find(task => String(task.id) === String(taskId));
}

export function deleteTasksByProjectId(projectId) {
  let tasks = getAllTasks();
  const filteredTasks = tasks.filter(task => String(task.projectId) !== String(projectId));

  // Clear taskId from storage if it belongs to the deleted project
  const savedTaskId = localStorage.getItem("taskId");
  const savedTask = getTaskById(savedTaskId);
  if (savedTask && String(savedTask.projectId) === String(projectId)) {
    localStorage.removeItem("taskId");
  }

  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}