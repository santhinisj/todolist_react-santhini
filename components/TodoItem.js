import React, { Component } from 'react';

class TodoItem extends Component {
    deleteElement(id) {
        console.log('Todoitem');
        this.props.deleteItem(id);
    }
    checkElement(id) {
        this.props.checkItem(id);
    }
    render() {
        // console.log(this.props.todo.title);
        return ( <
            li className = "todoItem" >
            <
            input type = "checkbox"
            name = "check"
            defaultChecked = { this.props.todo.check }
            onClick = { this.checkElement.bind(this, this.props.todo.id) }
            /> { this.props.todo.title } <
            button onClick = { this.deleteElement.bind(this, this.props.todo.id) } > Delete < /button> < /
            li >
        );
    }
}

export default TodoItem;