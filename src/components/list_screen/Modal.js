import React, { Component } from 'react'

export default class Modal extends Component{
    
    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //         //  listToDelete: props.todoList,
    //     }
    // }
    
    render(){
        return(
            <div ref={this.props.modalRef} className="modal" id="modal_yes_no_dialog" data-animation="slideInOutLeft">
                <div className="modal_dialog">
                    <header className="dialog_header">
                        Delete list?
                    </header>
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                    </section>
                        <button onClick={this.props.removeList} id="dialog_yes_button">Yes</button>
                        <button onClick={this.props.hideModal} id="dialog_no_button" >No</button>
                    <footer className="dialog_footer">
                        The list will not be retrievable.
                    </footer>
                </div>
            </div>
        )
    }
}

