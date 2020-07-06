import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chart } from 'react-google-charts';


class StockChart extends Component {

  populateChart = () => {
    const prices = this.props.prices;
    const data = [['Day of Month', 'Price']];
    for (const item in prices){
      const day = parseInt(item.split('-')[2]);
      const price = parseFloat(prices[item]["2. high"])
      data.push([day, price])     
    }
    return data;
  }
  
  render() {

    const data = this.populateChart();
    console.log(data);
    return (
      <div>
        <Chart
          className="innerChartDiv"
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            hAxis: {
              title: 'Day of Month',
              showTextEvery: 1
            },
            vAxis: {
              title: 'Price',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )};
}

export default StockChart;
