import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import Mousetrap from 'mousetrap'



export class ListItemsTable extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            listItems: props.todoList.items, //TodoList Object Items
            
        }

        
    }




    render() {
        return (
            <div id="list_items_container">
                <div className = "list_item_header_card">
                    <div onClick={this.props.processSortItemsByTask.bind(this)} className="list_item_task_header" >Task</div>
                    <div onClick={this.props.processSortItemsByDueDate.bind(this)} className="list_item_due_date_header">Due Date</div>
                    <div onClick={this.props.processSortItemsByStatus.bind(this)} className="list_item_status_header">Status</div>
                </div>    
                {
                    this.props.listItems.map((todoItem, index)=>( //todoListItem (Object)

                        <ListItemCard 
                            key={todoItem.key}
                            index={index}
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
