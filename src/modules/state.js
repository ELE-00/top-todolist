//state.js


let currentProjectId = "";
let currentProjectName = "";



export function setCurrentProject(name, id) {
  currentProjectName = name;
  currentProjectId = id;
  
    console.log("Set Project ID: " + currentProjectId)
    console.log("Set Project name: " + currentProjectName)

}

export function getCurrentProject() {
  return {
  id: currentProjectId, 
  name: currentProjectName,
  }
}

