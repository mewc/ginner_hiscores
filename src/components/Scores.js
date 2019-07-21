import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress, Button, TableFooter } from '@material-ui/core';
import ginnersTheme from '../static/ginnersTheme';
import { activeScoreDifficultyChange } from '../actions/app';


const HARD_INDEX = 0;
const EASY_INDEX = 1;


const useStyles = () => {
    let theme = ginnersTheme;
    return ({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: {
            minWidth: '50px',
        },
    });
}
class Scores extends Component {
    constructor(props) {
        super(props);
        this.changeDifficultyScoresetDisplayed = this.changeDifficultyScoresetDisplayed.bind(this)
    }
    changeDifficultyScoresetDisplayed(index) {
        this.props.dispatch(activeScoreDifficultyChange(index))
    }

    render() {
        let { classes } = this.props;
        console.log({ 'props': this.props });
        if (this.props.scores) {
            let dataRows = [];


            return (
                <React.Fragment>
                    {/* <Button label={'HARD'} onClick={() => this.changeDifficultyScoresetDisplayed(HARD_INDEX)} >HARD</Button> */}
                    {/* <Button label={'EASY'} onClick={() => this.changeDifficultyScoresetDisplayed(EASY_INDEX)} >EASY</Button> */}
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ranking</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(this.props.scores[0]).forEach((key, index) => {
                                    dataRows.push((
                                        <TableRow key={key} >
                                            <TableCell >{index}</TableCell>
                                            <TableCell scope="row">
                                                {this.props.activeScoreSet[key].username}
                                            </TableCell>
                                            <TableCell align="right">{this.props.activeScoreSet[key].score}</TableCell>
                                        </TableRow>))
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </React.Fragment>
            )
        } else {
            return (
                <LinearProgress />
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        scores: state.scores.scores
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Scores));