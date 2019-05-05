import React, { Component } from 'react';
import { Button, Row, Col, Input, Card } from 'react-materialize';
import Axios from 'axios';
import PubSub from 'pubsub-js';


export default class CreateToDoList extends Component {

    constructor() {
        super();

        this.state = {users : [], data: '', task : '', user : '0'};
        this.enviaForm = this.enviaForm.bind(this);
        //this.setData = this.setData.bind(this);
    }

    componentDidMount() {

        Axios.get("https://reactclass1.herokuapp.com/api/usuario")
        .then(
            (response) => { 
                    this.setState({users : response.data});  
                },
            (error) => {
                console.log(error); }
        );
    }

    setValue = (input, evento) => {
        this.setState({[input] : evento.target.value});
    }

    enviaForm(e) {
        e.preventDefault();

        let dados = {data:this.state.data, titulo:this.state.task, usuario:this.state.user};

        Axios.post("https://reactclass1.herokuapp.com/api/todo", dados)
        .then(
            (response) => {
                PubSub.publish("addTask", response.data);
                this.setState({task: '', data : '', user : '0'});
                window.Materialize.toast('Task incluído!', 2000, 'rounded green darken-4 white-text')
            },
            (error) => {
                if (this.state.task === '' || this.state.data === '' || this.state.usuario === 0){
                    window.Materialize.toast('Favor inserir todas iformações, fera.', 2000, 'rounded red darken-4 white-text') 
                }
                else
                window.Materialize.toast('Erro ao incluir task.', 2000, 'rounded red darken-4 white-text') 
            }
        );
    }

    render() {
        return (
            <Row>
                <Col s={12} m={8}>
                <Card s={2} m={8} className='cyan darken-2' textClassName='white-text' title='Criar Tarefa' align='left'>Insira seus "To-Do's"</Card>
                    <Col s={12} m={8} className='grid-example'>
                        <Input placeholder="Tarefa" s={12} m={12} label="Nome da tarefa" value={this.state.task} onChange={this.setValue.bind(this, 'task')}/>
                        <Input placeholder="Data" s={12} m={3}  type='date' label="Data da tarefa" value={this.state.data} onChange={this.setValue.bind(this, 'data')} />
                        <Input placeholder="Hora" s={12} m={2}  type='time' label="Hora" value={this.state.hora} onChange={this.setValue.bind(this, 'hora')} />
                        <Input s={12} m={5} type='select' label="Usuário" value={this.state.user} onChange={this.setValue.bind(this, 'user')}>
                            <option value='0'>Selecione o Usuário</option>
                                {   
                                    this.state.users.map((user) => {
                                        return <option value={user._id} key={user._id}>{user.nome}</option> 
                                    })
                                }
                        </Input>
                    </Col>
                    <Col s={6} m={2}>
                        <Button floating large className='green' waves='light' icon='add' onClick={this.enviaForm} />
                    </Col>
                </Col>
            </Row>
        )
    }
}