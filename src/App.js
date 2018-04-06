import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateToDoList from './Components/CreateToDoList';
import ToDoList from './Components/ToDoList';
import { Row, Col } from 'react-materialize';

class App extends Component {
  render() {
    return (
    <Row>
        <CreateToDoList />
        <ToDoList />
     </Row>
    );
  }
}

export default App;
