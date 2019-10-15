import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import Mousetrap from 'mousetrap'

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}

export class ListItemsTable extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            listItems: props.todoList.items, //TodoList Object Items
            currentItemSortCriteria: null
        }
    }



    disableButtons = () =>{
        // if(this.props.key === 0){
            
        // }
    }

    /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
    sortTasks(sortingCriteria) {
        this.setState({currentItemSortCriteria: sortingCriteria});
        let listItems = this.state.listItems;
        listItems.sort(this.compare);
        this.setState({listItems});
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
        // ALL OTHER CASES SORT BY INCRASING
        else {
            this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }


    render() {
        return (
            <div id="list_items_container">
                <div className = "list_item_header_card">
                    <div onClick={this.processSortItemsByTask.bind(this)} className="list_item_task_header" >Task</div>
                    <div onClick={this.processSortItemsByDueDate.bind(this)} className="list_item_due_date_header">Due Date</div>
                    <div onClick={this.processSortItemsByStatus.bind(this)} className="list_item_status_header">Status</div>
                </div>    
                {
                    this.props.listItems.map((todoItem)=>( //todoListItem (Object)

                        <ListItemCard 
                            key={todoItem.key}
                            todoList={this.props.todoList}
                            listItem={todoItem}
                            loadListItem={this.props.loadListItem.bind(this, todoItem)}
                            disableButton={this.disableButtons}
                            moveItemUp={this.props.moveItemUp}
                            moveItemDown={this.props.moveItemDown}
                            deleteItem={this.props.deleteItem} />
                    ))
                }
                <div onClick = {this.props.goListItem} className = 'list_item_add_card'>
                    <strong> + </strong>
                </div>
            </div>
        )
    }
}

export default ListItemsTable
