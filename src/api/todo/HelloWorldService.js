import axios from 'axios'
import { API_URL } from '../../Constants'

class HelloWorldService {
    executeHelloWorldService() {
        //console.log('executed service')
        return axios.get(`${API_URL}/hello-world`)
    }
    executeHelloWorldBeanService() {
        return (axios.get(`${API_URL}/hello-world-bean`))
    }
    executeHelloWorldPathVariableService(name) {
        // let username = 'in28minutes'
        // let password = 'dummy'
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        //console.log(basicAuthHeader)
        //axios.defaults.headers.common['Authorization'] = basicAuthHeader;
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`)
        // , {
        //     headers: {
        //         authorization: basicAuthHeader
        //     }
        // })

    }
}

export default new HelloWorldService()