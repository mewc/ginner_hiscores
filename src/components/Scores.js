import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress, Button, TableFooter } from '@material-ui/core';
import ginnersTheme from '../static/ginnersTheme';
import { activeScoreDifficultyChange } from '../actions/scores';


const useStyles = () => {
    let theme = ginnersTheme;
    return ({
        root: {
            marginTop: theme.spacing(1),
        },
        table: {
            minWidth: '90px',
        },
        ranking: {
            color: '#123',
            textDecoration: 'underline'
        },
        wrapper: {
            width: '50%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
            display: 'table-cell',
            padding: '10px 5px',
            margin: 'auto, 0'
        },
        headRow: {
            backgroundColor: 'black',
        },
        headItem: {
            color: '#fff'
        },
        diffName: {
            textAlign: 'center'
        }

    });
}
class Scores extends Component {
    constructor(props) {
        super(props);
        this.changeDifficultyScoresetDisplayed = this.changeDifficultyScoresetDisplayed.bind(this)
    }
    changeDifficultyScoresetDisplayed(diff) {
        this.props.dispatch(activeScoreDifficultyChange(diff))
    }

    render() {
        let { classes } = this.props;
        console.log({ 'props': this.props });
        if (this.props.scores) {
            const diff = this.props.diff.toUpperCase();
            console.log(diff)

            return (
                <div className={classes.wrapper}>
                    {/* <Button label={'HARD'} onClick={() => this.changeDifficultyScoresetDisplayed('hard')} >HARD</Button> */}
                    {/* <Button label={'EASY'} onClick={() => this.changeDifficultyScoresetDisplayed('easy')} >EASY</Button> */}
                    <h2 className={classes.diffName}>{diff}</h2>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.headRow}>
                                    <TableCell className={classes.headItem}>Ranking</TableCell>
                                    <TableCell className={classes.headItem} align="right">Username</TableCell>
                                    <TableCell className={classes.headItem} align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.scores.map((item, index) =>{
                                    if(item.username.includes(this.props.usernameFilter)){
                                        return (<TableRow key={item.key} >
                                        <TableCell className={classes.ranking.color}>{index + 1}</TableCell>
                                        <TableCell scope="row" align="right">
                                            {item.username}
                                        </TableCell>
                                        <TableCell align="right">{item.score}</TableCell>
                                    </TableRow>)
                                    }
                                }
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )
        } else {
            return (
                <LinearProgress />
            )
        }
    }
}

const mapStateToProps = (state, props) => {
    const {usernameFilter} = state.scores
    let activeDiff = state.scores.activeScoreDifficulty;
    return {
        scores: state.scores[props.diff],
        activeDiff,
        usernameFilter
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Scores));