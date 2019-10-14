import jsTPS_Transaction from './jsTPS_Transaction';

export default class ListNameChange_Transaction extends jsTPS_Transaction{
    constructor(oldListName, newListName){
        super();

        this.oldListName = oldListName;
        this.newListName = newListName;
    }

    doTransaction(){
        [this.oldListName, this.newListName] = [this.newListName, this.oldListName];
    }

    undoTransaction(){
        [this.newListName, this.oldListName] = [this.oldListName, this.newListName];
    }

    toString(){
        
    }
}