import Task from './tasks';

class UI {

    static domController() {
        const info = UI.getInformation();
        const task = UI.addTask(info.title, info.description, info.dueDate, info.priority, info.project);
        UI.generateTask(task);
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
        const title = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');

        title.textContent = obj.title;
        dueDate.textContent = obj.dueDate;
        priority.textContent = obj.priority;

        document.querySelector('section').appendChild(title);
        document.querySelector('section').appendChild(dueDate);
        document.querySelector('section').appendChild(priority);
    }

}

export default UI