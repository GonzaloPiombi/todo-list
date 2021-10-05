import UI from './tasksUI';
import ProjectUI from './projectUI';
import {setStorage, getStorage} from './storage';

window.onload = () => getStorage();

UI.displayModal();
ProjectUI.displayModal();
UI.addTaskButtonEvent();
UI.dateFilter();
ProjectUI.addProjectButtonEvent();
createMobileMenu();


function createMobileMenu() {
    const mobileMenuIcon = document.querySelector('.mobile-menu');
    mobileMenuIcon.addEventListener('click', () => {
        if (document.querySelector('nav').style.display === 'flex') {
            document.querySelector('nav').style.display = 'none';
            document.querySelector('.buttons-section').style.display = 'flex';
        } else {
            document.querySelector('nav').style.display = 'flex';
            document.querySelector('.buttons-section').style.display = 'none';
        }
    });
}