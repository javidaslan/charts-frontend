import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chart } from 'react-google-charts';


class StockChart extends Component {


  render() {

    return (
      <div>
        <Chart
          width={'600px'}
          height={'350px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['x', 'dogs'],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35],
          ]}
          options={{
            hAxis: {
              title: 'Time',
            },
            vAxis: {
              title: 'Popularity',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )};
}

export default StockChart;
