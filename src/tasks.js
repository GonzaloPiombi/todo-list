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

}

export default Task