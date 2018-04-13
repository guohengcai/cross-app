class Task{
    id: string;
    name: string;
    status: boolean;
    constructor(taskname: string){
        this.id=new Date().getTime().toString();
        this.name= taskname;
        this.status = false;
    }
}


class TaskManager{
    tasks: Array<Task>;
    constructor(array: Array<Task>){
        this.tasks=array;
    }
    add(task:Task){
        this.tasks.push(task);
        console.log(this.tasks);
    }
}
class ListView{
    list:HTMLElement;
    constructor(listid:string){
        this.list = document.getElementById(listid);
    }
    render(items:Array<Task>){
        items.forEach((task)=>{
            let id = task.id;
            let name = task.name;
            let status  = task.status;
            let template = `<li id="${id}">
                    <div class ="task-container">
                    <div class ="task-name">${name}</div>
                    <div class= "task-buttons">
                    <button type="button" data-function="status">&#x2714;</button>
                    <button type="button"data-function="delete">&times;</button>
                     </div>
                     </div>
                    </li>`;
            
            let fragment =document.createRange().createContextualFragment(template);
            this.list.appendChild(fragment);
                            
        });
    }
    clear(){
        this.list.innerHTML='';
        
    }
}
//initialize
var taskarray =[];
var taskmanager = new TaskManager(taskarray);
var listview = new ListView('task-list');

//reference to form
const taskform = (<HTMLFormElement>document.getElementById('task-form'));
taskform.addEventListener('submit', (event:Event) =>{
    //console.log(event);
    event.preventDefault();
let input =document.getElementById('task-input');
                                                     
let taskname = (<HTMLInputElement>input).value;
 taskform.reset();                                                    
//console.log(taskname)
let task = new Task(taskname);
taskmanager.add(task);
listview.render(taskarray);
});
