import React, {Component} from 'react';
import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './PanelStatusTable.css';

class PanelStatusTable extends Component {

  constructor(props) {
  super(props);
  this.state = {
    creditsData: []
  }
  setInterval(this.callAPIForGettingCreditsData.bind(this), 5000);
  }
  callAPIForGettingCreditsData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  let returnValue;



  fetch("http://localhost:8080/api/v1/consumptions/credits/1/1", requestOptions)

  .then(response => response.json())

  .then(data => {

    this.setState({ creditsData: data })

    console.log(data)

  })

  return returnValue;

}




  render() {

    if(this.state.creditsData) {

      return (
        <Table className="my-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="table-header-cell">Seller Community ID</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Seller House ID</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Buyer Community ID</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Buyer House ID</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Units(V)</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Price</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Consumed At</Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body className="table-body">
            {this.state.creditsData.map( function (credits,index) {
              return (
                <Table.Row className={`table-row ${index%2 ===0 ? 'table-row-even' : 'table-row-odd'}`}>
                  <Table.Cell className="table-cell">{credits.sellerCommunityId}</Table.Cell>
                  <Table.Cell className="table-cell">{credits.sellerHouseId}</Table.Cell>
                  <Table.Cell className="table-cell">{credits.buyerCommunityId}</Table.Cell>
                  <Table.Cell className="table-cell">{credits.buyerHouseId}</Table.Cell>
                  <Table.Cell className="table-cell">{credits.units}</Table.Cell>
                  <Table.Cell className="table-cell">{credits.price}</Table.Cell>
                  <Table.Cell className="table-cell">{credits.consumedAt}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      );
    };
   }
}

PanelStatusTable.propTypes = {

  panels: PropTypes.array.isRequired,
  enablePanels: PropTypes.func.isRequired,
  disablePanels: PropTypes.func.isRequired

};

export default PanelStatusTable;