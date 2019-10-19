import jsTPS_Transaction from './jsTPS_Transaction'

export default class ItemSort_Transaction extends jsTPS_Transaction{

    constructor(sortTasks, previousCriteria, newCriteria){
        super();

        this.sortTasks = sortTasks;
        this.previousCriteria = previousCriteria;
        this.newCriteria = newCriteria;
    }

    doTransaction(){
        // [this.todoItems, this.sortedItems] = [this.todoItems, this.sortedItems];
         
        this.sortTasks(this.previousCriteria); 
        [this.previousCriteria, this.newCriteria] = [this.newCriteria, this.previousCriteria]
    }

    undoTransaction(){
        // [this.sortedItems, this.todoItems] = [this.todoItems, this.sortedItems];
        this.sortTasks(this.newCriteria);  
        [this.newCriteria, this.previousCriteria] = [this.previousCriteria, this.newCriteria];
    }
}