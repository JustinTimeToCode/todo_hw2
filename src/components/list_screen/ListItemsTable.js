import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         listToEdit: props.todoList //TodoList Object (access the items for array)
    //     }
    // }


    disableButtons = () =>{
        if(this.props.key === 0){
            
        }
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div id="list_items_container">
                <div className = "list_item_header_card">
                    <div className="list_item_task_header" >Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
                </div>    
                {
                    this.props.todoList.items.map((todoItem)=>( //todoListItem (Object)

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
