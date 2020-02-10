import * as React from 'react';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


export default class ScoreGraph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.scores
    };
  }
  componentDidMount(){
  }
  render() {

    // if(this.props.RoundInProgress){
    const { data: chartData } = this.state;
    if(chartData.length > 0){
      return(<Chart
        data={chartData}
      >
        <ArgumentAxis />
        <ValueAxis max={140} />
               <BarSeries 
        valueField="TotalScore"
        argumentField="Name"
        color="#3f51b5"
        />
        <Animation />
      </Chart>)
    }
    // }
    return(null);

  }
}