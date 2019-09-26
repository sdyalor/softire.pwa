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
import {
  addDescriptionsToTires,
  addDescriptionsToVehicles
} from '../../actions/viewsActions.js';

class MovementsElement extends connect(store)(LitElement) {
  fetchDetById(id) {
    const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
    return fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
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
    this.tireBrands = [];
  }

  static get styles() {
    return [SharedStyles];
  }

  static get properties() {
    return {
      codeTest: { type: Array },
      inputValue: { type: String },
      _tireBrands: { type: Array }
    };
  }

  async fetchNeumaticosDetBy(id) {
    return await this.fetchDetById(id).then(
      NeumaticosDetArray =>
        (this.codeTest = NeumaticosDetArray.snNeumaticosDetsById)
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
    function addProps(neumaticoObj, state) {
      const selectBrandsFrom = R.compose(
        R.prop('tireBrands'),
        R.prop('tires')
      );
      const findBrand = R.find(R.propEq('codMarca', neumaticoObj['codMarca']));
      const getBrandDescripcion = R.prop('Descripcion');
      // const a = { codMarcaDescripcion: 'state' };

      return R.compose(
        getBrandDescripcion,
        findBrand,
        selectBrandsFrom
      )(state);
    }
    return { ...neumatico, ...addProps(neumatico, store.getState()) };
    // return getBrandDescripcion(findBrand(selectBrandsFrom(state)))
  }
  toAddDescripcions(othis, tire) {
    // R.find()
    const wrapper = othis._tireBrands;
    const callback = (fthis, brand) => brand['codMarca'] == fthis['codMarca'];

    const OBrand = R.find(callback.bind(null, tire))(wrapper);
    // return { ...tire, added: wrapper };
    return { ...tire, codMarcaDescripcion: OBrand['descripcion'] };
  }

  stateChanged(state) {
    this._tires = state.tires.tires.neumaticos;
    this._tireBrands = state.tires.tireBrands.marcaNeumatico;
    if (state.tires.tires.neumaticos) {
      console.log('state looks with tires');
    }
    if (state.tires.tireConditions.condicionesNeumatico) {
      console.log('state looks with conditions');
    }
    if (
      state.tires.tires.neumaticos &&
      state.tires.tireConditions.condicionesNeumatico
    ) {
      this.neumaticosView = R.map(
        this.toAddDescripcions.bind(null, this),
        this._tires
      );
    }
    if (
      state.tires.tireBrands.marcaNeumatico &&
      state.tires.tireModels.modeloNeumatico &&
      state.tires.tireMeasures.medidaNeumatico &&
      state.tires.tireDesigns.disenosNeumatico &&
      state.tires.tires.neumaticos &&
      state.views.tiresView < 1
    ) {
      console.log('all tires ok!!!!!');
      store.dispatch(addDescriptionsToTires());
    }
    if (
      state.vehicles.vehicles.vehiculo &&
      state.vehicles.vehicleBrands.marcaVehiculo &&
      state.vehicles.vehicleTypes.tipoVehiculo &&
      state.vehicles.vehicleModels.modeloVehiculo &&
      state.vehicles.vehicleConfigurations.configuracion &&
      state.views.vehiclesView < 1
    ) {
      console.log('all vehicles ok!!!!!');
      store.dispatch(addDescriptionsToVehicles());
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
      <div>hixdaaxdx</div>

      <section>
      </div>
      <style>
        #container {
          padding: 1.5em;
        }
      </style>
      <button @click="${() =>
        console.log(this.neumaticosView)}" >getState</button>
      <button @click="${() =>
        console.log(this._tireBrands)}" > log brands </button>
      <button @click="${() =>
        store.dispatch(addDescriptionsToTires())}" > dispatch store </button>
      <button @click="${() =>
        store.dispatch(addDescriptionsToVehicles())}" > dispatch store </button>
    `;
  }
}

window.customElements.define('movements-element', MovementsElement);
