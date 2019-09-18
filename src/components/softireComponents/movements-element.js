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
import historyClass from './historyClass.js';
import * as R from 'ramda/dist/ramda.js';

class MovementsElement extends connect(store)(LitElement) {
  fetchDetById(id) {
    const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
    return fetch(fetchURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: `
        query {
        snNeumaticosDetsById(id:"${id}"){
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
      .then(r => r.data);
  }

  constructor() {
    super();
    this.codeTest = [];
    this.history = {};
    this.inputValue = 'code value here';
  }

  static get styles() {
    return [SharedStyles];
  }

  static get properties() {
    return {
      codeTest: { type: Array },
      inputValue: { type: String }
    };
  }

  async fetchNeumaticosDetBy(id) {
    return await this.fetchDetById(id).then(
      NeumaticosDetArray => (this.codeTest = NeumaticosDetArray.snNeumaticosDetsById)
    );
  }
  async historyClassCall() {
    console.log(this.inputValue);
    console.log(await this.fetchNeumaticosDetBy(this.inputEl.value));
    console.log('test begin');
    console.log(this.codeTest);

    console.log('new classs here');
    this.history = new historyClass(this.codeTest);
    console.log('get History here here');

    console.log(this.history.getHistory);
    console.log('this is input value');
    console.log(this.inputValue);
    //    console.log(this.shadowRoot);
    //console.log(this.history.instalationRemnantObj);
    //console.log(this.history.lastInspectionWhereCondicionNU);
  }
  toAddDescripcion(neumatico) {
    return { ...neumatico, ...this.addProps(neumatico, store.getState()) };
  }
  addProp(neumaticoObj, state) {
    const selectBrandsFrom = R.compose(
      R.prop('marcaNeumatico'),
      R.prop('tireBrands')
    );

    const findBrand = R.find(R.propEq('codMarca', R.prop('codMarca'))(neumaticoObj));
    const getBrandDescripcion = R.prop('Descripcion');

    return { codMarcaDescripcion: getBrandDescripcion(findBrand(selectBrandsFrom(state))) };
  }
  stateChanged(state) {
    this._tires = state.tires.tires.neumaticos;
    if (state.tires.tires.neumaticos) {
      console.log('state looks with tires');
    }
    if (state.tires.tireConditions.condicionesNeumatico) {
      console.log('state looks with conditions');
    }
    if (state.tires.tires.neumaticos && state.tires.tireConditions.condicionesNeumatico) {
      // this.neumaticosView = R.map(this.toAddDescripcion, state.tires.tires.neumaticos);
    }
  }
  get inputEl() {
    return this.shadowRoot.getElementById('inputID');
  }
  render() {
    return html`
      <section>
        <h1>Historial de Vehiculos</h1>
      </section>
      <input id=inputID 
      value=${this.inputValue} 
      @change="${e => console.log(e.srcElement.value)}" 
      @keydown="${e => console.log(e)}"
      >
      <button @click="${this.historyClassCall}" >Hellow</button>

      <section>
      </div>
      <style>
        #container {
          padding: 1.5em;
        }
      </style>
      <button @click="${e => console.log(this.neumaticosView)}" >getState</button>
    `;
  }
}

window.customElements.define('movements-element', MovementsElement);
