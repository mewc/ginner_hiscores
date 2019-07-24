import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Settings from './Settings';
import Scores from './Scores';

import { basenavChange } from '../actions/app';

const styles = {
    baseNav: {
        root: {
            width: '100%',
            padding: '10px'
        }
    },
    wrapper: {
        padding: '10px'
    }
}


class MainContent extends Component {

    constructor(props) {
        super(props);

    }



    render() {
        const { classes, children, className, ...other } = this.props;
        switch (this.props.activetab) {
            case 0:
                return <div className={classes.wrapper}>
                    <Scores diff={'easy'}/>
                    <Scores diff={'hard'}/>
                    </div>
            case 1:
                return <Settings />
            default:
                return <p>Something went wrong...</p>
                break;
        }
    }


}


const mapStateToProps = (state) => {
    return {
        activetab: state.app.activeTabIndex
    }
}

export default connect(mapStateToProps)(withStyles(styles)(MainContent));