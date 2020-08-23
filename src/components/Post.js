import React from 'react';
import Comment from './Comment';
import Invalid from './Invalid';
import Calculo from './calculo';
import M from 'materialize-css';

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            newJourneyInit: '',
            newJourneyFinish: '',
            invalids: [],
            diurno: '',
            noturno: '',
            jornada: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChangeInit = this.handleTextChangeInit.bind(this);
        this.handleTextChangeFinish = this.handleTextChangeFinish.bind(this);

    }

    validInput(value) {
        const regex = new RegExp('([01][0-9]|2[0-3]):[0-5][0-9]', 'gmi');
        return regex.exec(value)
    }

    handleSubmit(e) {

        if (this.validInput(this.state.newJourneyInit) && this.validInput(this.state.newJourneyFinish)) {

            let jornadas = '';

            jornadas = Calculo.post({ horaInicial: this.state.newJourneyInit, horaFinal: this.state.newJourneyFinish });

            this.setState({
                comments: [

                    {
                        textInit: this.state.newJourneyInit,
                        textFinish: this.state.newJourneyFinish,
                        textJornada: jornadas

                    },
                    ...this.state.comments
                ],
                invalids: [{ textInvalid: '' }]
            });


            this.setState({ newJourneyInit: '', newJourneyFinish: '', jornada: '' });
            jornadas = '';

        } else {

            this.setState({
                invalids:
                    [{ textInvalid: 'Campos inválidos: 00:00 até 23:59' }],
                     newJourneyInit: '', newJourneyFinish: '', jornada: '' 

            });
        }
        e.preventDefault();
    }

    handleTextChangeInit(e) {
        this.setState({
            newJourneyInit: e.target.value
        })
    }

    handleTextChangeFinish(e) {
        this.setState({
            newJourneyFinish: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h3> {this.props.title} </h3>
                <div class="row">
                    <form class="col s12" onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div class="input-field col s6">
                                <i class="material-icons prefix">access_time</i>
                                <input
                                    id="icon_hora_inicial" type="text" class="validate"
                                    value={this.state.newJourneyInit}
                                    onChange={this.handleTextChangeInit}
                                    placeholder='00:00'
                                    maxLength='5'
                                    pattern="[0-9]{2}:[0-9]{2}$" 
                                />
                                <label for="icon_hora_inicial">Hora Inicial</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix" >access_time</i>
                                <input
                                    id="icon_hora_final" type="text" class="validate"
                                    value={this.state.newJourneyFinish}
                                    onChange={this.handleTextChangeFinish}
                                    placeholder='00:00'
                                    maxLength='5'
                                    pattern="[0-9]{2}:[0-9]{2}$" 
                                />
                                <label for="icon_hora_final">Hora Final</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s3 offset-s9">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Calcular
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <div>

                    {
                        this.state.invalids.map((invalid, index) => {
                            return <Invalid key={index} invalidText={invalid.textInvalid} />
                        })
                    }
                </div>
                
                <div>
                    {
                        this.state.comments.map((comment, index) => {
                            return <Comment key={index} textInit={comment.textInit} textFinish={comment.textFinish} textJornada={comment.textJornada} />
                        })
                    }
                </div>
            </div>
        )
    }

} 