import React from 'react';

export default class Invalid extends React.Component {
    render() {
        return (
            <p> { this.props.invalidText }</p>
        );
    }
}