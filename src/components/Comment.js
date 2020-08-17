import React from 'react';

export default class Comment extends React.Component {
    render() {
        return (
            <div>
                <p> { this.props.textInit } - {this.props.textFinish}</p>
                <p> { this.props.textJornada } </p>
                <hr/>
            </div>
        );
    }
}