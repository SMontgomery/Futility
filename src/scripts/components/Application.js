import React from 'react';

class Application extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { appName } = this.props;

        return (
            <h1>{appName}</h1>

        );
    }
}

export default Application;
