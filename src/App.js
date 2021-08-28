import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {baseCode: 'USD', baseAmount: 0.0, exchangeCode: 'CAD', exchangeAmount: 0.0}

    this.handleBaseCode = this.handleBaseCode.bind(this);
    this.handleBaseAmount = this.handleBaseAmount.bind(this);
    this.handleExchangeCode = this.handleExchangeCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }
 
  handleBaseCode(event) {
    this.setState({baseCode: event.target.value})
  }

  handleBaseAmount(event) {
    this.setState({baseAmount: event.target.value})
  }

  handleExchangeCode(event) {
    this.setState({exchangeCode: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/exchange_rates?${this.objToQueryString(this.state)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => this.setState(data))
  }

  render() {
    return (
      <div className="App">
        <p>
          Currency Converter
        </p>
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <p>
              <input type="number" min="0.0" step="0.01" name="baseAmount" value={this.state.baseAmount} onChange={this.handleBaseAmount} />
              <select name="baseCode" value={this.state.baseCode} onChange={this.handleBaseCode}>
                <option value="USD">US Dollars</option>
                <option value="CAD">Canadian Dollars</option>
              </select>
              to
              <span id="exchangeAmount">{this.state.exchangAmount}</span>
              <select name="exchangCode" value={this.state.exchangeCode} onChange={this.handleExchangeCode}>
                <option value="USD">US Dollars</option>
                <option value="CAD">Canadian Dollars</option>
              </select>
            </p>
            <p>
              <input type="submit" value="Exchange" />
            </p>
          </form>
        </header>
      </div>);
  
  }
}

export default App;
