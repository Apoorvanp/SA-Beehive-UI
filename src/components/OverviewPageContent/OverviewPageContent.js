import React, {Component} from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import SolarRadianceChartContainer from "../../containers/SolarRadianceChartContainer";
import PowerOutputChartContainer from "../../containers/PowerOutputChartContainer";
import EnergyStorageChartContainer from "../../containers/EnergyStorageChartContainer";
import LatestEventsFeedContainer from "../../containers/LatestEventsFeedContainer";
import PanelStatusTableContainer from "../../containers/PanelStatusTableContainer";
import InvoiceContainer from '../../containers/InvoiceContainer';
import './OverviewPageContent.css';

class OverviewPageContent extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' content='Overview:' subheader='Energy data report for HouseID=1 and CommunityID=1'/>
        <Grid stackable stretched>
        <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header color = "sea green" icon='tachometer alternate' content='Current Energy'/>
              <p>Amount of energy currently stored in batteries.</p>
              <PowerOutputChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header color = "green" icon='battery three quarter' content='Energy Production'/>
              <p>Energy Production data.</p>
              <SolarRadianceChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header color = "sea green" icon='chart pie' content='Energy Consumption'/>
              <p>Energy Consumption data.</p>
              <EnergyStorageChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header color = "sea green" icon='clock' content='Recommendation'/>
              <p>Timings to do the heavy household services.</p>
              <LatestEventsFeedContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={16}>
            <Segment>
              <Header color = "sea green" icon='sliders horizontal' content='Credits'/>
              <p>Credits Earned.</p>
              <PanelStatusTableContainer/>
            </Segment>
          </Grid.Column>

          <Grid.Column width={16}>
            <Segment>
              <Header color = "sea green" icon='sliders horizontal' content='Invoice'/>
              <p>Generated Invoice.</p>
              <InvoiceContainer/>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default OverviewPageContent;
