import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import Modal from './Modal'
import PropTypes from 'prop-types';
import ListNameChange_Transaction from '../../jsTPS/ListNameChange_Transaction'
import OwnerNameChange_Transaction from '../../jsTPS/OwnerNameChange_Transaction'
import ItemOrderChange_Transaction from '../../jsTPS/ItemOrderChange_Transaction'
import ItemRemoval_Transaction from '../../jsTPS/ItemRemoval_Transaction'
import Mousetrap from 'mousetrap'

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}
export class ListScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            listToEdit: this.props.todoList,
            currentItemSortCriteria: null
        }

        console.log(this.state);

        this.nameInput = React.createRef();
        this.ownerInput =  React.createRef();
        this.modalRef = React.createRef();
    }

    componentDidMount(){
        Mousetrap.bind(['ctrl+z','command+z'], this.props.handleUndo);
        Mousetrap.bind(['ctrl+y','command+y'], this.props.handleRedo);
    }

    componentWillUnmount(){
        Mousetrap.unbind(['ctrl+z','command+z']);
        Mousetrap.unbind(['ctrl+y','command+y']);
    }


    updateListName(todoList){
         // WE'RE GOING TO CHANGE THE NAME TOO BUT ONLY UPDATE
        // THE LIST OF LIST LINKS IF IT'S CHANGED
        let listToEdit = todoList;
        
        if (listToEdit.name !== this.nameInput.current.value) {
            if (this.nameInput.current.value === '') {
                listToEdit.name = 'Unknown List'
            } else {
                listToEdit.name = this.nameInput.current.value;    
            }
            this.setState({listToEdit})
        }
        let nameChangeTransaction = new ListNameChange_Transaction(listToEdit.name, this.nameInput.current.value)
            this.props.updateJsTPS(nameChangeTransaction);
    }

    updateListOwner(todoList){
        let listToEdit = todoList;

        if (listToEdit.owner !== this.ownerInput.current.value) {
            
            listToEdit.owner = this.ownerInput.current.value    
            this.setState({listToEdit});
        }
        let ownerTransaction = new OwnerNameChange_Transaction(listToEdit.owner, this.ownerInput.current.value);
        this.props.updateJsTPS(ownerTransaction);
    }

    moveItemUp = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(todoItem);
        let listToEdit = this.state.listToEdit;
        
        if (index !== 0) {
            // [listItems[index], listItems[index - 1]] = 
            // [listItems[index - 1], listItems[index]];
            
            this.props.updateJsTPS(new ItemOrderChange_Transaction(listToEdit, 
                listToEdit.items[index],
                listToEdit.items[index - 1]));
            this.setState({listToEdit}); 
        }

        // this.disableButtons();
    }

    moveItemDown = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(todoItem);
        let listToEdit = this.state.listToEdit;

        if (index !== this.state.listToEdit.items.length - 1) {
            // [listItems[index], listItems[index + 1]] = 
            // [listItems[index + 1], listItems[index]]

            this.props.updateJsTPS(new ItemOrderChange_Transaction(listToEdit,
                 listToEdit.items[index],
                 listToEdit.items[index + 1]));
            this.setState({listToEdit});
        }

        // this.disableButtons();
        
    }

    deleteItem = (e, todoItem) =>{
        e.stopPropagation();
        let listToEdit = this.state.listToEdit;

        this.props.updateJsTPS(new ItemRemoval_Transaction(listToEdit, todoItem));
        // let index = this.state.listItems.indexOf(todoItem);
        // let listItems = this.state.listItems;
        // listItems.splice(index, 1);
        this.setState({listToEdit});
    }

    /**
     * This function can be used to disable on of the three buttons for each
     * list item, which are for moving an item up or down or for removing it.
     * 
     * @param {Number} itemIndex 
     * @param {TodoGUIId} buttonType 
     */
    disableButton = (itemIndex, buttonType) => {
        let buttonId = `item_card_${itemIndex}_${buttonType}`;
        let button = document.getElementById(buttonId);
        console.log(buttonId);    
        console.log(button); 
        button.classList.add("disabled"); 
        button.setAttribute('disabled', true); 
    }

    disableButtons = () =>{
        this.disableButton(0, 'move_up');
        this.disableButton(this.state.listToEdit.items.length - 1, 'move_down');
    }

    hideModal = () => {
        this.modalRef.current.classList.remove('is_visible');
    }

    showModal = () => {
        this.modalRef.current.classList.add("is_visible");
    }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.state.listToEdit.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.state.listToEdit.owner;
        }
    }

    /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
    sortTasks(sortingCriteria) {
        this.setState({currentItemSortCriteria: sortingCriteria});
        let listToEdit = this.state.listToEdit;
        listToEdit.items.sort(this.compare);
        this.setState({listToEdit});
    }

    /**
     * This method tests to see if the current sorting criteria is the same as the argument.
     * 
     * @param {ItemSortCriteria} testCriteria Criteria to test for.
     */
    isCurrentItemSortCriteria = (testCriteria) => {
        return this.state.currentItemSortCriteria === testCriteria;
    }

    /**
     * This method compares two items for the purpose of sorting according to what
     * is currently set as the current sorting criteria.
     * 
     * @param {TodoListItem} item1 First item to compare.
     * @param {TodoListItem} item2 Second item to compare.
     */
    compare = (item1, item2) => {

        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
            // let temp = item1;
            // item1 = item2;
            // item2 = temp;
            [item1, item2] = [item2, item1];
        }
        // SORT BY ITEM DESCRIPTION
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        else if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
            let dueDate1 = item1.due_date;
            let dueDate2 = item2.due_date;
            let date1 = new Date(dueDate1);
            let date2 = new Date(dueDate2);
            if (date1 < date2)
                return -1;
            else if (date1 > date2)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
    }

    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Due Date header in the items table.
     */
    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }
    
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash
                showModal={this.showModal} 
                removeList={this.props.removeList}
                todoList={this.props.todoList}/>
                <Modal 
                    modalRef={this.modalRef} 
                    removeList={this.props.removeList}
                    hideModal={this.hideModal}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input
                            ref={this.nameInput}
                            onChange={this.updateListName.bind(this, this.state.listToEdit)} 
                            value={this.state.listToEdit.name} 
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input
                            ref={this.ownerInput} 
                            onChange={this.updateListOwner.bind(this, this.state.listToEdit)}
                            value={this.state.listToEdit.owner}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable
                    todoList={this.props.todoList}
                    listItems={this.state.listToEdit.items}
                    loadListItem={this.props.loadListItem}
                    goListItem={this.props.goListItem}
                    moveItemUp={this.moveItemUp}
                    moveItemDown={this.moveItemDown}
                    deleteItem={this.deleteItem}
                    updateJsTPS={this.props.updateJsTPS}
                    processSortItemsByDueDate={this.processSortItemsByDueDate.bind(this)}
                    processSortItemsByStatus={this.processSortItemsByStatus.bind(this)}
                    processSortItemsByTask={this.processSortItemsByTask.bind(this)} />
            </div>
        )
    }
}

export default ListScreen
