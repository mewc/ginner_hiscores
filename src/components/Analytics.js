import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress, Button, TableFooter } from '@material-ui/core';
import ginnersTheme from '../static/ginnersTheme';
import { activeScoreDifficultyChange } from '../actions/scores';
import { calculateAllStats } from '../helpers/scores';

const useStyles = () => {
    let theme = ginnersTheme;
    return ({
        root: {
            margin: theme.spacing(2),
        },
        table: {

        },
        wrapper: {
            width: 'fit-content',
            margin: '0 auto',
            padding: '20px'
        },

    });
}
class Analytics extends Component {
    constructor(props) {
        super(props);
    }

    usernameCounts = (data) => {
        let u = {};
        data.forEach((d) => {
            u[d.username] = (u[d.username]) ? u[d.username] + 1 : 1;
        })
        let counts = [];
        Object.keys(u).forEach(k => {
            counts.push({
                username: k,
                count: u[k],
                time: 'x'
            })
        })
        counts.sort((a, b) => {
            if (a.count > b.count) {
                return -1;
            }
            if (a.count < b.count) {
                return 1;
            }
            return 0;
        });
        return counts;
    }


    render() {
        let { classes, easy, hard } = this.props;
        const hardCounts = this.usernameCounts(hard);
        const easyCounts = this.usernameCounts(easy);
        const stats = calculateAllStats(easy, hard);
        console.log(stats);
        return (
            <div className={classes.wrapper}>
                <h2>Stats</h2>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Metric</TableCell>
                                <TableCell align="right">Easy</TableCell>
                                <TableCell align="right">Hard</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            < TableRow key={'goals'} >
                                <TableCell align="right">Total Goals</TableCell>
                                <TableCell align="right">{stats.totalScoresEasy || ''}</TableCell>
                                <TableCell component="th" scope="row">{stats.totalScoresHard || ''}</TableCell>
                            </TableRow>
                            < TableRow key={'goals'} >
                                <TableCell align="right">Total Games</TableCell>
                                <TableCell align="right">{easy.length || ''}</TableCell>
                                <TableCell component="th" scope="row">{hard.length || ''}</TableCell>
                            </TableRow>
                            < TableRow key={'goals'} >
                                <TableCell align="right">Total Game Time</TableCell>
                                <TableCell align="right">{parseInt(stats.totalTimeEasy) + ' mins' || ''}</TableCell>
                                <TableCell component="th" scope="row">{parseInt(stats.totalTimeHard) + ' mins' || ''}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Paper>
                <h2>Leaderboards:</h2>
                <h3>HARD</h3>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell align="right">Game count</TableCell>
                                <TableCell align="right">Game time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hardCounts.map(row => (
                                < TableRow key={row.username} >
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.count}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {'-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <h3>EASY</h3>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>

                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell align="right">Game count</TableCell>
                                <TableCell align="right">Game time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {easyCounts.map(row => (
                                <TableRow key={row.username}>
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.count}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {'-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

}
const mapStateToProps = (state, props) => {
    const { easy, hard } = state.scores

    return {
        easy,
        hard
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Analytics));