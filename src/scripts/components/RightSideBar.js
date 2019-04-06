import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

function RightSideBar(props) {

    const beadData = props.beads.map((beadInfo, index) => ({
        index,
        brand: beadInfo.bead.brand,
        name: beadInfo.bead.name,
        count: beadInfo.count
    })).sort((b1, b2) => {
        const check = b2.count - b1.count;
        if (check !== 0) {
            return check;
        }

        const name1 = b1.name.toLowerCase();
        const name2 = b2.name.toLowerCase();

        if (name1 < name2) {
            return -1;
        } else if (name2 < name1) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <div className={props.className}>
            <Table striped size='sm'>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {beadData.map(data => (
                        <tr key={data.index}>
                            <td>{data.brand}</td>
                            <td>{data.name}</td>
                            <td>{data.count}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

RightSideBar.propTypes = {
    beads: PropTypes.array,
    className: PropTypes.string
};

const mapStateToProps = (state) => ({
    beads: state.project.beads
});

export default connect(mapStateToProps)(RightSideBar);

