import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

class HeaderComponent extends Component {
    render() {
        let isUserLogged = AuthenticationService.isUserLoggedIn()
        console.log(isUserLogged)
        let getusername = AuthenticationService.getLoggedInUserName()
        console.log(getusername)
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="/" className="navbar-brand">Todo Application</a></div>
                        <ul className="navbar-nav">
                            {isUserLogged && <li><Link className="nav-link" to={`/welcome/${getusername}`}>Home</Link></li>}
                            {isUserLogged && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLogged && <li><Link className="nav-link" to="/login">Login</Link></li>}
                            {isUserLogged && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>

                    </nav>
                </header>
            </div >
        )
    }
}

export default withRouter(HeaderComponent)