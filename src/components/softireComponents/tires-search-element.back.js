/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { SharedStyles } from '../shared-styles.js';
import historyClass from './historyClass.js';
import { store } from '../../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class TiresSearchElement extends connect(store)(LitElement) {
  constructor() {
    super();
    this.codModeloFilter = '';
    this.codNeumaticoFilter = '';
    this.codMedidaFilter = '';
    this.codDisenoFilter = '';
    this.codMarcaFilter = '';

    this.neumaticos = [];
    this.condicionesNeumatico = [];
    this.disenosNeumatico = [];
    this.marcaNeumatico = [];
    this.medidaNeumatico = [];
    this.modeloNeumatico = [];
    this.vehiculosPage = [];

    this.fetchURL = `https://azaryah.sdyalor.me/api/graphql`;

    this.fetchNeumaticos = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: `query { neumaticos { codNeumatico codMarca codModelo codMedida codDiseno estado codProveedor} }`
      })
    })
      .then(r => r.json())
      .then(data => (this.neumaticos = data.data.neumaticos));
    this.fetchCondicionesNeumatico = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: `query { condicionesNeumatico { codCondicion descripcion } }` })
    })
      .then(r => r.json())
      .then(data => (this.condicionesNeumatico = data.data.condicionesNeumatico));
    this.fetchDisenosNeumatico = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: `query { disenosNeumatico { codDiseno descripcion } }` })
    })
      .then(r => r.json())
      .then(data => (this.disenosNeumatico = data.data.disenosNeumatico));
    this.fetchMarcaNeumatico = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: `query { marcaNeumatico { codMarca descripcion } }` })
    })
      .then(r => r.json())
      .then(data => (this.marcaNeumatico = data.data.marcaNeumatico));
    this.fetchMedidaNeumatico = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: `query { medidaNeumatico { codMedida descripcion } }` })
    })
      .then(r => r.json())
      .then(data => (this.medidaNeumatico = data.data.medidaNeumatico));
    this.fetchModeloNeumatico = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: `query { modeloNeumatico { codModelo descripcion } }` })
    })
      .then(r => r.json())
      .then(data => (this.modeloNeumatico = data.data.modeloNeumatico));
    /**
     * history Detail
     */
    this.fetchNeumaticosDetBy = fetch(`${this.fetchURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: `
        query {
        snNeumaticosDetsById(id:"0000710"){
                nroCia
                codNeumatico
                fechaMov
                codCondicion
                ubicacion
                codEvento
                remanenteProm
                posicion
                codDiseno
                kilometraje
                horometro
                presion
                codProveedor
                costo
            }
        }
        `
      })
    })
      .then(r => r.json())
      .then(data => (this.code0000710 = data.data.snNeumaticosDetsById));
    this.code0000710 = [];

    this.history = {};
  }

  static get styles() {
    return [SharedStyles];
  }

  static get properties() {
    return {
      codModeloFilter: { type: String },
      codMedidaFilter: { type: String },
      codDisenoFilter: { type: String },
      codMarcaFilter: { type: String },
      codNeumaticoFilter: { type: String },
      neumaticos: { type: Array },
      condicionesNeumatico: { type: Array },
      disenosNeumatico: { type: Array },
      marcaNeumatico: { type: Array },
      medidaNeumatico: { type: Array },
      modeloNeumatico: { type: Array },
      history: { type: Object },
      code0000710: { type: Array },
      _tires: { type: Array }
    };
  }

  historyClassCall() {
    this.history = new historyClass(this.code0000710);
    console.log(this.history.instalationRemnantObj);
    console.log(this.history.lastInspectionWhereCondicionNU);
  }
  stateChanged(state) {
    this._tires = state.tiresReducer.tires.neumaticos;
  }

  render() {
    return html`
      <!-- Neumaticos fromTires -->
      <section>
        <h1>Historial de Neumaticos</h1>
      </section>
      <!--End Condicion de Neumaticos fromTires -->
      <vaadin-combo-box
        label="Neumaticos"
        .items=${this.neumaticos}
        @selected-item-changed="${e =>
          e.detail.value != null
            ? (this.codNeumaticoFilter = e.detail.value.codNeumatico)
            : (this.codNeumaticoFilter = '')}"
        @change="${e => console.log(e)}"
        item-label-path="codNeumatico"
        item-value-path="codNeumatico"
        value=""
      >
      </vaadin-combo-box>
      <vaadin-combo-box
        label="Marca de Neumatico"
        .items=${this.marcaNeumatico}
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
        label="Modelo de Neumatico"
        .items=${this.modeloNeumatico}
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
        label="Medida de Neumatico"
        .items=${this.medidaNeumatico}
        @selected-item-changed="${e =>
          e.detail.value != null
            ? (this.codMedidaFilter = e.detail.value.codMedida)
            : (this.codMedidaFilter = '')}"
        @change="${e => console.log(e)}"
        item-label-path="descripcion"
        item-value-path="codMedida"
        value=""
      >
      </vaadin-combo-box>
      <vaadin-combo-box
        label="Diseno de Neumatico"
        .items=${this.disenosNeumatico}
        @selected-item-changed="${e =>
          e.detail.value != null
            ? (this.codDisenoFilter = e.detail.value.codDiseno)
            : (this.codDisenoFilter = '')}"
        @change="${e => console.log(e)}"
        item-label-path="descripcion"
        item-value-path="codDiseno"
        value=""
      >
      </vaadin-combo-box>

      <vaadin-grid theme="row-stripes" column-reordering-allowed multi-sort .items=${this._tires}>
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
        <vaadin-grid-sort-column resizable width="9em" path="codNeumatico" header="Neumatico">
          <vaadin-grid-filter
            path="codNeumatico"
            value=${this.codNeumaticoFilter}
          ></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column resizable width="9em" path="codMarca" header="Marca de Neumatico">
          <vaadin-grid-filter path="codMarca" value=${this.codMarcaFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          resizable
          width="9em"
          path="codModelo"
          flex-grow="2"
          header="Modelo de Neumatico"
        >
          <vaadin-grid-filter path="codModelo" value=${this.codModeloFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column width="9em" path="codMedida" header="Medida de Neumatico">
          <vaadin-grid-filter path="codMedida" value=${this.codMedidaFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column width="9em" path="codDiseno" header="Diseno de Neumatico">
          <vaadin-grid-filter path="codDiseno" value=${this.codDisenoFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          width="9em"
          path="estado"
          header="Estado de Neumatico"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          width="9em"
          path="codProveedor"
          header="Proveedor de Neumatico"
        ></vaadin-grid-sort-column>
      </vaadin-grid>
      <button @click=${this.historyClassCall}></button>
    `;
  }
}

window.customElements.define('tires-search-element', TiresSearchElement);
