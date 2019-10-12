import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            listItems: props.todoList.items //TodoList Object (access the items for array)
        }
    }

    moveItemUp = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listItems.indexOf(todoItem);
        let listItems = this.state.listItems;
        if (index !== 0) {
            [listItems[index], listItems[index - 1]] = 
            [listItems[index - 1], listItems[index]]   
        }
        this.setState({listItems});
        console.log('You clicked the move item up button');
        console.log(index);
    }

    moveItemDown = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listItems.indexOf(todoItem);
        let listItems = this.state.listItems;
        if (index !== this.state.listItems.length - 1) {
            [listItems[index], listItems[index + 1]] = 
            [listItems[index + 1], listItems[index]]
        }
        this.setState({listItems});
        console.log('You clicked the move item down button');
        console.log(index);
    }

    deleteItem = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listItems.indexOf(todoItem);
        let listItems = this.state.listItems;
        listItems.splice(index, 1);
        this.setState({listItems});
        console.log('You clicked the delete item button');
        console.log(index);
    }

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
                    this.state.listItems.map((todoItem)=>( //todoListItem (Object)

                        <ListItemCard 
                            key={todoItem.key}
                            todoList={this.props.todoList}
                            listItem={todoItem}
                            loadListItem={this.props.loadListItem.bind(this, todoItem)}
                            disableButton={this.disableButtons}
                            moveItemUp={this.moveItemUp}
                            moveItemDown={this.moveItemDown}
                            deleteItem={this.deleteItem} />
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
