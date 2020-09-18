import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'

class SignUpComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            pass: null,
            repass: null,
            register: false,
            tobeadded: false,
            message: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }

    handleChange(event) {
        //console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    register() {
        console.log(this.state)
        if (this.state.user && this.state.pass && this.state.repass) {
            if (this.state.pass === this.state.repass) {
                console.log('Correct credentials')
                this.setState({
                    register: true,
                    tobeadded: true
                }
                )
                AuthenticationService.createTodoAccount(this.state.user, this.state.pass)
                    .then((response) => {
                        this.setState({ message: response.data })
                    })
                    .catch((error) => {
                        this.setState({ message: error.data })
                    })
            }
            else {
                console.log('Incorrect credentials')
                this.setState({
                    register: true,
                    tobeadded: false
                }
                )
            }
        }
        else {
            this.setState({ register: false })
        }
    }
    render() {
        return (
            <div>
                <h1>Create a Todo Account</h1>
                {this.state.register && this.state.tobeadded && <div className="alert alert-warning">{this.state.message}</div>}
                {this.state.register && !this.state.tobeadded && <div className="alert alert-warning">Password fields mismatch</div>}
                <table className="table table-sm table-striped">
                    <tbody>
                        <tr>
                            <td> <label>User Name</label></td>
                            <td><input type="text" placeholder="Username" name="user" onChange={this.handleChange}></input></td>
                        </tr>
                        <tr>
                            <td> <label>Password</label></td>
                            <td>  <input type="password" placeholder="Password" name="pass" onChange={this.handleChange}></input></td>
                        </tr>
                        <tr>
                            <td> <label>Re-enter Password</label></td>
                            <td>  <input type="password" placeholder="Password" name="repass" onChange={this.handleChange}></input></td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={this.register}>Register</button>
            </div >
        )
    }
}

export default SignUpComponent