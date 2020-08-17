import React from 'react';
import './App.css'
import Post from './Post';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Jornada</h1>
                <Post title="Informe a Jornada: "/>
            </div>
        );
    }
}