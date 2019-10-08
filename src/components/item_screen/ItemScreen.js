import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {

    constructor(props){
        super(props);

        this.state ={
            listToEdit: props.todoList,
            itemToEdit: props.todoItem
        }

        this.descriptionInput = React.createRef();
        this.assignedToInput = React.createRef();
        this.dueDatePicker = React.createRef();
        this.completedCheckbox = React.createRef();
    }

    componentDidMount(){
        if(this.state.itemToEdit !== null){
            let description = this.descriptionInput.current;
            let assignedTo = this.assignedToInput.current;
            let dueDate = this.dueDatePicker.current;
            let completedCheckbox = this.completedCheckbox.current;

            description.value = this.state.itemToEdit.description;
            assignedTo.value = this.state.itemToEdit.assigned_to;
            dueDate.value = this.state.itemToEdit.due_date;
            completedCheckbox.checked = this.state.itemToEdit.completed;
        }
    }

    submitItemChanges(){
        if (this.state.itemToEdit != null) {
            this.setState({ itemToEdit: {
                key: this.state.itemToEdit.key,
                description: this.descriptionInput.current.value,
                due_date: this.dueDatePicker.current.value,
                assigned_to: this.assignedToInput.current.value,
                completed: this.completedCheckbox.current.value
            }})
        } else {
            this.state.listToEdit.items.push({
                key: this.state.listToEdit.length,
                description: this.descriptionInput.current.value,
                due_date: this.dueDatePicker.current.value,
                assigned_to: this.assignedToInput.current.value,
                completed: this.completedCheckbox.current.value
            })
        }
        this.props.goList();
    }

    render() {
        return (
            <div id="todo_item">
                <strong> Item </strong>
                <form id="item_form_container">
                    <strong id="item_description_prompt" className="item_prompt">Description:</strong>
                    <input ref={this.descriptionInput} type="text" id="item_description_textfield" className="item_input"/>
                    <strong id="item_assigned_to_prompt" className="item_prompt">Assigned To:</strong>
                    <input ref={this.assignedToInput} type="text" id="item_assigned_to_textfield" className="item_input"/>
                    <strong id="item_date_prompt" className="item_prompt">Due Date:</strong>
                    <input ref={this.dueDatePicker} type="date" id="item_date_picker" className="item_input"/>
                    <strong id="item_completed_prompt" className="item_prompt">Completed:</strong>
                    <input ref={this.completedCheckbox} type="checkbox" id="item_completed_checkbox" className="item_input"/>
                </form>
                <input onClick={this.submitItemChanges.bind(this)} className="item_form_button" type="submit"/>
                <input 
                className="item_form_button" 
                type="button"
                value="Cancel"
                onClick = {this.props.goList} />
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
