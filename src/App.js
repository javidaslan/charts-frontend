import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Dropdown, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';

import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

// custom
import Chart from './Chart'
import { get } from 'jquery';

const API = 'http://localhost:8080'

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      selectedStock: '',
      allStocks: [],
      selectedYear: '',
      selectedMonth: '',
      errorOccurred: false,
      errorHeader: '',
      errorMessage: '',
      showChart: false,
      prices: []
    }
    const today = new Date();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorOccurred: false
    })
    if (this.state.selectedStock == '' || this.state.selectedStock == null)  {
      this.showError('Incorrect Stock Selection', 'Please select stock code');
    }
    else if (this.state.selectedYear == '' || this.state.selectedMonth == '') {
      this.showError('Incorrect Time Selection', 'Please select time');
    }
    else {
      this.fetchPricesForStock();
    }
  }

  handleInputChange = (event, selectedStock) => {
    this.setState({
      selectedStock: selectedStock.value
    });
  }

  componentDidMount() {
    this.fetchStocks();
  }

  async fetchStocks() {
    this.setState({ showChart: false })
    const response = await axios.get(API + '/stocks');
    this.setState({ allStocks: response.data.stocks});
  }

  async fetchPricesForStock() {
    this.setState({showChart: false})
    const url = API + '/stock/' + this.state.selectedStock + '?year=' + this.state.selectedYear + '&month=' + this.state.selectedMonth;
    const response = await axios.get(url);
    this.setState({ 
      prices: response.data.prices, 
      showChart: true
    });
  }

  handleDateChange = (event, date) => {
    date = date.value.split(' ')
    this.setState({
      selectedYear: date[0],
      selectedMonth: date[1]
    })
  }

  showError(header, text) {
    this.setState({
      errorHeader: header,
      errorMessage: text,
      errorOccurred: true
    })
  }

  generateMonthRange = () => {
    const months = this.state.months;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthRange = [];
    for (var i=currentMonth; i < months.length; i++){
      monthRange.push({value: currentYear-1 + ' ' + months[i], key: currentYear-1 + ' ' + months[i], text: currentYear-1 + ' ' + months[i]})
    }
    for (var i=0; i <= currentMonth; i++){
      monthRange.push({value: currentYear + ' ' + months[i], key: currentYear + '-' + months[i], text: currentYear + ' ' + months[i]})
    }
    return monthRange;
  }

  

  render() {

    const {stockName} = this.state;

    const allStocks = this.state.allStocks.map(function (item) {
      return { key: item.stockCode, value: item.stockCode, text: item.stockCode + ' - ' + item.description }
    });
    
    const monthRange = this.generateMonthRange();
    
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3 className="App-title">Welcome to Charts</h3>
          </header>
          <div className="form-div">
            
            <Form className="search-form" onSubmit={this.handleSubmit}>
              { this.state.errorOccurred == true &&
              <Message negative>
                  <Message.Header>{ this.state.errorHeader }</Message.Header>
                  <p>{ this.state.errorMessage }</p>
              </Message>
              }
              <FormGroup role="form">
                <div className="input-group">
                  <Dropdown
                    placeholder='Select Stock'
                    search
                    selection
                    options={allStocks}
                    className="form-control span"
                    onChange={this.handleInputChange}
                  />
                  <Dropdown
                    placeholder='Select Month'
                    search
                    selection
                    options={monthRange}
                    className="form-control"
                    onChange={this.handleDateChange}
                  />
                  {/* <SemanticDatepicker locale="pt-BR" onChange={this.handleDateChange} type="basic" className="form-control"/> */}
                </div>
                <div className="input-group">
                  <Button className="form-button btn-dark" type="submit">Search</Button>
                </div>
              </FormGroup>
            </Form>
          </div>

          
          <div className="chart-div">
            {this.state.showChart ? <Chart prices={this.state.prices}/> : null}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
