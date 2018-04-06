import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Button, Col, Card } from 'react-materialize';
import PubSub from 'pubsub-js';
import moment, { months } from 'moment';

export default class ToList extends Component {

    constructor() {
        super();

        this.state = {tasks : []};
    }

    componentDidMount() {
        Axios.get("https://reactclass1.herokuapp.com/api/todo/5ac65f901f94a20004d0d56a")
        .then(
            (response) => { this.setState({tasks : response.data}); 
            console.log(this.state.tasks) },
            (error) => {
                console.log(error); }
        );

        PubSub.subscribe('addTask', (topico, response) => {
            this.setState({tasks : response});
        })
    }
    
    deleteTask (task) {

        let request = {data : task, usuario : task.usuario._id};

        Axios.delete("https://reactclass1.herokuapp.com/api/todo/", request)
        .then(
            (response) => {
                this.setState({tasks : response.data});
                window.Materialize.toast('Task excluído.', 2000, 'rounded green darken-4 white-text') 
            },
            (error) => {
                console.log(error);
            }
        );
    }

    editTask (task) {

        let upd = {data : task, usuario : task.usuario._id};
        //get passando o id da task como parâmetro e pegar todas prop (usuario, task, data, etc.)
        Axios.post("https://reactclass1.herokuapp.com/api/todo/", upd)
        .then(
            (response) => {
                this.setState({tasks : response.data});
                window.Materialize.toast('Task editado.', 2000, 'rounded orange darken-4 white-text') 
            },
            (error) => {
                console.log(error);
            }
        );
    }

    editTask
    
    render() {
        return (
            <Row>
                {this.state.tasks.map((task) => {
                    return <Col m={4} s={12} key={task._id}>
                        <Card className='cyan darken-2' textClassName='white-text' title={task.titulo} actions={
                                <Col s={12} m={12}>
                                <Button floating small className='green right' waves='light' icon='done' />
                                <Button floating small className='orange right' waves='light' icon='edit' onClick={this.editTask.bind(this, task)} />
                                <Button floating small className='red right' waves='light' icon='remove' onClick={this.deleteTask.bind(this, task)} />
                                </Col>}>
                        {moment.utc(task.data).format('MM/DD/YYYY')}
                        </Card>
                    </Col>
                })}
            </Row>
        )
    }
}