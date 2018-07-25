import React, { Component } from 'react';
import uuid from 'uuid';
class AddTodo extends Component {
    constructor() {
        super();
    }

    handleSubmit(e) {
        if (e.target.previousSibling.value !== '') {
            // debugger;
            console.log(e.target.previousSibling.value);
            let newTodo = {
                id: uuid.v4(),
                title: e.target.previousSibling.value,
                check: false
            }

            this.props.addTodo(newTodo);
        }
        // e.preventDefault();
    }
    render() {
        return ( < div >
            <
            h3 >
            Add a new item:
            <
            /h3> <input type = "text" ref = "title" / >
            <
            button onClick = { this.handleSubmit.bind(this) }
            value = 'submit' > Add < /button>  < /
            div >
        );
    }
}

export default AddTodo;