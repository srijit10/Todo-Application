import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props) {
        //first constructor is called then render then if any change
        //is there in component , componentdidmount is called, after that render is called
        console.log('constructor')
        super(props)
        this.state = {
            todos: [
                // { id: 1, description: "Learn React", done: false, targetDate: new Date() },
                // { id: 2, description: "Learn to Dance", done: false, targetDate: new Date() },
                // { id: 3, description: "Visit India", done: false, targetDate: new Date() }
            ],
            message: null
        }
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }
    //after componentDidMount is called , it calls render()
    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                //console.log(response) 
                this.setState({ todos: response.data })
            })
    }

    //this is called when a new component is generated
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    //this is called when state change happens
    //whether a component is updated true => means update the component page
    //false means dont update with the changes
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    addTodoClicked() {
        console.log('create new Todo')
        this.props.history.push('/todos/-1')
    }
    updateTodoClicked(id) {
        console.log('UpdateTodo ' + id)
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username)
        // TodoDataService.updateTodo(username, id)
        //     .then(
        //         response => {
        //             this.setState({ message: `Delete of todo ${id} Successful` })
        //             //only when it is successful refresh the todos list
        //             this.refreshTodos()
        //         }
        //     )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username)
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    //only when it is successful refresh the todos list
                    this.refreshTodos()
                }
            )
    }
    render() {
        console.log('render')
        return (
            <div>
                <h1>Todos List</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Completed</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-info"
                                                onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning"
                                                onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button id="addTodos" className="btn btn-success" onClick={this.addTodoClicked}>Add Todos</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default ListTodosComponent