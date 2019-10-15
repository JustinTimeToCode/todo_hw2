import jsTPS_Transaction from './jsTPS_Transaction';

export default class ItemOrderChange_Transaction extends jsTPS_Transaction{
    constructor(todoList, item1, item2){
        super();

        this.todoList = todoList;
        this.item1 = item1;
        this.item2 = item2;
    }

    doTransaction(){
        let index1 = this.todoList.items.indexOf(this.item1);
        let index2 = this.todoList.items.indexOf(this.item2);

        [this.todoList.items[index1], this.todoList.items[index2]] = 
        [this.todoList.items[index2], this.todoList.items[index1]]

        // [this.item1, this.item2] = [this.item2, this.item1];
    }

    undoTransaction(){
        let index1 = this.todoList.items.indexOf(this.item1);
        let index2 = this.todoList.items.indexOf(this.item2);

        [this.todoList.items[index2], this.todoList.items[index1]] =
        [this.todoList.items[index1], this.todoList.items[index2]]

        // [this.item1, this.item2] = [this.item2, this.item1];
    }
}