import React, { Component } from 'react';
import './App.css';
import CreateToDoList from './Components/CreateToDoList';
import ToDoList from './Components/ToDoList';
import Header from './Components/Header';
import { Row } from 'react-materialize';

class App extends Component {
  render() {
    return (
    <Row>
        <Header />
        <CreateToDoList />
        <ToDoList />
     </Row>
    );
  }
}

export default App;
