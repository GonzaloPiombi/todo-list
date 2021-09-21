import { Project } from './tasks';
import UI from './tasksUI';

class ProjectUI {

    static addProjectButtonEvent() {
        const addProjectButton = document.querySelector('#add-project-button');
        addProjectButton.addEventListener('click', e => {
            e.preventDefault();
            const info = ProjectUI.getInformation();
            const project = ProjectUI.addProject(info.title, info.description, info.dueDate);
            ProjectUI.generateProject(project);
        });
    }

    static getInformation() {
        const formInfo = document.querySelectorAll('input');
        const title = formInfo[4].value;
        const description = formInfo[5].value;
        const dueDate = formInfo[6].value;
        return {title, description, dueDate};
    }

    static addProject(title, description, dueDate) {
        const newProject = new Project(title, description, dueDate);
        newProject.addToArray();
        return newProject;
    }

    static generateProject(obj) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        const option = document.createElement('option');
        
        link.setAttribute('href', '#');
        link.textContent = obj.title;
        option.textContent = obj.title;
        option.value = obj.title;

        document.querySelector('.projects ul').appendChild(li);
        li.appendChild(link);
        document.querySelector('select').appendChild(option)

        ProjectUI.displayProject(link, obj);
    }

    static displayProject(projectButton, project) {
        projectButton.addEventListener('click', (e) => {
            document.querySelector('.tasks').textContent = '';
            project.tasks.forEach(task =>{
                const buttons = UI.generateTask(task);
                UI.removeTask(buttons.removeButton);
                UI.editTask(buttons.editButton);
            });
        });
    }
}

export default ProjectUI;