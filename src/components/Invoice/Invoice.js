import React, {Component} from 'react';
import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
class Invoice extends Component {

  constructor(props) {

  super(props);

  this.state = {

    invoiceData: null,

    invoiceConsumptions: [],

    invoiceProductions: []

  };

  setInterval(this.callAPIForGettingInvoiceData.bind(this), 5000);

  }

 callAPIForGettingInvoiceData() {

  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {

    method: 'GET',

    headers: myHeaders

  }
  let returnValue;
  fetch("http://localhost:8080/api/v1/invoice/1/1", requestOptions)


  .then(response => response.json())

  .then(data => {

    this.setState({ invoiceData: data.amount,

    invoiceConsumptions: data.consumptions,

    invoiceProductions: data.credits

})

  })

  return returnValue;

}

  render() {

    if(this.state.invoiceConsumptions && this.state.invoiceProductions) {
      return (
        <div>
          <b>Billed Amount: </b><b>{this.state.invoiceData}</b>
        <Table className="my-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="table-header-cell">Seller Community ID</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Seller House ID</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Units(V)</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Price</Table.HeaderCell>
              <Table.HeaderCell className="table-header-cell">Consumed At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="table-body">
            {this.state.invoiceConsumptions.map( function (invoice,index) {
              return (
                <Table.Row className={`table-row ${index%2 ===0 ? 'table-row-even' : 'table-row-odd'}`}>
                  <Table.Cell className="table-cell">{invoice.sellerCommunityId}</Table.Cell>
                  <Table.Cell className="table-cell">{invoice.sellerHouseId}</Table.Cell>
                  <Table.Cell className="table-cell">{invoice.units}</Table.Cell>
                  <Table.Cell className="table-cell">{invoice.price}</Table.Cell>
                  <Table.Cell className="table-cell">{invoice.consumedAt}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        </div>
      );
    };




   }





}







Invoice.propTypes = {





  panels: PropTypes.array.isRequired,





  enablePanels: PropTypes.func.isRequired,





  disablePanels: PropTypes.func.isRequired



};



export default Invoice;