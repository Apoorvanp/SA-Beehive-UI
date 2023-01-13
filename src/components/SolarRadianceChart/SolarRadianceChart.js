import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import palette from '../../lib/color';
import './SolarRadianceChart.css';

class SolarRadianceChart extends Component {
  constructor(props) {
    super(props);

    const xAxisLabel = 'Time';

    const yAxisLabel = 'kW';

    this.seriesLabel = 'Energy';

    this.powerLineBackgroundColor = palette.lightGreen.setAlpha(0.1).toString();

    this.powerLineBorderColor = palette.lightGreen.toString();
    this.timeLabels = ['-5m', '', '', '', '', 'Now'];

    this.options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: xAxisLabel
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yAxisLabel
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 1,
            stepSize: 0.4,
          }
        }]
      },
      hover: {
        animationDuration: 0,
      },
      tooltips: {
        callbacks: {
          // Display the series label as the tooltip title.
          title: (tooltipItem, data) => {
            const datasetIndex = tooltipItem[0].datasetIndex;
            return data.datasets[datasetIndex].label;
          },
          // Display a truncated version of the bar value as the tooltip value.
          label: (tooltipItem, data) => {
            const barValue = tooltipItem.yLabel,
              decimalPlaces = 2;
            return barValue.toFixed(decimalPlaces) + ' kW/m²';
          }
        }
      }
    };

    this.legend = {
      display: false
    };

    const initialTotalOutputPowerHistory = [null, null, null, null, null, null].map(() => {
      return SolarRadianceChart.getInitialTotalOutputPower(this.props.panels);
    });

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      totalOutputPowerHistory: initialTotalOutputPowerHistory,
      pointRadius: this.initialPointRadius,
    };

    setInterval(this.updateTotalOutputPowerHistory.bind(this), 5000);
    setInterval(this.getTotalOutputPower.bind(this), 5000);
  }

  getTotalOutputPower() {
    let energyobj;
    fetch("http://localhost:8080/api/v1/productions/1/1?numberOfTransactions=6")
    .then(response => response.json())
    .then(data => {
      energyobj = data;
    })
    .then(() => {
      this.setState({energyProduction0: energyobj[0].energyProduced})
      this.setState({energyProduction1: energyobj[1].energyProduced})
      this.setState({energyProduction2: energyobj[2].energyProduced})
      this.setState({energyProduction3: energyobj[3].energyProduced})
      this.setState({energyProduction4: energyobj[4].energyProduced})
      this.setState({energyProduction5: energyobj[5].energyProduced})
     });
    return energyobj;
  }

  updateTotalOutputPowerHistory() {
    this.setState( (prevState, props) => {
      var energyProducedArray = [prevState.energyProduction0, prevState.energyProduction1, prevState.energyProduction2, prevState.energyProduction3, prevState.energyProduction4, prevState.energyProduction5];
      return {
        totalOutputPowerHistory: energyProducedArray
      };
    });
  }

  static getInitialTotalOutputPower(panels) {
    return panels.reduce((accumulator, panel) => {
      const outputPowerW = panel.outputVoltageV * panel.outputCurrentA;
      const outputPowerKW = outputPowerW / 1000;
      return accumulator + outputPowerKW;
    }, 0);
  }

  render() {
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.timeLabels,
        data: this.state.totalOutputPowerHistory,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointBackgroundColor: this.powerLineBorderColor,
        pointRadius: this.state.pointRadius,
        pointHoverRadius: this.state.pointRadius
      }]
    };

    const panels = this.props.panels,
      panelIds = [],
      inputRadiances = [],
      barColors = [];

    panels.forEach((panel) => {
      inputRadiances.push(panel.inputRadianceKWM2);
      panelIds.push(panel.id);
      barColors.push((panel.enabled ? palette.lightGreen.toString() : palette.lightGray.setAlpha(0.1).toString()));
    });

    return (
      <div className='solar-radiance-chart--chart-wrapper'>
       <Line data={data} options={this.options} legend={this.legend}/>
      </div>
    );
  }
}

SolarRadianceChart.propTypes = {
  panels: PropTypes.array.isRequired,
};

export default SolarRadianceChart;
