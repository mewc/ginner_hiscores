import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonPin from '@material-ui/icons/PersonPin';
import Waves from '@material-ui/icons/Waves';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import { basenavChange } from '../actions/app';

const styles = {
    baseNav: {
        root: {
            width: '100%',
            position: 'fixed',
            bottom: 0
        }
    }
}


class BaseNav extends Component {

    constructor(props) {
        super(props);

    }

    handleNavClick(index) {
        this.props.dispatch(basenavChange(index))
    }

    render() {
        const { classes, children, className, ...other } = this.props;
        return (
            <BottomNavigation
                value={this.props.activetab}
                onChange={(event, newValue) => {
                    console.log('nav clicked');
                    this.handleNavClick(newValue)
                }}
                showLabels
                className={clsx(classes.root, className)} {...other}
            >
                <BottomNavigationAction label="Scores" icon={<PersonPin />} />
                {/* <BottomNavigationAction label="Settings" icon={<SettingsIcon />} /> */}
            </BottomNavigation>
        );
    }


}


const mapStateToProps = (state) => {
    return {
        activetab: state.app.activeTabIndex
    }
}

export default connect(mapStateToProps)(withStyles(styles.baseNav)(BaseNav));