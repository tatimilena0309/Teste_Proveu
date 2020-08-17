import React from 'react';
import Post from './Post';
import 'materialize-css/dist/css/materialize.min.css'

export default class App extends React.Component {
    render() {
        return (

        
                <div class="container grey lighten-2" >
                    
                    <div>
                        <nav>
                            <div class="nav-wrapper teal darken-4 ">
                            <a href="#" class="brand-logo right">Jornada</a>
                            </div>
                        </nav>            
                        <Post title="Informe a Jornada: " />
                    </div>
                </div>
        

        );
    }
}