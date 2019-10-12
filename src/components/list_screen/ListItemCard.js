import React, { Component } from 'react'

export class ListItemCard extends Component {

    // constructor(props){
    //     super(props);

    //     this.state = {
    //         todoList: this.props.todoList
    //     }
    // }

    render() {
        return (
            <div className='list_item_card' onClick = {this.props.loadListItem.bind(this, this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={ this.props.listItem.completed ? 'list_item_card_completed' : 'list_item_card_not_completed'}>
                    {this.props.listItem.completed ? 'Completed' : 'Pending'}
                </div>
                <div className = 'list_item_card_toolbar'>
                    <button onClick = {this.props.moveItemUp.bind(this)} className='list_item_card_button'>&#8679;</button>
                    <button onClick = {this.props.moveItemDown.bind(this)} className='list_item_card_button'>&#8681;</button>
                    <button onClick = {this.props.deleteItem.bind(this)} className='list_item_card_button'>&#10005;</button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
