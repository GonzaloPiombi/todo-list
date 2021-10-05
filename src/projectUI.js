import { setStorage } from './storage';
import { Task, Project } from './tasks';
import UI from './tasksUI';

class ProjectUI {

    static currentTabButton = '';

    static displayModal() {
        const newProjectButton = document.querySelector('.new-project-button');
        newProjectButton.addEventListener('click', () => {
            document.querySelector('.project-modal').style = 'display: block';
        });
    }

    static addProjectButtonEvent() {
        const addProjectButton = document.querySelector('#add-project-form');
        addProjectButton.addEventListener('submit', e => {
            e.preventDefault();
            const info = ProjectUI.getInformation();
            if (Project.checkExistingProject(info.title)) {
                return alert('Project already exists!');
            } else {
                document.querySelector('.project-modal').style.display = "none";
                document.querySelector('#add-project-form').reset();
                const project = ProjectUI.addProject(info.title);
                ProjectUI.generateProject(project);
            }
        });
    }

    static getInformation() {
        const formInfo = document.querySelectorAll('input');
        const title = formInfo[2].value;
        return {title};
    }

    static addProject(title) {
        const newProject = new Project(title);
        newProject.addToArray();
        setStorage();
        return newProject;
    }

    static generateProject(obj) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        const deleteButton = document.createElement('button');
        const option = document.createElement('option');
        
        link.setAttribute('href', '#');
        link.textContent = obj.title;
        deleteButton.textContent = 'X';
        option.textContent = obj.title;
        option.value = obj.title;

        document.querySelector('.projects ul').appendChild(li);
        li.appendChild(link);
        li.appendChild(deleteButton);
        document.querySelectorAll('select')[1].appendChild(option)

        ProjectUI.displayProject(link, obj);
        ProjectUI.removeProject(deleteButton, obj);
    }

    static displayProject(projectButton, project) {
        projectButton.addEventListener('click', () => {
            ProjectUI.display(projectButton, project);
        });
    }

    static display(projectButton, project) {
        document.querySelector('.tasks').textContent = '';
        const title = document.createElement('h1');
        title.textContent = project.title;
        document.querySelector('.tasks').appendChild(title);

        UI.checkActiveClass();
        projectButton.parentNode.classList.add('active');

        project.tasks.forEach(task =>{
            const buttons = UI.generateTask(task);
            UI.removeTask(buttons.removeButton, buttons.checkbox);
            UI.editTask(buttons.editButton);
        });
        UI.currentTab = project;
        ProjectUI.currentTabButton = projectButton;
    }

    static removeProject(button, obj) {
        button.addEventListener('click', (e) => {
            //Remove Project from sidebar.
            e.path[1].remove();

            //Remove Tasks from said project from the UI.
            const index = Project.projects.findIndex(project => project === obj);
            Project.projects[index].tasks.forEach(task => {
                document.querySelectorAll('.task-container').forEach(div => {
                    if (task.id === div.id) {
                        div.remove();
                    }
                });
            });

            //Remove project from the Project.projects array.
            Project.removeFromArray(index);

            //Remove the option in the select menu with the project's name.
            document.querySelectorAll('option').forEach(option => {
                if (option.textContent === obj.title) {
                    option.remove();
                }
            });
            setStorage();
        });
    }
}

export default ProjectUI;