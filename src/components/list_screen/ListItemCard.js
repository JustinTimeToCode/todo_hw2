import React, { Component } from 'react'

export class ListItemCard extends Component {

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
                    <button onClick = {(e) => this.props.moveItemUp(e, this.props.listItem)} id={`item_card_${this.props.index}_move_up`} className='list_item_card_button move_up'>&#8679;</button>
                    <button onClick = {(e) => this.props.moveItemDown(e, this.props.listItem)} id={`item_card_${this.props.index}_move_down`} className='list_item_card_button move_down'>&#8681;</button>
                    <button onClick = {(e) => this.props.deleteItem(e, this.props.listItem)} className='list_item_card_button'>&#10005;</button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
