/* jshint esversion:6 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import AddTodo from './AddTodo';
import Todos from './Todos';
import uuid from 'uuid';

class TodoContainer extends Component {
    constructor() {
        super();
        this.state = {
            todos: []
        }
    }
    componentWillMount() {
        fetch("/todos")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    todos: data
                })
            )
    }
    addTodoHandler(todo) {
        let prevTodos = [...this.state.todos, todo];
        this.setState({ todos: prevTodos });
        console.log(prevTodos);
        fetch("/todos", {
                method: "POST",
                body: JSON.stringify({ data: todo }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(body => console.log(body))
    }
    deleteTodoHandler(id) {
        console.log(" DeleteTodoHandler");
        let prevTodos = this.state.todos;
        let todosAfterDeletion = prevTodos.filter(todo => todo.id != id);
        this.setState({ todos: todosAfterDeletion },
            () => {
                fetch('/todos/' + id, {
                        method: 'delete'
                    })
                    .then(response => response.json())
                    .then(body => console.log(body))
            })
    }


    checkTodoHandler(id) {
        console.log("checktodohandler");
        let prevTodos = this.state.todos;
        let checkedState;
        let todosAfterDeletion = prevTodos.map(todo => {
            if (todo.id === id) {
                console.log('befre', todo.check);
                console.log(todo);
                todo.check = (todo.check === false) ? true : false;
                checkedState = todo.check;
                console.log(checkedState);

            }
            return todo;
        })
        this.setState({ todos: todosAfterDeletion },
            () => {
                fetch('/todos/' + id, {
                        method: 'put',
                        body: JSON.stringify({ data: checkedState }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => response.json())
                    .then(body => console.log(body))
            })
    }
    render() {
        return ( <
            div className = "TodoContainer" >
            <
            h1 > TODOLIST < /h1> <
            AddTodo addTodo = { this.addTodoHandler.bind(this) }
            /> <
            Todos todos = { this.state.todos }
            onCheck = { this.checkTodoHandler.bind(this) }
            onDelete = { this.deleteTodoHandler.bind(this) }
            /> < /
            div >
        );
    }
}

export default TodoContainer;