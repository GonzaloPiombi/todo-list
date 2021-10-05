import ProjectUI from './projectUI';
import { Project, Task } from './tasks';
import UI from './tasksUI';

function setStorage() {
    localStorage.setItem('tasks', JSON.stringify(Task.tasks));
    localStorage.setItem('projects', JSON.stringify(Project.projects));
}

function getStorage() {
    getTasks();
    getProjects();
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    for (let i = 0; i < tasks.length; i++) {
        Task.tasks.push(tasks[i])        
        displayTask(tasks[i]);
    }
}

function displayTask(task) {
    const buttons = UI.generateTask(task);
    UI.removeTask(buttons.removeButton, buttons.checkbox);
    UI.editTask(buttons.editButton);
}

function getProjects() {
    let projects = localStorage.getItem('projects');
    projects = JSON.parse(projects);
    
    for (let i = 0; i < projects.length; i++) {
        Project.projects.push(projects[i]);
        displayProject(projects[i]);
    }
}

function displayProject(obj) {
    ProjectUI.generateProject(obj);
}

export {
    setStorage,
    getStorage
}