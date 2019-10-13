import jsTPS_Transaction from '../jsTPS_Transaction';

class OwnerNameChange_Transaction extends jsTPS_Transaction{
    constructor(oldOwnerName, newOwnerName){
        super();

        this.oldOwnerName = oldOwnerName;
        this.newOwnerName = newOwnerName;
    }

    doTransaction(){
        [this.oldOwnerName, this.newOwnerName] = [this.newOwnerName, this.oldOwnerName];
    }

    undoTransaction(){
        [this.newOwnerName, this.oldOwnerName] = [this.oldOwnerName, this.newOwnerName];
    }

    toString(){
        
    }
}