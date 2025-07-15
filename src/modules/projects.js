import { getAllProjects, saveProjectID } from "./storage.js";
import { addProjectToStorage } from "./storage.js";

export default function newProject(name) {
    
  function getNextId() {
    let id = Number(localStorage.getItem("projectId") || "0");
    id++;
    saveProjectID(id);
    return id;
  }

  const newProject = {
    id: getNextId(),
    name: name,
  };

  // Save the new project object directly (it handles adding to array)
  addProjectToStorage(newProject);

  return newProject.id;
}