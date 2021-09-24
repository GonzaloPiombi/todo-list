import { Task, Project } from './tasks';
import UI from './tasksUI';

class ProjectUI {

    static addProjectButtonEvent() {
        const addProjectButton = document.querySelector('#add-project-form');
        addProjectButton.addEventListener('submit', e => {
            e.preventDefault();
            const info = ProjectUI.getInformation();
            const project = ProjectUI.addProject(info.title, info.description);
            ProjectUI.generateProject(project);
        });
    }

    static getInformation() {
        const formInfo = document.querySelectorAll('input');
        const title = formInfo[3].value;
        if (Project.checkExistingProject(title)) {
            return alert('Project already exists!');
        }
        const description = formInfo[4].value;
        return {title, description};
    }

    static addProject(title, description) {
        const newProject = new Project(title, description);
        newProject.addToArray();
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
        projectButton.addEventListener('click', (e) => {
            document.querySelector('.tasks').textContent = '';
            project.tasks.forEach(task =>{
                const buttons = UI.generateTask(task);
                UI.removeTask(buttons.removeButton);
                UI.editTask(buttons.editButton);
            });
        });
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
        });
    }
}

export default ProjectUI;