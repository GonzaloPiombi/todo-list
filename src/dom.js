import Task from './tasks';

class UI {

    static domController() {
        const info = UI.getInformation();
        const task = UI.addTask(info.title, info.description, info.dueDate, info.priority, info.project);
        const buttons = UI.generateTask(task);
        UI.removeTask(buttons.removeButton);
        UI.editTask(buttons.editButton);
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
        newTask.addToArray();
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
        const editButton = document.createElement('button');

        //Add class so when we want to edit date is treated differently from the other inputs and can only be updated as a date.
        dueDate.classList.add('date');

        title.textContent = obj.title;
        description.textContent = obj.description;
        dueDate.textContent = obj.dueDate;
        priority.textContent = obj.priority;
        project.textContent = obj.project;
        removeButton.textContent = 'X';
        editButton.textContent = 'Edit'

        document.querySelector('.tasks').appendChild(taskContainer);
        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDate);
        taskContainer.appendChild(priority);
        taskContainer.appendChild(project);
        taskContainer.appendChild(removeButton);
        taskContainer.appendChild(editButton);

        UI.giveDataAttribute();

        return {removeButton, editButton};
    }

    static giveDataAttribute() {
        for (let i = 0; i < document.querySelectorAll('.task-container').length; i++) {
            document.querySelectorAll('.task-container')[i].setAttribute('data-index', i);
        }
    }

    static removeTask(button) {
        button.addEventListener('click', e => {
            e.path[1].remove();
            Task.removeFromArray(e.path[1].dataset.index);
            UI.giveDataAttribute();
        });
    }

    static editTask(button) {
        button.addEventListener('click', e => {
            const items = e.path[1].childNodes;
            items.forEach(item => {
                if (item.nodeName === 'P' && item.classList.contains('date')) {
                    const date = document.createElement('input');
                    date.setAttribute('type', 'date');
                    date.classList.add('date');
                    item.replaceWith(date);
                }
                else if (item.nodeName === 'P') {
                    item.setAttribute('contenteditable', 'true');
                }
            });

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            e.path[1].appendChild(saveButton);

            saveButton.addEventListener('click', e => {
                let changes = '';
                items.forEach(item => {
                    if (item.classList.contains('date')) {
                        changes += item.value + '~';
                        const para = document.createElement('p');
                        para.classList.add('date');
                        para.textContent = item.value;
                        item.replaceWith(para);
                    }
                    else if (item.contentEditable === 'true') {
                        changes += item.textContent + '~';
                        item.contentEditable = 'false';
                    }
                });
                UI.getNewValues(changes, e.path[1].dataset.index);
                saveButton.remove();
            });
        });
    }

    static getNewValues(string, div) {
        string = string.split('~');
        
        const title = string[0];
        const description = string[1];
        const dueDate = string[2];
        const priority = string[3];
        const project = string[4];
     
        Task.editTask(div, title, description, dueDate, priority, project);
    }
}

export default UI