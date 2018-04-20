class Task{
  id: string;
  name: string;
  status: boolean;
  constructor(taskname: string){
    this.id = new Date().getTime().toString();
    this.name = taskname;
    this.status = false;
  }
}

class DataStorage{
  constructor(){

  }
  retrieve(){

  }
  store( tasks:Array <Task> ){

  }
}

class TaskManager{
  tasks: Array<Task>;
  constructor(arrayname: Array<Task>){
    this.tasks = arrayname;
  }
  add(task:Task){
    this.tasks.push(task);
  }
  remove(id:string){
    let index_to_remove:number = undefined;
    this.tasks.forEach( (item:Task, index:number) => {
      if(item.id  == id){
        index_to_remove = index;
      }
    });
    if( index_to_remove !== undefined){
      this.tasks.splice( index_to_remove, 1 );
    }
  }
  changeStatus(id:string,callback):void{
    this.tasks.forEach( (task:Task) => {
      if(task.id  === id){
        if( task.status == false ){
          task.status = true;
          return;
        }
        else{
          task.status = false;
        }
      }
    });
    callback();
    console.log( this.tasks );
  }

}

class Template{
  template:string;
  constructor(){
    //not being used right now
  }
  populate(id:string, name:string, status:string){
    let task:string =  `<li id="${id}" data-status="${status}">
                <div class="task-container">
                <div class="task-name">${name}</div>
                <div class="task-buttons">
                  <button type="button" data-function="done">&#x2714;</button>
                  <button type="button" data-function="delete">&times;</button>
                </div>
                </div>
            </li>`;
    return task;
  }
}

class ListView{
  list: HTMLElement;
  constructor( listid: string ){
    this.list = document.getElementById('task-list');
  }
  clear(){
    this.list.innerHTML = '';
  }
  render( items:Array<Task> ){
    //clear the view
    //render array using template
    items.forEach( (task) => {
    let id= task.id;
    let name = task.name;
    let status = task.status.toString();
    let item = tasktemplate.populate(id,name,status);
    // convert our string to HTML Node
    let fragment = document.createRange().createContextualFragment(item);
    this.list.appendChild( fragment );
    });
  }
}

//----INITIALISE CLASSES
//array to store tasks
var taskarray: Array<Task> = [];
//Task Manager class, pass the task array
var taskmanager = new TaskManager( taskarray );
//list view
var listview = new ListView('task-list');
//task template
var tasktemplate = new Template();



//reference to form
const taskform:HTMLFormElement = (<HTMLFormElement>document.getElementById('task-form'));
//add listener to form
taskform.addEventListener('submit', ( event: Event) => {
  event.preventDefault();
  let input:HTMLElement = document.getElementById('task-input');
  let taskname: string = (<HTMLInputElement>input).value;
  let task:Task = new Task(taskname);
  taskmanager.add( task);
  taskform.reset();
  listview.clear();
  listview.render( taskarray );
});

//add listener to list
const listelement:HTMLElement = document.getElementById('task-list');
//add listener to list
listelement.addEventListener('click', (event:Event) => {
  console.log(event.target);
  let target:HTMLElement = <HTMLElement> event.target;
  if( target.getAttribute('data-function') == 'done' ){
    let id = target.getAttribute('id');
    taskmanager.changeStatus(id,() => {
      listview.clear();
      listview.render( taskarray );
    });
  }

});
