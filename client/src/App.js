import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import QuestionsTable from './components/QuestionsTable'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      questions: ['hello']
    }

    this.getTopQuestions()
    
  }

  getTopQuestions() {
    axios.get('stackoverflow')
      .then(res => {
        console.log(res.data)
        this.setState({ questions: res.data })
      })
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="React-BigQuery - Most Viewed StackOverflow Questions"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            showMenuIconButton = {false}
          />
          <QuestionsTable questions={this.state.questions}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
