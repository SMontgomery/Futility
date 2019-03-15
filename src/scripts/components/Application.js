import PropTypes from 'prop-types';
import React from 'react';
import Project from '../project/project';
import { WorkSurface } from './WorkSurface';

class Application extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            project: new Project(10, 10, 2, 2)
        };
    }

    render() {
        const {appName} = this.props;

        return (
            <div>
                <h1>{ appName }</h1>

                <WorkSurface project={this.state.project} />
            </div>
        );
    }
}

Application.propTypes = {
    appName: PropTypes.string.isRequired
};

export default Application;

