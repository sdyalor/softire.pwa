/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { SharedStyles } from '../shared-styles.js';
import { store } from '../../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class VehiclesSearchElement extends connect(store)(LitElement) {
  constructor() {
    super();
    /* filters*/
    this.codModeloFilter = '';
    this.codTipoFilter = '';
    this.codPlacaFilter = '';
    this.codMarcaFilter = '';
    this.codConfiguracionFilter = '';
    this.codVehiculoFilter = '';
    /* ENDfilters*/
  }

  static get styles() {
    return [SharedStyles];
  }

  static get properties() {
    return {
      codModeloFilter: { type: String },
      codTipoFilter: { type: String },
      codPlacaFilter: { type: String },
      codMarcaFilter: { type: String },
      codConfiguracionFilter: { type: String },
      codVehiculoFilter: { type: String },
      _vehicles: { type: Array },
      _vehicleBrands: { type: Array },
      _vehicleModels: { type: Array },
      _vehicleTypes: { type: Array },
      _vehicleConfigurations: { type: Array }
    };
  }

  stateChanged(state) {
    this._vehicles = state.vehicles.vehicles.vehiculo;
    this._vehicleBrands = state.vehicles.vehicleBrands.marcaVehiculo;
    this._vehicleTypes = state.vehicles.vehicleTypes.tipoVehiculo;
    this._vehicleModels = state.vehicles.vehicleModels.modeloVehiculo;
    this._vehicleConfigurations = state.vehicles.vehicleConfigurations.configuracion;
  }

  render() {
    return html`
      <section>
        <h1>Historial de Vehiculos</h1>
      </section>

      <section>
        <vaadin-combo-box
          label="Vehiculo"
          .items=${this._vehicles}
          @selected-item-changed="${e =>
            e.detail.value != null
              ? (this.codVehiculoFilter = e.detail.value.codVehiculo.replace(/\s/g, ''))
              : (this.codVehiculoFilter = '')}"
          @change="${e => console.log(e)}"
          item-label-path="codVehiculo"
          item-value-path="codVehiculo"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Marca de Vehiculo"
          .items=${this._vehicleBrands}
          @selected-item-changed="${e =>
            e.detail.value != null
              ? (this.codMarcaFilter = e.detail.value.codMarca)
              : (this.codMarcaFilter = '')}"
          @change="${e => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codMarca"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Modelo de Vehiculo"
          .items=${this._vehicleModels}
          @selected-item-changed="${e =>
            e.detail.value != null
              ? (this.codModeloFilter = e.detail.value.codModelo)
              : (this.codModeloFilter = '')}"
          @change="${e => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codModelo"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Tipo de Vehiculo"
          .items=${this._vehicleTypes}
          @selected-item-changed="${e =>
            e.detail.value != null
              ? (this.codTipoFilter = e.detail.value.codTipo)
              : (this.codTipoFilter = '')}"
          @change="${e => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codTipo"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Placa de Vehiculo"
          .items=${this._vehicles}
          @selected-item-changed="${e =>
            e.detail.value != null
              ? (this.codPlacaFilter = e.detail.value.placa)
              : (this.codPlacaFilter = '')}"
          @change="${e => console.log(e)}"
          item-label-path="placa"
          item-value-path="placa"
          value=""
        >
        </vaadin-combo-box>
        <vaadin-combo-box
          label="Configuracion de Vehiculo"
          .items=${this._vehicleConfigurations}
          @selected-item-changed="${e =>
            e.detail.value != null
              ? (this.codConfiguracionFilter = e.detail.value.codConfi)
              : (this.codConfiguracionFilter = '')}"
          @change="${e => console.log(e)}"
          item-label-path="descripcion"
          item-value-path="codConfi"
          value=""
        >
        </vaadin-combo-box>
      </section>
      <div id="container">
        <vaadin-grid
          theme="row-stripes"
          column-reordering-allowed
          multi-sort
          .items=${this._vehicles}
        >
          <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
          <vaadin-grid-sort-column resizable width="9em" path="codVehiculo" header="Neumatico">
            <vaadin-grid-filter
              path="codVehiculo"
              value="${this.codVehiculoFilter}"
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column resizable width="9em" path="codMarca" header="Marca de Vehiculo">
            <vaadin-grid-filter path="codMarca" value=${this.codMarcaFilter}></vaadin-grid-filter>
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            resizable
            width="9em"
            path="codModelo"
            flex-grow="2"
            header="Modelo de Vehiculo"
          >
            <vaadin-grid-filter path="codModelo" value=${this.codModeloFilter}></vaadin-grid-filter>
          </vaadin-grid-sort-column>

          <vaadin-grid-sort-column width="9em" path="codTipo" header="Tipo de Vehiculo">
            <vaadin-grid-filter path="codTipo" value=${this.codTipoFilter}></vaadin-grid-filter>
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column width="9em" path="placa" header="Placa de Vehiculo">
            <vaadin-grid-filter path="placa" value=${this.codPlacaFilter}></vaadin-grid-filter>
          </vaadin-grid-sort-column>
          <vaadin-grid-sort-column
            width="9em"
            path="codConfiguracion"
            header="Configuracion de Vehiculo"
          >
            <vaadin-grid-filter
              path="codConfiguracion"
              value=${this.codConfiguracionFilter}
            ></vaadin-grid-filter>
          </vaadin-grid-sort-column>
        </vaadin-grid>
      </div>
      <style>
        #container {
          padding: 1.5em;
        }
      </style>
    `;
  }
}

window.customElements.define('vehicles-search-element', VehiclesSearchElement);
