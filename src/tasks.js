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
}

export default Task