import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import BaseNav from '../components/BaseNav';
import MainContent from '../components/MainContent';
import { ThemeProvider } from '@material-ui/styles';
import ginnersTheme from '../static/ginnersTheme';
import { refreshScores } from '../actions/scores';



class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(refreshScores());
    document.title = 'Hiscores TheGinnersGame'

  }
  render() {

    return (
      <ThemeProvider theme={ginnersTheme} >
        <div className="App">
          <AppBar />
          <MainContent />
          <BaseNav />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activetab: state.app.activeTabIndex
  }
}



export default connect(mapStateToProps)(App);
