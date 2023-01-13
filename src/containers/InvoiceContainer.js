// import {connect} from 'react-redux'
// import {enablePanels, disablePanels} from '../actions';
// import Invoice from '../components/Invoice/Invoice';

// const mapStateToProps = function (state) {
//   return {
//     panels: state.panelCollection.panels
//   };
// };

// const mapDispatchToProps = {
//   enablePanels,
//   disablePanels
// };

// const InvoiceContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Invoice);

// export default InvoiceContainer;

import {connect} from 'react-redux'

import {enablePanels, disablePanels} from '../actions';

import Invoice from '../components/Invoice/Invoice';



const mapStateToProps = function (state) {



  return {



    panels: state.panelCollection.panels



  };



};





const mapDispatchToProps = {

  enablePanels,

  disablePanels

};





const InvoiceContainer = connect(

  mapStateToProps,

  mapDispatchToProps

)(Invoice);





export default InvoiceContainer;