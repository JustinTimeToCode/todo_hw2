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
        let index = this.todoItems.indexOf(this.previousItem);
        console.log(index);
        console.log(this.previousItem);
        console.log(this.item);

        //Not in the array (new item)
        if(this.type === 'NEW_ITEM'){
            this.todoItems.push(this.item);
        } else if(this.type === 'EDIT_ITEM') {
            this.todoItems[index] = this.item;
        }
    }

    undoTransaction(){
        let index = this.todoItems.indexOf(this.item);

        if(this.type === 'EDIT_ITEM'){
            this.todoItems[index] = this.previousItem;
        } else if(this.type === 'NEW_ITEM'){
            this.todoItems.splice(index, 1);
        }
    }
}