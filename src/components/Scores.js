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
            width: '60%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
            margin: 'auto'
        },
        table: {
            minWidth: '50px',
        },
        ranking: {
            color: '#123',
            textDecoration: 'underline'
        }
    });
}
class Scores extends Component {
    constructor(props) {
        super(props);
        this.changeDifficultyScoresetDisplayed = this.changeDifficultyScoresetDisplayed.bind(this)
    }
    changeDifficultyScoresetDisplayed() {
        this.props.dispatch(activeScoreDifficultyChange())
    }

    render() {
        let { classes } = this.props;
        console.log({ 'props': this.props });
        if (this.props.scores) {
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
                                {this.props.scores.map((item, index) =>
                                    (<TableRow key={item.key} >
                                        <TableCell className={classes.ranking.color}>{index + 1}</TableCell>
                                        <TableCell scope="row" align="right">
                                            {item.username}
                                        </TableCell>
                                        <TableCell align="right">{item.score}</TableCell>
                                    </TableRow>)
                                )}
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
    let activeDiff = state.scores.activeScoreDifficulty;
    return {
        scores: state.scores[activeDiff]
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Scores));