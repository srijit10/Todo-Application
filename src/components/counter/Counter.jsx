import React, { Component } from 'react';
import './Counter.css';
import PropTypes from 'prop-types';

class Counter extends Component {
    constructor() {
        super() //super is required to get access to this keyword of the class
        this.state = {
            counter: 0
        }
        // binding the increment function to this else not accessible
        //arrow functions have inbuilt binding if arrow functions are used,
        //we dont need to bind like this 
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }
    render() {
        return (
            //component name should be starting with capital letter
            <div className="counter">
                <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <span className="count">{this.state.counter}</span>
                <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
        );
    }
    reset() {
        this.setState({
            counter: 0
        })
    }
    increment(by) {
        //console.log("increment from parent")
        //this.state.counter++; BAD practice
        this.setState({
            counter: this.state.counter + by
        })
    }
    decrement(by) {
        //console.log("increment from parent")
        //this.state.counter++; BAD practice
        this.setState({
            counter: this.state.counter - by
        })
    }
}

class CounterButton extends Component {
    // constructor() {
    //     super() //super is required to get access to this keyword of the class
    //     this.state = {
    //         counter: 0
    //     }
    //     // binding the increment function to this else not accessible
    //     //arrow functions have inbuilt binding if arrow functions are used,
    //     //we dont need to bind like this 
    //     this.increment = this.increment.bind(this)
    //     this.decrement = this.decrement.bind(this)
    // }
    render() {
        //inline styling can also be used
        //const style = { fontSize: "50px", padding: "15px 30px" }
        return (
            <div className="Counter" >
                {/*<button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>*/}
                <button onClick={() => { this.props.incrementMethod(this.props.by) }}>+{this.props.by}</button>
                <button onClick={() => { this.props.decrementMethod(this.props.by) }}>-{this.props.by}</button>
                {/*<span className="count"
                //style={style}
                >{this.state.counter}</span>*/}
            </div>
        )
    }
    // increment() {
    //     //this.state.counter++; BAD practice
    //     this.setState(
    //         (prevState) => {
    //             return { counter: prevState.counter + this.props.by }
    //         }
    //     )
    //     this.props.incrementMethod(this.props.by);
    // }
    // decrement() {
    //     //this.state.counter++; BAD practice
    //     this.setState(
    //         (prevState) => {
    //             return { counter: prevState.counter - this.props.by }
    //         }
    //     )
    //     this.props.decrementMethod(this.props.by);
    // }
}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter