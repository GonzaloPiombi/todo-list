import { Project, Task } from './tasks';
import { compareAsc, format, isThisMonth, isThisWeek } from 'date-fns'
import ProjectUI from './projectUI';
import {setStorage, getStorage} from './storage';


class UI {

    static currentTab = 'home';

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
        UI.removeTask(buttons.removeButton, buttons.checkbox);
        UI.editTask(buttons.editButton);
        UI.getCurrentTab();
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
        setStorage();
        return newTask;
    }

    static generateTask(obj) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        taskContainer.setAttribute('id', obj.id);

        const checkbox = document.createElement('span');
        const title = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
        const project = document.createElement('p');
        const removeButton = document.createElement('span');
        const editButton = document.createElement('span');

        title.classList.add('title');
        dueDate.classList.add('date');
        project.classList.add('project');
        priority.classList.add('priority');
        checkbox.classList.add('material-icons-outlined', 'checkbox');
        removeButton.classList.add('material-icons-outlined');
        editButton.classList.add('edit-button', 'material-icons-outlined');

        title.textContent = obj.title;
        if (obj.dueDate === '') {
            dueDate.textContent = 'No date';
        } else {
            dueDate.textContent = obj.dueDate;
        }
        priority.innerHTML= '&#9210';
        UI.definePriority(priority, obj.priority);
        project.textContent = obj.project;
        checkbox.textContent = 'radio_button_unchecked';
        removeButton.textContent = 'delete';
        editButton.textContent = 'edit'

        const leftContainer = document.createElement('div');
        const rightContainer = document.createElement('div');

        document.querySelector('.tasks').appendChild(taskContainer);
        taskContainer.appendChild(leftContainer);
        taskContainer.appendChild(rightContainer);

        leftContainer.appendChild(checkbox);
        leftContainer.appendChild(title);
        rightContainer.appendChild(project);
        rightContainer.appendChild(priority);
        rightContainer.appendChild(dueDate);
        rightContainer.appendChild(editButton);
        rightContainer.appendChild(removeButton);

        return {removeButton, editButton, checkbox};
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

    static getCurrentTab () {
        switch (UI.currentTab) {
            case 'home':
                UI.home(document.querySelector('#home'));
                break;
            case 'today':
                UI.today(document.querySelector('#today'));
                break;
            case 'week':
                UI.week(document.querySelector('#week'));
                break;
            case 'month':
                UI.month(document.querySelector('#month'));
                break;
            default:
                ProjectUI.display(ProjectUI.currentTabButton, UI.currentTab);
                break;
        }
    }

    static removeTask(button1, button2) {
        button1.addEventListener('click', e => UI.removeOrComplete(e));
        button2.addEventListener('click', e => UI.removeOrComplete(e));
    }

    static removeOrComplete(e) {
        e.path[2].remove();
        Task.removeFromArray(e.path[2].id, e.path[2].childNodes[1].childNodes[0].textContent);
        setStorage();
    }

    static editTask(button) {
        button.addEventListener('click', e => {
            e.currentTarget.style = 'display: none';
            console.log(e);

            const title = e.path[2].childNodes[0].childNodes[1];
            const priority = e.path[1].childNodes[1];
            const date = e.path[1].childNodes[2];

            const newData = UI.edit(title, priority, date);

            const saveButton = document.createElement('span');
            saveButton.classList.add('material-icons-outlined');
            saveButton.textContent = 'save';
            e.path[1].insertBefore(saveButton, e.path[1].childNodes[3]);
        
            saveButton.addEventListener('click', e => {
                UI.save(e, title, newData.priority, newData.date, saveButton);
            });
        });
    }

    static edit(editTitle, editPriority, editDate) {
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
        date.value = editDate.textContent;
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
        e.path[1].childNodes[3].style = 'display: inline-block';
    }

    static getNewValues(string, div) {
        string = string.split('~');

        const title = string[0];
        const priority = string[1];
        const dueDate = string[2];
     
        Task.editTask(div, title, dueDate, priority);
        setStorage();
    }

    static dateFilter() {
        UI.homeFilter();
        UI.todayFilter();
        UI.weekFilter();
        UI.monthFilter();
    }

    static homeFilter() {
        const homeButton = document.querySelector('#home');
        homeButton.addEventListener('click', () => {
            UI.home(homeButton);
        });
    }

    static home(button) {
        document.querySelector('.tasks').textContent = '';
        const title = document.createElement('h1')
        title.textContent = 'Home';
        document.querySelector('.tasks').appendChild(title);

        UI.checkActiveClass();
        button.parentNode.classList.add('active');
        
        Task.tasks.forEach(task => {
            const buttons = UI.generateTask(task);
            UI.removeTask(buttons.removeButton, buttons.checkbox);
            UI.editTask(buttons.editButton);
        });
        UI.currentTab = 'home';
    }

    static todayFilter() {
        const todayButton = document.querySelector('#today');
        todayButton.addEventListener('click', () => {
            UI.today(todayButton);
        });
    }

    static today(button) {
        const date = new Date();
        const dateFormat = format(date, 'yyyy-MM-dd');
        const todayTasks = Task.tasks.filter(task => task.dueDate === dateFormat);

        document.querySelector('.tasks').textContent = '';
        const title = document.createElement('h1')
        title.textContent = 'Today';
        document.querySelector('.tasks').appendChild(title);

        UI.checkActiveClass();
        button.parentNode.classList.add('active');

        todayTasks.forEach(task => {
            const buttons = UI.generateTask(task);
            UI.removeTask(buttons.removeButton, buttons.checkbox);
            UI.editTask(buttons.editButton);
        });
        console.log(todayTasks);
        console.log(Task.tasks);
        UI.currentTab = 'today';
    }

    static weekFilter() {
        const weekButton = document.querySelector('#week');
        weekButton.addEventListener('click', () => {
            UI.week(weekButton);
        });
    }

    static week(button) {
        document.querySelector('.tasks').textContent = '';
        const title = document.createElement('h1')
        title.textContent = 'This week';
        document.querySelector('.tasks').appendChild(title);

        UI.checkActiveClass();
        button.parentNode.classList.add('active');

        const weekTasks = Task.tasks.filter(task => {
            const date = task.dueDate.split('-');
            const year = Number(date[0]);
            const month = Number(date[1]) - 1;
            const day = Number(date[2]);
            const thisWeek = isThisWeek(new Date(year, month, day));
            if (thisWeek) {
                const buttons = UI.generateTask(task);
                UI.removeTask(buttons.removeButton, buttons.checkbox);
                UI.editTask(buttons.editButton);
            }
        });
        UI.currentTab = 'week';
    }

    static monthFilter() {
        const monthButton = document.querySelector('#month');
        monthButton.addEventListener('click', () => {
            UI.month(monthButton);
        });
    }

    static month(button) {
        document.querySelector('.tasks').textContent = '';
        const title = document.createElement('h1')
        title.textContent = 'This month';
        document.querySelector('.tasks').appendChild(title);

        UI.checkActiveClass();
        button.parentNode.classList.add('active');

        const monthTasks = Task.tasks.filter(task => {
            const date = task.dueDate.split('-');
            const year = Number(date[0]);
            const month = Number(date[1]) - 1;
            const day = Number(date[2]);
            const thisMonth = isThisMonth(new Date(year, month, day));
            if (thisMonth) {
                const buttons = UI.generateTask(task);
                UI.removeTask(buttons.removeButton, buttons.checkbox);
                UI.editTask(buttons.editButton);
            }
        });
        UI.currentTab = 'month';
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