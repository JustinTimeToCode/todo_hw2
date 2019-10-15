import jsTPS_Transaction from './jsTPS_Transaction'

export default class ItemRemoval_Transaction extends jsTPS_Transaction{
    constructor(todoList, item){
        super();

        this.todoList = todoList;
        this.item = item;
        this.itemIndex = this.todoList.items.indexOf(item);
    }

    doTransaction(){
        
        this.todoList.items.splice(this.itemIndex, 1);
    }

    undoTransaction(){
        this.todoList.items.splice(this.itemIndex, 0, this.item);
    }

}