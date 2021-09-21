import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
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

    static removeFromArray(index) {
        const deleteIndex = Task.tasks.findIndex(task => task.id == index);
        Task.tasks.splice(deleteIndex, 1);
        console.log(Task.tasks);
    }

    static editTask(id, title, description, dueDate, priority, project) {
        const index = Task.tasks.findIndex(task => task.id == id);
        
        Task.tasks[index].title = title;
        Task.tasks[index].description = description;
        Task.tasks[index].dueDate = dueDate;
        Task.tasks[index].priority = priority;
        Task.tasks[index].project = project;
        console.log(Task.tasks);
    }
}

class Project {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.tasks = [];
        this.id = uuidv4();
    }

    static projects = [];

    addToArray() {
        Project.projects.push(this);
    }
}

export {
    Task,
    Project
}