import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
//import { useHistory } from 'react-router-dom'
//import { Link } from 'react-router-dom'
class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.signupClicked = this.signupClicked.bind(this)
    }
    signupClicked() {
        this.props.history.push('/signup');
    }
    handleChange(event) {
        //console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        // if (this.state.username === 'in28minutes' && this.state.password === 'dummy') {
        //     // console.log('Successful')
        //     // this.setState({
        //     //     showSuccessMessage: true,
        //     //     hasLoginFailed: false
        //     // })

        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }
        // else {
        //     console.log('Failed')
        //     this.setState({ showSuccessMessage: false })
        //     this.setState({ hasLoginFailed: true })
        // }
        // AuthenticationService
        //     .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     }).catch(() => {
        //         this.setState({ showSuccessMessage: false })
        //         this.setState({ hasLoginFailed: true })
        //     })

        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }
    // handleUsernameChange(event) {
    //     console.log(event.target.value)
    //     this.setState({
    //         username: event.target.value
    //     })
    // }
    // handlePasswordChange(event) {
    //     console.log(event.target.value)
    //     this.setState({
    //         password: event.target.value
    //     })
    // }
    render() {
        return (
            <div>
                {/*<h1>Login Page</h1>*/}
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    <div className="main">
                        <div className="col-md-3 col-sm-12">
                            <div className="login-form">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                                </div>
                                <button type="submit" id="Login" className="btn btn-black" onClick={this.loginClicked}>Login</button>
                                <button type="submit" className="btn btn-secondary" onClick={this.signupClicked}>Sign Up</button>
                            </div>
                        </div>
                    </div>

                    {/*<ShowInvalidCrendentials hasLoginFailed={this.state.hasLoginFailed} />
                    <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
                    {/*  {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    Username:<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    */}
                </div>
            </div>
        )
    }
}
// function ShowInvalidCrendentials(props) {
//     if (props.hasLoginFailed)
//         return <div>Invalid Credentials</div>
//     else
//         return null
// }

// function ShowLoginSuccessMessage(props) {
//     if (props.showSuccessMessage)
//         return <div>Login Successful</div>
//     else
//         return null
// }


export default LoginComponent