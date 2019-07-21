import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fade, } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import { refreshScores } from '../actions/scores';
import ginnersTheme from '../static/ginnersTheme';


import GinnersLogo from '../static/ginners-logo-final.png'



const useStyles = () => {
    let theme = ginnersTheme;
    return ({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: '10px',
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: '30px',
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: '30px',
                width: 'auto',
            },
        },
        searchIcon: {
            width: '50px',
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: '5px 5px 5px 50px',
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        logo: {
            height: '50px',
            padding: '15px',
            paddingRight: '30px'
        },
        rightButtons: {
            paddingRight: '5%'
        }
    })
};

class PrimarySearchAppBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: useStyles()
        }
        this.handleRefreshScores = this.handleRefreshScores.bind(this);
    }

    handleRefreshScores(event) {
        console.log(this.props);
        this.props.dispatch(refreshScores());
    }

    render() {
        return (
            <div className={this.props.classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <img alt="The Ginners" src={GinnersLogo} className={this.props.classes.logo} />
                        <div className={this.props.classes.search}>
                            <div className={this.props.classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search username…"
                                classes={{
                                    root: this.props.classes.inputRoot,
                                    input: this.props.classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                        </div>

                        <div className={this.props.classes.grow} />
                        <div className={this.props.classes.rightButtons}>
                            <IconButton
                                edge="end"
                                aria-label="Refresh"
                                aria-haspopup="true"
                                onClick={this.handleRefreshScores}
                                color="inherit"
                            >
                                <Refresh />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activetab: state.app.activeTabIndex
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(PrimarySearchAppBar));