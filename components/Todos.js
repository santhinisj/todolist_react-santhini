/* jshint esversion:6 */
import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends Component {
    deleteElement(id) {
        console.log('id');
        // console.log(this.props);  
        this.props.onDelete(id);
    }
    checkElement(id) {
        this.props.onCheck(id);
    }
    render() {
        let todoItems;
        if (this.props.todos) {
            console.log(this.props);
            todoItems = this.props.todos.map(todo => {
                console.log(todo);
                return ( <
                    TodoItem checkItem = { this.checkElement.bind(this) }
                    deleteItem = { this.deleteElement.bind(this) }
                    key = { todo.title }
                    todo = { todo }
                    />
                );
            })
        }
        // console.log(this.props);
        return ( < div className = "Todos" > { todoItems } < /div>);
        }
    }

    export default Todos;