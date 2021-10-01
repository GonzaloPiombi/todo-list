import { Project, Task } from './tasks';
import { compareAsc, format, isThisMonth, isThisWeek } from 'date-fns'

class UI {

    static displayModal() {
        const newTaskButton = document.querySelector('.new-task-button');
        newTaskButton.addEventListener('click', () => {
            document.querySelector('.task-modal').style = 'display: block';
        });

        window.onclick = function(e) {
            if (e.target == document.querySelector('.task-modal')) {
                document.querySelector('.task-modal').style.display = "none";
            } else if (e.target == document.querySelector('.project-modal')) {
                document.querySelector('.project-modal').style.display = "none";
            }
        }
    }

    static displayTask() {
        const info = UI.getInformation();
        const task = UI.addTask(info.title, info.dueDate, info.priority, info.project);
        const buttons = UI.generateTask(task);
        UI.removeTask(buttons.removeButton);
        UI.editTask(buttons.editButton);
    }
    
    static addTaskButtonEvent() {
        const addTaskButton = document.querySelector('#add-task-form');
        addTaskButton.addEventListener('submit', e => {
            e.preventDefault();
            UI.displayTask();
            document.querySelector('.task-modal').style = 'display: none';
            document.querySelector('#add-task-form').reset();
            console.log(Task.tasks);
        });
    }

    static getInformation() {
        const formInfo = document.querySelectorAll('input');
        const title = formInfo[0].value;
        const dueDate = formInfo[1].value;
        const priority = document.querySelectorAll('select')[0].value;
        const project = document.querySelectorAll('select')[1].value;
        return {title, dueDate, priority, project};
    }

    static addTask(title, dueDate, priority, project) {
        const newTask = new Task(title, dueDate, priority, project);
        newTask.addToArray();
        return newTask;
    }

    static generateTask(obj) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        taskContainer.setAttribute('id', obj.id);

        const title = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
        const project = document.createElement('p');
        const removeButton = document.createElement('button');
        const editButton = document.createElement('button');

        //Add class so when we want to edit date is treated differently from the other inputs and can only be updated as a date.
        dueDate.classList.add('date');
        project.classList.add('project');
        priority.classList.add('priority');
        editButton.classList.add('edit-button');

        title.textContent = obj.title;
        dueDate.textContent = obj.dueDate;
        priority.innerHTML= '&#9210';
        UI.definePriority(priority, obj.priority);
        project.textContent = obj.project;
        removeButton.textContent = 'X';
        editButton.textContent = 'Edit'

        const leftContainer = document.createElement('div');
        const rightContainer = document.createElement('div');

        document.querySelector('.tasks').appendChild(taskContainer);
        taskContainer.appendChild(leftContainer);
        taskContainer.appendChild(rightContainer);

        leftContainer.appendChild(title);
        rightContainer.appendChild(project);
        rightContainer.appendChild(priority);
        rightContainer.appendChild(dueDate);
        rightContainer.appendChild(editButton);
        rightContainer.appendChild(removeButton);

        return {removeButton, editButton};
    }

    static definePriority(priority, value) {
        if (value === 'low') {
            priority.style = 'color: green';
        } else if (value === 'medium') {
            priority.style = 'color: yellow';
        } else {
            priority.style = 'color: red';
        }
    }

    static removeTask(button) {
        button.addEventListener('click', e => {
            console.log(e);
            e.path[2].remove();
            Task.removeFromArray(e.path[2].id, e.path[2].childNodes[1].childNodes[0].textContent);
        });
    }

    static editTask(button) {
        button.addEventListener('click', e => {
            e.currentTarget.style = 'display: none';
            console.log(e);

            const title = e.path[2].childNodes[0].childNodes[0];
            const priority = e.path[1].childNodes[1];
            const date = e.path[1].childNodes[2];

            const newData = UI.edit(title, priority, date);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            e.path[1].appendChild(saveButton);

            saveButton.addEventListener('click', e => {
                UI.save(e, title, newData.priority, newData.date, saveButton);
            });
        });
    }

    static edit(editTitle, editPriority, editDate) {
        console.log(editTitle)
        editTitle.contentEditable = true;

        const priority = document.createElement('select');
        priority.name = 'priority';
        priority.classList.add('priority');

        const low = document.createElement('option');
        const medium = document.createElement('option');
        const high = document.createElement('option');

        low.value = 'low';
        low.textContent = 'Low';
        medium.value = 'medium';
        medium.textContent = 'Medium';
        high.value = 'high';
        high.textContent = 'High';

        editPriority.replaceWith(priority);
        priority.appendChild(low);
        priority.appendChild(medium);
        priority.appendChild(high);

        const date = document.createElement('input');
        date.setAttribute('type', 'date');
        date.classList.add('date');
        editDate.replaceWith(date);

        return {priority, date}
    }

    static save(e, title, priority, date, button) {
        let changes = '';

        changes += title.textContent + '~';
        title.contentEditable = false;

        changes += priority.value + '~';
        const newPriority = document.createElement('p');
        newPriority.classList.add('priority');
        newPriority.innerHTML = '&#9210';
        UI.definePriority(newPriority, priority.value);
        priority.replaceWith(newPriority);

        changes += date.value + '~';
        const newDate = document.createElement('p');
        newDate.classList.add('date');
        newDate.textContent = date.value;
        date.replaceWith(newDate);

        UI.getNewValues(changes, e.path[2].id);
        button.remove();
        e.path[1].lastChild.style = 'display: inline-block';
    }

    static getNewValues(string, div) {
        string = string.split('~');
        console.log(string);

        const title = string[0];
        const priority = string[1];
        const dueDate = string[2];
     
        Task.editTask(div, title, dueDate, priority);
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
            const title = document.createElement('h1')
            title.textContent = 'Home';
            document.querySelector('.tasks').appendChild(title);

            UI.checkActiveClass();
            homeButton.parentNode.classList.add('active');
            
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
            const title = document.createElement('h1')
            title.textContent = 'Today';
            document.querySelector('.tasks').appendChild(title);

            UI.checkActiveClass();
            todayButton.parentNode.classList.add('active');

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
            const title = document.createElement('h1')
            title.textContent = 'This week';
            document.querySelector('.tasks').appendChild(title);

            UI.checkActiveClass();
            weekButton.parentNode.classList.add('active');

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
            const title = document.createElement('h1')
            title.textContent = 'This month';
            document.querySelector('.tasks').appendChild(title);

            UI.checkActiveClass();
            monthButton.parentNode.classList.add('active');

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

    static checkActiveClass() {
        document.querySelectorAll('li').forEach(li => {
            if (li.classList.contains('active')) {
                li.classList.remove('active');
            }
        });
    }
}

export default UI