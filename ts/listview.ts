import { Task } from '../ts/task';
import { tasktemplate } from '../ts/main-module';

export class ListView{
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
