import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Settings from './Settings';
import Scores from './Scores';
import Analytics from './Analytics';

import { basenavChange } from '../actions/app';

const styles = {
    baseNav: {
        root: {
            width: '100%',
            margin: '10px'
        }
    },
    wrapper: {
        position: 'absolute',
        display: 'block',
        width: '100%'
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
                    <Scores diff={'easy'} />
                </div>
            case 1:
                return <div className={classes.wrapper}>
                    <Scores diff={'hard'} />
                </div>
            case 2:
                return <div className={classes.wrapper}>
                    <Analytics />
                </div>
            case 3:
                return <div className={classes.wrapper}>
                    <Settings />
                </div>
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