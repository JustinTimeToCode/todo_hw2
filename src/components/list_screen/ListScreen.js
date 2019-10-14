import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import Modal from './Modal'
import PropTypes from 'prop-types';
import ListNameChange_Transaction from '../../jsTPS/ListNameChange_Transaction'
import OwnerNameChange_Transaction from '../../jsTPS/OwnerNameChange_Transaction'
import Mousetrap from 'mousetrap'

export class ListScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            listToEdit: this.props.todoList,
            jsTPS: props.jsTPS
        }

        console.log(this.state);

        this.nameInput = React.createRef();
        this.ownerInput =  React.createRef();
        this.modalRef = React.createRef();
    }

    componentDidMount(){
        Mousetrap.bind(['ctrl+z','command+z'], this.handleUndo);
        Mousetrap.bind(['ctrl+y','command+y'], this.handleRedo)
    }

    componentWillUnmount(){
        Mousetrap.unbind(['ctrl+z','command+z']);
        Mousetrap.unbind(['ctrl+y','command+y']);
    }

    handleUndo = () =>{
        let jsTPS = this.state.jsTPS;
        jsTPS.undoTransaction();
        this.setState({jsTPS});
    }

    handleRedo = () =>{
        let jsTPS = this.state.jsTPS;
        jsTPS.doTransaction();
        this.setState({jsTPS})
    }

    updateListName(todoList){
         // WE'RE GOING TO CHANGE THE NAME TOO BUT ONLY UPDATE
        // THE LIST OF LIST LINKS IF IT'S CHANGED
        let listToEdit = todoList;
        let jsTPS = this.state.jsTPS;
        
        if (listToEdit.name !== this.nameInput.current.value) {
            let nameTransaction = new ListNameChange_Transaction(listToEdit.name, this.nameInput.current.value);
            jsTPS.addTransaction(nameTransaction);
            listToEdit.name = this.nameInput.current.value;
            this.setState({listToEdit})
            this.setState({jsTPS})
        }
    }

    updateListOwner(todoList){
        let listToEdit = todoList;
        let jsTPS = this.state.jsTPS;

        if (listToEdit.owner !== this.ownerInput.current.value) {
            let ownerTransaction = new OwnerNameChange_Transaction(listToEdit.owner, this.ownerInput.current.value);
            jsTPS.addTransaction(ownerTransaction);
            listToEdit.owner = this.ownerInput.current.value;
            this.setState({listToEdit})
            this.setState({jsTPS})
        }
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
                    jsTPS={this.props.jsTPS} 
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
