import Task, { Project } from './tasks';
import UI from './tasksUI';
import ProjectUI from './projectUI';

UI.displayModal();
ProjectUI.displayModal();
UI.addTaskButtonEvent();
UI.dateFilter();
ProjectUI.addProjectButtonEvent();
