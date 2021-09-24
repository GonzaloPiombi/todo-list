import { Project, Task } from './tasks';
import { compareAsc, format, isThisMonth, isThisWeek } from 'date-fns'

class UI {

    static displayTask() {
        const info = UI.getInformation();
        const task = UI.addTask(info.title, info.description, info.dueDate, info.priority, info.project);
        const buttons = UI.generateTask(task);
        UI.removeTask(buttons.removeButton);
        UI.editTask(buttons.editButton);
    }
    
    static addTaskButtonEvent() {
        const addTaskButton = document.querySelector('#add-task-form');
        addTaskButton.addEventListener('submit', e => {
            e.preventDefault();
            UI.displayTask();
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
        const newTask = new Task(title, description, dueDate, priority, project);
        newTask.addToArray();
        return newTask;
    }

    static generateTask(obj) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        taskContainer.setAttribute('id', obj.id);

        const title = document.createElement('p');
        const description = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
        const project = document.createElement('p');
        const removeButton = document.createElement('button');
        const editButton = document.createElement('button');

        //Add class so when we want to edit date is treated differently from the other inputs and can only be updated as a date.
        dueDate.classList.add('date');
        project.classList.add('project');

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

        return {removeButton, editButton};
    }

    static removeTask(button) {
        button.addEventListener('click', e => {
            e.path[1].remove();
            Task.removeFromArray(e.path[1].id, e.path[1].childNodes[4].textContent);
        });
    }

    static editTask(button) {
        button.addEventListener('click', e => {
            const items = e.path[1].childNodes;
            UI.edit(items);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            e.path[1].appendChild(saveButton);

            saveButton.addEventListener('click', e => {
                UI.save(e, items, saveButton);
            });
        });
    }

    static edit(items) {
        items.forEach(item => {
            if (item.nodeName === 'P' && item.classList.contains('date')) {
                const date = document.createElement('input');
                date.setAttribute('type', 'date');
                date.classList.add('date');
                item.replaceWith(date);
            } else if (item.nodeName === 'P' && !item.classList.contains('project')) {
                item.setAttribute('contenteditable', 'true');
            }
        });
    }

    static save(e, items, button) {
        let changes = '';
        items.forEach(item => {
            if (item.classList.contains('date')) {
                changes += item.value + '~';
                const para = document.createElement('p');
                para.classList.add('date');
                para.textContent = item.value;
                item.replaceWith(para);
            } else if (item.contentEditable === 'true' || item.classList.contains('project')) {
                changes += item.textContent + '~';
                item.contentEditable = 'false';
            }
        });
        UI.getNewValues(changes, e.path[1].id);
        button.remove();
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

    static dateFilter() {
        UI.homeFilter();
        UI.todayFilter();
        UI.weekFilter();
        UI.monthFilter();
    }

    static homeFilter() {
        const homeButton = document.querySelector('#home');
        homeButton.addEventListener('click', (e) => {
            document.querySelector('.tasks').textContent = '';
            
            Task.tasks.forEach(task => {
                const buttons = UI.generateTask(task);
                UI.removeTask(buttons.removeButton);
                UI.editTask(buttons.editButton);
            });
        });
    }

    static todayFilter() {
        const todayButton = document.querySelector('#today');
        todayButton.addEventListener('click', () => {
            const date = new Date();
            const dateFormat = format(date, 'yyyy-MM-dd');
            const todayTasks = Task.tasks.filter(task => task.dueDate === dateFormat);

            document.querySelector('.tasks').textContent = '';
            todayTasks.forEach(task => {
                const buttons = UI.generateTask(task);
                UI.removeTask(buttons.removeButton);
                UI.editTask(buttons.editButton);
            });
            console.log(todayTasks)
            console.log(Task.tasks)
        });
    }

    static weekFilter() {
        const weekButton = document.querySelector('#week');
        weekButton.addEventListener('click', () => {
            document.querySelector('.tasks').textContent = '';

            const weekTasks = Task.tasks.filter(task => {
                const date = task.dueDate.split('-');
                const year = Number(date[0]);
                const month = Number(date[1]) - 1;
                const day = Number(date[2]);
                const thisWeek = isThisWeek(new Date(year, month, day));
                if (thisWeek) {
                    const buttons = UI.generateTask(task);
                    UI.removeTask(buttons.removeButton);
                    UI.editTask(buttons.editButton);
                }
            });
        });
    }

    static monthFilter() {
        const monthButton = document.querySelector('#month');
        monthButton.addEventListener('click', () => {
            document.querySelector('.tasks').textContent = '';

            const monthTasks = Task.tasks.filter(task => {
                const date = task.dueDate.split('-');
                const year = Number(date[0]);
                const month = Number(date[1]) - 1;
                const day = Number(date[2]);
                const thisMonth = isThisMonth(new Date(year, month, day));
                if (thisMonth) {
                    const buttons = UI.generateTask(task);
                    UI.removeTask(buttons.removeButton);
                    UI.editTask(buttons.editButton);
                }
            });
        });
    }
}

export default UI