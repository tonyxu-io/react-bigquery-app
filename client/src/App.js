import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import QuestionsTable from './components/QuestionsTable'
import Selector from './components/Selector'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      questions: ['hello'],
      query: 1
    }

    this.getTopQuestions(this.state.query)
    
  }

  getTopQuestions(query) {
    axios.get(`stackoverflow/${query}`)
      .then(res => {
        console.log(res.data)
        this.setState({ questions: res.data })
      })
  }

  handleQuery = (queryValue) => {
      console.log(queryValue)
      this.setState({query: queryValue});
      this.getTopQuestions(queryValue)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="React-BigQuery"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            showMenuIconButton = {false}
          />
          <Selector onQueryChange={this.handleQuery} query={this.state.query}/>
          <QuestionsTable questions={this.state.questions}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
