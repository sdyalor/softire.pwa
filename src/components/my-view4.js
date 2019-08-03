import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '../../src/components/counter-element.js'

class MyView4 extends PageViewElement {
  constructor(){
    super();
    this.value = 1 ;
    this.vehiculos = [];
    this.marcasVehiculo = [];
    this.modelosVehiculo = [];
    this.tiposVehiculo = [];
    this.configuraciones = [];


    this.neumaticos = [];
    this.condicionesNeumatico = [];
    this.disenosNeumatico = [];
    this.marcaNeumatico = [];
    this.medidaNeumatico = [];
    this.modeloNeumatico = [];
    this.fetchURL = `http://azaryah.sdyalor.me/api/graphql`;
    /*  Fetch fromVehicles */
    this.fetchModelosVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { modeloVehiculo { codModelo descripcion } }`})}).then(r => r.json()).then(data => this.modelosVehiculo = (data['data']['modeloVehiculo']));
    this.fetchTiposVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { tipoVehiculo { codTipo descripcion } }`})}).then(r => r.json()).then(data => this.tiposVehiculo = (data['data']['tipoVehiculo']));
    this.fetchVehiculos = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { vehiculo { codVehiculo placa } }`})}).then(r => r.json()).then(data => this.vehiculos = (data['data']['vehiculo']));
    this.fetchMarcasVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { marcaVehiculo { codMarca descripcion } }`})}).then(r => r.json()).then(data => this.marcasVehiculo = (data['data']['marcaVehiculo']));
    this.fetchConfiguracionesVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { configuracion { codConfi descripcion } }`})}).then(r => r.json()).then(data => this.configuraciones = (data['data']['configuracion']));
     /* Fetch fromTires */
    this.fetchNeumaticos = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { neumaticos { codNeumatico codMarca codModelo codMedida codDiseno estado } }`})}).then(r => r.json()).then(data => this.neumaticos = (data['data']['neumaticos']));
    this.fetchCondicionesNeumatico = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { condicionesNeumatico { codCondicion descripcion } }`})}).then(r => r.json()).then(data => this.condicionesNeumatico = (data['data']['condicionesNeumatico']));
    this.fetchDisenosNeumatico = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { disenosNeumatico { codDiseno descripcion } }`})}).then(r => r.json()).then(data => this.disenosNeumatico = (data['data']['disenosNeumatico']));
    this.fetchMarcaNeumatico = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { marcaNeumatico { codMarca descripcion } }`})}).then(r => r.json()).then(data => this.marcaNeumatico = (data['data']['marcaNeumatico']));
    this.fetchMedidaNeumatico = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { medidaNeumatico { codMedida descripcion } }`})}).then(r => r.json()).then(data => this.medidaNeumatico = (data['data']['medidaNeumatico']));
    this.fetchModeloNeumatico = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { modeloNeumatico { codModelo descripcion } }`})}).then(r => r.json()).then(data => this.modeloNeumatico = (data['data']['modeloNeumatico']));

  }
  static get styles() {
    return [
      SharedStyles
    ];
  }
  static get properties() {
    return {
      vehiculos: { type: Array},
      marcasVehiculo: {type: Array},
      modelosVehiculo: {type: Array},
      tiposVehiculo: {type: Array},
      configuraciones: {type: Array},
      neumaticos: {type: Array},
      condicionesNeumatico: {type: Array},
      disenosNeumatico: {type: Array},
      marcaNeumatico: {type: Array},
      medidaNeumatico: {type: Array},
      modeloNeumatico: {type: Array}
    };
  }

  render() {
    return html`
    <h1>Historial de Neumaticos</h1>
    <style is="custom-style" include="paper-item-shared-styles"></style>
    <section>
    <!-- codVehiculo fromVehicles-->
     <paper-dropdown-menu label="Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
             this.vehiculos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codVehiculo}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!-- end codVehiculo fromVehicles-->
    <!-- placa fromVehicles-->
     <paper-dropdown-menu label="Placa de Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content"  >
    ${
      html`${
            this.vehiculos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.placa}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!-- end placa fromVehicles-->
    <!-- codMarca fromVehicles-->
     <paper-dropdown-menu label="Marca de Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.marcasVehiculo.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codMarca} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!-- End codMarca fromVehicles-->
    <!-- Modelos fromVehicles-->
     <paper-dropdown-menu label="Modelo de Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.modelosVehiculo.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codModelo} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End  Modelos fromVehicles-->
    <!-- Tipos fromVehicles-->
     <paper-dropdown-menu label="Tipo de Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.tiposVehiculo.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codTipo} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End  Tipos fromVehicles-->
    <!-- Configuraciones fromVehicles -->
     <paper-dropdown-menu label="Configuraciones de Vehiculo" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.configuraciones.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codConfi} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End  Configurationces fromVehicles -->


    <!-- Neumaticos fromTires -->
     <paper-dropdown-menu label="Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.neumaticos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codNeumatico}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End  Neumaticos fromTires -->
    <!-- Marca de Neumaticos fromTires -->
     <paper-dropdown-menu label="Marca de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.marcaNeumatico.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codMarca}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Marca de Neumaticos fromTires -->
    <!-- Modelo de Neumaticos fromTires -->
     <paper-dropdown-menu label="Modelo de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.modeloNeumatico.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codModelo}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Modelo de Neumaticos fromTires -->
    <!-- Medida de Neumaticos fromTires -->
     <paper-dropdown-menu label="Medida de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.medidaNeumatico.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codMedida}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Medida de Neumaticos fromTires -->
    <!-- Diseno de Neumaticos fromTires -->
     <paper-dropdown-menu label="Disenos de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.disenosNeumatico.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codDisenos}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Disenos de Neumaticos fromTires -->
    <!-- Condicion de Neumaticos fromTires -->
     <paper-dropdown-menu label="Condiciones de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" >
    ${
      html`${
            this.condicionesNeumatico.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codCondicion}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Condicion de Neumaticos fromTires -->
    </section>
     <style>
         button, p {
           display: inline-block;
         }
       </style>

  `;
  }
}

window.customElements.define('my-view4', MyView4);
