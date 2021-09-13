class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    static tasks = [];

    addToArray() {
        Task.tasks.push(this);
    }

    static removeFromArray(index) {
        Task.tasks.splice(index, 1);
    }

    static editTask(index, title, description, dueDate, priority, project) {
        Task.tasks[index].title = title;
        Task.tasks[index].description = description;
        Task.tasks[index].dueDate = dueDate;
        Task.tasks[index].priority = priority;
        Task.tasks[index].project = project;
        console.log(Task.tasks);
    }
}

export default Task