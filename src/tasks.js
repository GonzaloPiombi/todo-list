import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor(title, dueDate, priority, project) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.id = uuidv4();
    }

    static tasks = [];

    addToArray() {
        Task.tasks.push(this);

        //When a project is specified for the task, find it and add said taks to the array of tasks of the project.
        if (this.project) {
            const project = Project.projects.find(project => project.title === this.project);
            project.tasks.push(this);
        }
    }

    static removeFromArray(id, projectName) {
        const deleteIndex = Task.tasks.findIndex(task => task.id == id);
        Task.tasks.splice(deleteIndex, 1);

        if (projectName) {
            const projectIndex = Project.projects.findIndex(project => project.title == projectName);
            const deleteInProjectIndex = Project.projects[projectIndex].tasks.findIndex(task => task.id == id);
            Project.projects[projectIndex].tasks.splice(deleteInProjectIndex, 1);
        }
    }

    static editTask(id, title, dueDate, priority) {
        const index = Task.tasks.findIndex(task => task.id == id);
        
        Task.tasks[index].title = title;
        Task.tasks[index].dueDate = dueDate;
        Task.tasks[index].priority = priority;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
        this.id = uuidv4();
    }

    static projects = [];

    addToArray() {
        Project.projects.push(this);
    }

    static removeFromArray(index) {
        Project.removeTasks(index);
        Project.projects.splice(index, 1);
        return index;
    }

    static removeTasks(i) {
        Project.projects[i].tasks.forEach(projectTask => {
            const index = Task.tasks.findIndex(task => task.id === projectTask.id);
            Task.tasks.splice(index, 1);
        });
    }

    static checkExistingProject(name) {
        return Project.projects.some(project => project.title === name);
    }
}

export {
    Task,
    Project
}