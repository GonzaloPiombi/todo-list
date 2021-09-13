import Task from './tasks';

class UI {

    static domController() {
        const info = UI.getInformation();
        const task = UI.addTask(info.title, info.description, info.dueDate, info.priority, info.project);
        const removeButton = UI.generateTask(task);
        UI.removeTask(removeButton);
    }
    
    static addButtonEvent() {
        const addButton = document.querySelector('#add-task-button');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            UI.domController();
            console.log(Task.tasks);
        });

    }

    static getInformation() {
        const formInfo = document.querySelectorAll('input');
        const title = formInfo[0].value;
        const description = formInfo[1].value;
        const dueDate = formInfo[2].value;
        const priority = formInfo[3].value;
        const project = document.querySelector('select').value;
        return {title, description, dueDate, priority, project};
    }

    static addTask(title, description, dueDate, priority, project) {
        //Create new instance of Task.
        const newTask = new Task(title, description, dueDate, priority, project);

        //Add the task to the array.
        newTask.addToArray()
        return newTask;
    }

    static generateTask(obj) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const title = document.createElement('p');
        const description = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
        const project = document.createElement('p');
        const removeButton = document.createElement('button');

        title.textContent = obj.title;
        description.textContent = obj.description;
        dueDate.textContent = obj.dueDate;
        priority.textContent = obj.priority;
        project.textContent = obj.project;
        removeButton.textContent = 'X';

        document.querySelector('.tasks').appendChild(taskContainer);
        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(priority);
        taskContainer.appendChild(project);
        taskContainer.appendChild(removeButton);

        UI.giveDataAttribute();

        return removeButton;
    }

    static giveDataAttribute() {
        for (let i = 0; i < document.querySelectorAll('.task-container').length; i++) {
            document.querySelectorAll('.task-container')[i].setAttribute('data-index', i);
        }
    }

    static removeTask(button) {
        button.addEventListener('click', (e) => {
            e.path[1].remove();
            Task.removeFromArray(e.path[1].dataset.index);
            UI.giveDataAttribute();
        });
    }

}

export default UI