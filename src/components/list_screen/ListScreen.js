import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import Modal from './Modal'
import PropTypes from 'prop-types';

export class ListScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            listToEdit: this.props.todoList,
        }

        console.log(this.state);

        this.nameInput = React.createRef();
        this.ownerInput =  React.createRef();
        this.modalRef = React.createRef();
    }

    updateListName(todoList){
         // WE'RE GOING TO CHANGE THE NAME TOO BUT ONLY UPDATE
        // THE LIST OF LIST LINKS IF IT'S CHANGED
        let listToEdit = todoList;
        
        if (listToEdit.name !== this.nameInput.current.value) {
            listToEdit.name = this.nameInput.current.value;
            this.setState({listToEdit})
        }
    }

    updateListOwner(todoList){
        let listToEdit = todoList;
        
        if (listToEdit.owner !== this.ownerInput.current.value) {
            listToEdit.owner = this.ownerInput.current.value;
            this.setState({listToEdit})
        }
    }

    moveItemUp = (e) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(this.state.listItem);
        let listToEdit = this.state.listToEdit;
        if (index !== 0) {
            [listToEdit.items[index], listToEdit.items[index - 1]] = 
            [listToEdit.items[index - 1], listToEdit.items[index]]   
        }
        this.props.loadList(this.state.listToEdit);
        this.forceUpdate();
        console.log('You clicked the move item up button');
        console.log(index);
    }

    moveItemDown = (e) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(this.state.listItem);
        let listToEdit = this.state.listToEdit;
        if (index !== this.state.listToEdit.items.length - 1) {
            [listToEdit.items[index], listToEdit.items[index + 1]] = 
            [listToEdit.items[index + 1], listToEdit.items[index]]
        }
        this.props.loadList(this.state.listToEdit);
        this.forceUpdate();
        console.log('You clicked the move item down button');
        console.log(index);
    }

    deleteItem = (e) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(this.props.listItem);
        console.log('You clicked the delete item button');
        console.log(index);
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
                    loadListItem={this.props.loadListItem}
                    goListItem={this.props.goListItem}
                    moveItemUp={this.moveItemUp}
                    moveItemDown={this.moveItemDown}
                    deleteItem={this.deleteItem} />
            </div>
        )
    }
}

export default ListScreen
