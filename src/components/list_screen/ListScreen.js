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
            
            listToEdit.name = this.nameInput.current.value;
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
                    listItems={this.state.listToEdit.items}
                    loadListItem={this.props.loadListItem}
                    goListItem={this.props.goListItem}
                    moveItemUp={this.moveItemUp}
                    moveItemDown={this.moveItemDown}
                    deleteItem={this.deleteItem}
                    updateJsTPS={this.props.updateJsTPS} />
            </div>
        )
    }
}

export default ListScreen
