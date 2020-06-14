import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';

import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

// custom
import Chart from './Chart'

const API = 'http://localhost:8080'

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      selectedStock: '',
      allStocks: [],
      fromDate: new Date(),
      toDate: new Date()
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(API + '/stock/'+this.state.selectedStock)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  handleInputChange = (event, selectedStock) => {
    this.setState({
      selectedStock: selectedStock.value
    });
  }

  componentDidMount() {
    this this.fetchStocks();
    fetch(API + '/stocks')
      .then(response => response.json())
      .then(data => this.setState({ allStocks: data['stocks']}))
  }


  async fetchStocks() {
    const values = await axios.get('/stocks');
    console.log(values);
  }


  handleFromDateChange = date => this.setState({ fromDate: date })
  handleToDateChange = date => this.setState({ ToDate: date })


  render() {

    
    const {stockName} = this.state;

    const allStocks = this.state.allStocks.map(function (item) {
      return { key: item.stockCode, value: item.stockCode, text: item.stockCode + ' - ' + item.description }
    });
    
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3 className="App-title">Welcome to Charts</h3>
          </header>
          <div className="form-div">
            <Form className="search-form" onSubmit={this.handleSubmit}>
              <FormGroup role="form">
                <div className="input-group">
                    <Dropdown
                      placeholder='Select Stock'
                      search
                      selection
                      options={allStocks}
                      className="form-control span"
                      onChange={this.handleInputChange}
                      // value={stockName}
                    />
                    <SemanticDatepicker locale="pt-BR" onChange={this.handleFromDateChange} type="range" className="form-control"/>
                </div>
                <div className="input-group">
                  <Button className="form-button btn-dark" type="submit">Search</Button>
                </div>
              </FormGroup>
            </Form>
          </div>
          <div className="chart-div">
            <Route exact path="/" component={Chart} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
