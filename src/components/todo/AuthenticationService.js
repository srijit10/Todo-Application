import axios from "axios"
import { API_URL, JPA_API_URL } from '../../Constants'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(API_URL + '/basicauth', {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        })
    }

    createTodoAccount(username, password) {
        return axios.post(API_URL + '/addUser', {
            username,
            password
        })
    }
    executeJwtAuthenticationService(username, password) {
        return axios.post(API_URL + '/authenticate', {
            username,
            password
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    registerSuccessfulLogin(username, password) {
        console.log('registerSuccessfulLogin')
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(basicAuthHeader)
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }
    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }
    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        return user
    }
    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()