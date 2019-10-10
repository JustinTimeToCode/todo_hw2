import React, { Component } from 'react'

export class ListTrash extends Component {
    
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         listToDelete: this.props.todoList,
    //         showDialog: false
    //     }
    // }
    
    render() {
        return (
            <div onClick = {this.props.deleteList} id="list_trash">&#128465;</div>
        )
    }
}

export default ListTrash
