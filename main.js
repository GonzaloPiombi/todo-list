(()=>{"use strict";class t{constructor(t,e,a,n,s){this.title=t,this.description=e,this.dueDate=a,this.priority=n,this.project=s}static tasks=[];addToArray(){t.tasks.push(this)}static removeFromArray(e){t.tasks.splice(e,1)}static editTask(e,a,n,s,o,i){t.tasks[e].title=a,t.tasks[e].description=n,t.tasks[e].dueDate=s,t.tasks[e].priority=o,t.tasks[e].project=i,console.log(t.tasks)}}const e=t;class a{static domController(){const t=a.getInformation(),e=a.addTask(t.title,t.description,t.dueDate,t.priority,t.project),n=a.generateTask(e);a.removeTask(n.removeButton),a.editTask(n.editButton)}static addButtonEvent(){document.querySelector("#add-task-button").addEventListener("click",(t=>{t.preventDefault(),a.domController(),console.log(e.tasks)}))}static getInformation(){const t=document.querySelectorAll("input");return{title:t[0].value,description:t[1].value,dueDate:t[2].value,priority:t[3].value,project:document.querySelector("select").value}}static addTask(t,a,n,s,o){const i=new e(t,a,n,s,o);return i.addToArray(),i}static generateTask(t){const e=document.createElement("div");e.classList.add("task-container");const n=document.createElement("p"),s=document.createElement("p"),o=document.createElement("p"),i=document.createElement("p"),d=document.createElement("p"),c=document.createElement("button"),r=document.createElement("button");return o.classList.add("date"),n.textContent=t.title,s.textContent=t.description,o.textContent=t.dueDate,i.textContent=t.priority,d.textContent=t.project,c.textContent="X",r.textContent="Edit",document.querySelector(".tasks").appendChild(e),e.appendChild(n),e.appendChild(s),e.appendChild(o),e.appendChild(i),e.appendChild(d),e.appendChild(c),e.appendChild(r),a.giveDataAttribute(),{removeButton:c,editButton:r}}static giveDataAttribute(){for(let t=0;t<document.querySelectorAll(".task-container").length;t++)document.querySelectorAll(".task-container")[t].setAttribute("data-index",t)}static removeTask(t){t.addEventListener("click",(t=>{t.path[1].remove(),e.removeFromArray(t.path[1].dataset.index),a.giveDataAttribute()}))}static editTask(t){t.addEventListener("click",(t=>{const e=t.path[1].childNodes;a.edit(e);const n=document.createElement("button");n.textContent="Save",t.path[1].appendChild(n),n.addEventListener("click",(t=>{a.save(t,e,n)}))}))}static edit(t){t.forEach((t=>{if("P"===t.nodeName&&t.classList.contains("date")){const e=document.createElement("input");e.setAttribute("type","date"),e.classList.add("date"),t.replaceWith(e)}else"P"===t.nodeName&&t.setAttribute("contenteditable","true")}))}static save(t,e,n){let s="";e.forEach((t=>{if(t.classList.contains("date")){s+=t.value+"~";const e=document.createElement("p");e.classList.add("date"),e.textContent=t.value,t.replaceWith(e)}else"true"===t.contentEditable&&(s+=t.textContent+"~",t.contentEditable="false")})),a.getNewValues(s,t.path[1].dataset.index),n.remove()}static getNewValues(t,a){const n=(t=t.split("~"))[0],s=t[1],o=t[2],i=t[3],d=t[4];e.editTask(a,n,s,o,i,d)}}a.addButtonEvent()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qk4sRUFBS08sa0JBQ1ZGLEdBQVdMLEVBQUtoQixZQUFjLElBQzlCZ0IsRUFBS08sZ0JBQWtCLFlBRy9CakQsRUFBR2tELGFBQWFILEVBQVNqQyxFQUFFbUIsS0FBSyxHQUFHRSxRQUFRdkMsT0FDM0NvQyxFQUFPRSxTQUdYLG9CQUFvQmlCLEVBQVFDLEdBR3hCLE1BQU1qRSxHQUZOZ0UsRUFBU0EsRUFBT0UsTUFBTSxNQUVELEdBQ2ZqRSxFQUFjK0QsRUFBTyxHQUNyQjlELEVBQVU4RCxFQUFPLEdBQ2pCN0QsRUFBVzZELEVBQU8sR0FDbEI1RCxFQUFVNEQsRUFBTyxHQUV2QixXQUFjQyxFQUFLakUsRUFBT0MsRUFBYUMsRUFBU0MsRUFBVUMsSUFJbEUsRUN0SkEsa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0YXNrcyA9IFtdO1xuXG4gICAgYWRkVG9BcnJheSgpIHtcbiAgICAgICAgVGFzay50YXNrcy5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVGcm9tQXJyYXkoaW5kZXgpIHtcbiAgICAgICAgVGFzay50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlZGl0VGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICAgICAgICBUYXNrLnRhc2tzW2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgICAgICBUYXNrLnRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBUYXNrLnRhc2tzW2luZGV4XS5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgVGFzay50YXNrc1tpbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgVGFzay50YXNrc1tpbmRleF0ucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKFRhc2sudGFza3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzayIsImltcG9ydCBUYXNrIGZyb20gJy4vdGFza3MnO1xuXG5jbGFzcyBVSSB7XG5cbiAgICBzdGF0aWMgZG9tQ29udHJvbGxlcigpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IFVJLmdldEluZm9ybWF0aW9uKCk7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBVSS5hZGRUYXNrKGluZm8udGl0bGUsIGluZm8uZGVzY3JpcHRpb24sIGluZm8uZHVlRGF0ZSwgaW5mby5wcmlvcml0eSwgaW5mby5wcm9qZWN0KTtcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IFVJLmdlbmVyYXRlVGFzayh0YXNrKTtcbiAgICAgICAgVUkucmVtb3ZlVGFzayhidXR0b25zLnJlbW92ZUJ1dHRvbik7XG4gICAgICAgIFVJLmVkaXRUYXNrKGJ1dHRvbnMuZWRpdEJ1dHRvbik7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBhZGRCdXR0b25FdmVudCgpIHtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWJ1dHRvbicpO1xuICAgICAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgVUkuZG9tQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coVGFzay50YXNrcyk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEluZm9ybWF0aW9uKCkge1xuICAgICAgICBjb25zdCBmb3JtSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZm9ybUluZm9bMF0udmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZm9ybUluZm9bMV0udmFsdWU7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBmb3JtSW5mb1syXS52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBmb3JtSW5mb1szXS52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLnZhbHVlO1xuICAgICAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3R9O1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICAgICAgLy9DcmVhdGUgbmV3IGluc3RhbmNlIG9mIFRhc2suXG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcblxuICAgICAgICAvL0FkZCB0aGUgdGFzayB0byB0aGUgYXJyYXkuXG4gICAgICAgIG5ld1Rhc2suYWRkVG9BcnJheSgpO1xuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2VuZXJhdGVUYXNrKG9iaikge1xuICAgICAgICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1jb250YWluZXInKTtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCByZW1vdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgICAgIC8vQWRkIGNsYXNzIHNvIHdoZW4gd2Ugd2FudCB0byBlZGl0IGRhdGUgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmcm9tIHRoZSBvdGhlciBpbnB1dHMgYW5kIGNhbiBvbmx5IGJlIHVwZGF0ZWQgYXMgYSBkYXRlLlxuICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKTtcblxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IG9iai50aXRsZTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBvYmouZGVzY3JpcHRpb247XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBvYmouZHVlRGF0ZTtcbiAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBvYmoucHJpb3JpdHk7XG4gICAgICAgIHByb2plY3QudGV4dENvbnRlbnQgPSBvYmoucHJvamVjdDtcbiAgICAgICAgcmVtb3ZlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJykuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eSk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gICAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcbiAgICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcblxuICAgICAgICBVSS5naXZlRGF0YUF0dHJpYnV0ZSgpO1xuXG4gICAgICAgIHJldHVybiB7cmVtb3ZlQnV0dG9uLCBlZGl0QnV0dG9ufTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2l2ZURhdGFBdHRyaWJ1dGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stY29udGFpbmVyJykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLWNvbnRhaW5lcicpW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZVRhc2soYnV0dG9uKSB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgZS5wYXRoWzFdLnJlbW92ZSgpO1xuICAgICAgICAgICAgVGFzay5yZW1vdmVGcm9tQXJyYXkoZS5wYXRoWzFdLmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICAgICAgVUkuZ2l2ZURhdGFBdHRyaWJ1dGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVkaXRUYXNrKGJ1dHRvbikge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZS5wYXRoWzFdLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICBVSS5lZGl0KGl0ZW1zKTtcblxuICAgICAgICAgICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgICAgICAgICAgIGUucGF0aFsxXS5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcblxuICAgICAgICAgICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgIFVJLnNhdmUoZSwgaXRlbXMsIHNhdmVCdXR0b24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBlZGl0KGl0ZW1zKSB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5ub2RlTmFtZSA9PT0gJ1AnICYmIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXRlJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEF0dHJpYnV0ZSgndHlwZScsICdkYXRlJyk7XG4gICAgICAgICAgICAgICAgZGF0ZS5jbGFzc0xpc3QuYWRkKCdkYXRlJyk7XG4gICAgICAgICAgICAgICAgaXRlbS5yZXBsYWNlV2l0aChkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0ubm9kZU5hbWUgPT09ICdQJykge1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2F2ZShlLCBpdGVtcywgYnV0dG9uKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gJyc7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2RhdGUnKSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZXMgKz0gaXRlbS52YWx1ZSArICd+JztcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHBhcmEuY2xhc3NMaXN0LmFkZCgnZGF0ZScpO1xuICAgICAgICAgICAgICAgIHBhcmEudGV4dENvbnRlbnQgPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVwbGFjZVdpdGgocGFyYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpdGVtLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlcyArPSBpdGVtLnRleHRDb250ZW50ICsgJ34nO1xuICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudEVkaXRhYmxlID0gJ2ZhbHNlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFVJLmdldE5ld1ZhbHVlcyhjaGFuZ2VzLCBlLnBhdGhbMV0uZGF0YXNldC5pbmRleCk7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TmV3VmFsdWVzKHN0cmluZywgZGl2KSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnficpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGl0bGUgPSBzdHJpbmdbMF07XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc3RyaW5nWzFdO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gc3RyaW5nWzJdO1xuICAgICAgICBjb25zdCBwcmlvcml0eSA9IHN0cmluZ1szXTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHN0cmluZ1s0XTtcbiAgICAgXG4gICAgICAgIFRhc2suZWRpdFRhc2soZGl2LCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJIiwiaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgVUkgZnJvbSAnLi9kb20nO1xuXG5VSS5hZGRCdXR0b25FdmVudCgpOyJdLCJuYW1lcyI6WyJUYXNrIiwiY29uc3RydWN0b3IiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiZHVlRGF0ZSIsInByaW9yaXR5IiwicHJvamVjdCIsInRoaXMiLCJhZGRUb0FycmF5IiwidGFza3MiLCJwdXNoIiwiaW5kZXgiLCJzcGxpY2UiLCJjb25zb2xlIiwibG9nIiwiVUkiLCJpbmZvIiwiZ2V0SW5mb3JtYXRpb24iLCJ0YXNrIiwiYWRkVGFzayIsImJ1dHRvbnMiLCJnZW5lcmF0ZVRhc2siLCJyZW1vdmVUYXNrIiwicmVtb3ZlQnV0dG9uIiwiZWRpdFRhc2siLCJlZGl0QnV0dG9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImRvbUNvbnRyb2xsZXIiLCJmb3JtSW5mbyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ2YWx1ZSIsIm5ld1Rhc2siLCJvYmoiLCJ0YXNrQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJnaXZlRGF0YUF0dHJpYnV0ZSIsImkiLCJsZW5ndGgiLCJzZXRBdHRyaWJ1dGUiLCJidXR0b24iLCJwYXRoIiwicmVtb3ZlIiwiZGF0YXNldCIsIml0ZW1zIiwiY2hpbGROb2RlcyIsImVkaXQiLCJzYXZlQnV0dG9uIiwic2F2ZSIsImZvckVhY2giLCJpdGVtIiwibm9kZU5hbWUiLCJjb250YWlucyIsImRhdGUiLCJyZXBsYWNlV2l0aCIsImNoYW5nZXMiLCJwYXJhIiwiY29udGVudEVkaXRhYmxlIiwiZ2V0TmV3VmFsdWVzIiwic3RyaW5nIiwiZGl2Iiwic3BsaXQiXSwic291cmNlUm9vdCI6IiJ9