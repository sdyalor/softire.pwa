/* eslint-disable no-console */
import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { store } from '../store.js';
import { tiresReducer } from '../reducers/tiresReducer.js';
import { vehiclesReducer } from '../reducers/vehiclesReducer.js';
import {
  getAllTires,
  getAllTireBrands,
  getAllTireModels,
  getAllTireDesigns,
  getAllTireConditions,
  getAllTireMeasures
} from '../actions/tiresActions.js';
import {
  getAllVehicles,
  getAllVehicleTypes,
  getAllVehicleBrands,
  getAllVehicleModels,
  getAllVehicleConfigurations
} from '../actions/vehiclesActions.js';
store.addReducers({
  tires: tiresReducer,
  vehicles: vehiclesReducer
});
import './softireComponents/movements-element.js';
//store.dispatch(getAllTires());

import { connect } from 'pwa-helpers/connect-mixin.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import './softireComponents/tires-search-element.js';
import './softireComponents/vehicles-search-element.js';

class MyView4 extends connect(store)(PageViewElement) {
  constructor() {
    super();
  }
  static get styles() {
    return [SharedStyles];
  }
  static get properties() {
    return {
      vehiculosPage: { type: Array },
      vehiculos: { type: Array },
      codModeloFilter: { type: String },
      codMedidaFilter: { type: String },
      codDisenoFilter: { type: String },
      codMarcaFilter: { type: String },
      marcasVehiculo: { type: Array },
      modelosVehiculo: { type: Array },
      tiposVehiculo: { type: Array },
      configuraciones: { type: Array }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('on connect');
    store.dispatch(getAllTires());
    store.dispatch(getAllTireBrands());
    store.dispatch(getAllTireModels());
    store.dispatch(getAllTireDesigns());
    store.dispatch(getAllTireConditions());
    store.dispatch(getAllTireMeasures());
    store.dispatch(getAllVehicles());
    store.dispatch(getAllVehicleTypes());
    store.dispatch(getAllVehicleBrands());
    store.dispatch(getAllVehicleModels());
    store.dispatch(getAllVehicleConfigurations());
  }

  render() {
    return html`
      <tires-search-element></tires-search-element>
      <vehicles-search-element></vehicles-search-element>
      <movements-element></movements-element>
    `;
  }
  updateItemsFromPage(innerText) {
    this.vehiculosPage = this.vehiculos.slice(
      (innerText - 1) * this.pageSize,
      innerText * this.pageSize
    );
  }
  stateChanged(state) {
    console.log('state has changed');
    console.log(state);
  }
}

window.customElements.define('my-view4', MyView4);
