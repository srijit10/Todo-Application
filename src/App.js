import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import './bootstrap.css'
import FirstComponent from './components/learning-examples/FirstComponent'
import SecondComponent from './components/learning-examples/SecondComponent'
import ThirdComponent from './components/learning-examples/ThirdComponent'
// eslint-disable-next-line
//import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp.jsx'


class App extends Component {
  render() {
    return (
      //component name should be starting with capital letter
      <div className="App">
        {/*<Counter />*/}
        <TodoApp />
      </div>
    );
  }
}
// eslint-disable-next-line
class LearningComponents extends Component {
  render() {
    return (
      <div className="learningComponents">
        My Hello World
        <FirstComponent />
        <SecondComponent></SecondComponent>
        <ThirdComponent />
      </div>
    );
  }
}


export default App;
