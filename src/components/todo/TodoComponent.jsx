import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import AuthenticationService from './AuthenticationService'
import TodoDataService from '../../api/todo/TodoDataService'
class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            completed: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    componentDidMount() {
        if (this.state.id === '-1')
            return
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                completed: response.data.completed
            }))
    }
    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a description'
        }
        else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters in description'
        }

        if (!moment(values.targetDate).isValid)
            errors.targetDate = 'Enter a valid target date'
        //console.log(values)
        return errors
    }
    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
            completed: values.completed
        }
        if (this.state.id === '-1') {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'))
        }
        else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }
        console.log(values)
    }
    render() {
        //let description = this.state.description
        //let targetDate = this.state.targetDate
        let { description, targetDate, completed } = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description: description,
                            targetDate: targetDate,
                            completed: completed
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Completed</label>
                                        <Field className="form-control" type="text" name="completed" />
                                    </fieldset>
                                    <button className="btn btn-success" type="Submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}
export default TodoComponent