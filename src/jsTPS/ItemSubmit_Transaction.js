import jsTPS_Transaction from './jsTPS_Transaction'

export default class ItemSubmit_Transaction extends jsTPS_Transaction{
    
    /**
     * 
     * @param {Array} todoItems 
     * @param {Object} previousItem 
     * @param {Object} item 
     * @param {String} type 
     */
    constructor(todoItems, previousItem, item, type){
        super();

        this.todoItems = todoItems;
        this.previousItem = previousItem
        this.item = item;
        this.type = type;
    }

    doTransaction(){
        let index = this.todoItems.indexOf(this.item);

        //Not in the array (new item)
        if(index === -1 ){
            this.todoItems.push(this.item);
        } else {
            this.todoItems[index] = this.item;
        }
    }

    undoTransaction(){
        let index = this.todoItems.indexOf(this.item);

        if(this.type === 'EDIT'){
            this.todoItems[index] = this.previousItem;
        } else if(this.type === 'NEW_ITEM'){
            this.todoItems.splice(index, 1);
        }
    }

    undoTransaction(){
        let index = this.
    }
}