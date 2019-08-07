/* eslint-disable no-console */
import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import './softireComponents/tires-search-element.js'


class MyView4 extends PageViewElement {
  constructor(){
    super();
    this.pageSize = 20;
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
    this.vehiculosPage = [];
    /* filters*/
    this.codModeloFilter = "";
    this.codMedidaFilter = "";
    this.codDisenoFilter = "";
    this.codMarcaFilter = "";
    /* ENDfilters*/
    this.fetchURL = `http://azaryah.sdyalor.me/api/graphql`;
    /*  Fetch fromVehicles */
    this.fetchModelosVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { modeloVehiculo { codModelo descripcion } }`})}).then(r => r.json()).then(data => this.modelosVehiculo = (data['data']['modeloVehiculo']));
    this.fetchTiposVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { tipoVehiculo { codTipo descripcion } }`})}).then(r => r.json()).then(data => this.tiposVehiculo = (data['data']['tipoVehiculo']));
     /** historial vehiculos*/
    this.fetchVehiculos = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { vehiculo {codVehiculo codMarca codModelo codTipo placa codConfiguracion} }`})}).then(r => r.json()).then(data => {this.vehiculos = (data['data']['vehiculo']); this.vehiculosPage=this.vehiculos.slice((1-1)*this.pageSize,1*this.pageSize);});
    this.fetchMarcasVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { marcaVehiculo { codMarca descripcion } }`})}).then(r => r.json()).then(data => this.marcasVehiculo = (data['data']['marcaVehiculo']));
    this.fetchConfiguracionesVehiculo = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { configuracion { codConfi descripcion } }`})}).then(r => r.json()).then(data => this.configuraciones = (data['data']['configuracion']));
     /* Fetch fromTires */
     /** historial Neumaticos*/
    this.fetchNeumaticos = fetch(`${this.fetchURL}`, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json',},
     body: JSON.stringify({query: `query { neumaticos { codNeumatico codMarca codModelo codMedida codDiseno estado codProveedor} }`})}).then(r => r.json()).then(data => this.neumaticos = (data['data']['neumaticos']));
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
      vehiculosPage: {type: Array},
      vehiculos: { type: Array},
      codModeloFilter: { type: String},
      codMedidaFilter: { type: String},
      codDisenoFilter: { type: String},
      codMarcaFilter: { type: String},
      marcasVehiculo: {type: Array},
      modelosVehiculo: {type: Array},
      tiposVehiculo: {type: Array},
      configuraciones: {type: Array},
      neumaticos: {type: Array},
      condicionesNeumatico: {type: Array},
      disenosNeumatico: {type: Array},
      marcaNeumatico: {type: Array},
      medidaNeumatico: {type: Array},
      modeloNeumatico: {type: Array},
      }
    }



  render() {
    return html`
    <style is="custom-style" include="paper-item-shared-styles"></style>
    <section>
    <h1>Historial de Neumaticos</h1>
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

    </section>
        <!-- Start Table -->
    
    <vaadin-grid theme="column-borders" page-size="${this.pageSize}" height-by-rows column-reordering-allowed multi-sort .items=${this.vehiculosPage}>
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
        <vaadin-grid-filter-column width="9em" path="codVehiculo" header="Vehiculo"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column width="9em" path="codMarca" header="Marca de Vehiculo"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column width="9em" path="codModelo" flex-grow="2" header="Modelo de Vehiculo"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column width="9em" path="codTipo" header="Tipo de Vehiculo"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column width="9em" path="placa" header="Placa de Vehiculo"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column width="9em" path="codConfiguracion" header="Configuracion de Vehiculo"></vaadin-grid-filter-column>
    </vaadin-grid>
    <div id="pages">${
        this.vehiculos.length >2?Array.apply(null,{length: Math.ceil(this.vehiculos.length/this.pageSize)}).map((item,index)=>html`<button @click=${(e)=>this.updateItemsFromPage(e.target.innerText)}>${index+1}</button>`):"false"
    }</div>


    <!-- Neumaticos fromTires -->
    <section>
    <h1>Historial de Vehiculos</h1>
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
       <paper-listbox slot="dropdown-content" selected=0 >
        <paper-item @click=${() => this.codMarcaFilter = ""}>Modelo de Neumatico</paper-item>
    ${
      html`${
            this.marcaNeumatico.map( x => html`<paper-item @click=${() => this.codMarcaFilter = x.codMarca}>${x.codMarca}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Marca de Neumaticos fromTires -->
    <!-- Modelo de Neumaticos fromTires -->
     <paper-dropdown-menu label="Modelo de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=0>
        <paper-item @click=${() => this.codModeloFilter = ""}>Modelo de Neumatico</paper-item>
    ${
      html`${
            this.modeloNeumatico.map( x => html`<paper-item @click=${() => this.codModeloFilter = x.codModelo}>${x.codModelo}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Modelo de Neumaticos fromTires -->
    <!-- Medida de Neumaticos fromTires -->
     <paper-dropdown-menu label="Medida de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=0>
        <paper-item @click=${() => this.codMedidaFilter = ""}>Medida de Neumatico</paper-item>
    ${
      html`${
            this.medidaNeumatico.map( x => html`<paper-item @click=${() => this.codMedidaFilter = x.codMedida}>${x.codMedida}: ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End Medida de Neumaticos fromTires -->
    <!-- Diseno de Neumaticos fromTires -->
     <paper-dropdown-menu label="Disenos de Neumaticos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=0>
        <paper-item @click=${() => this.codDisenoFilter = ""}>Diseno de Neumatico</paper-item>
    ${
      html`${
            this.disenosNeumatico.map( x => html`<paper-item @click=${() => this.codDisenoFilter = x.codDiseno}>${x.codDiseno}: ${x.descripcion}</paper-item>`)
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
</section>
    <!--End Condicion de Neumaticos fromTires -->

    <vaadin-grid theme="row-stripes" column-reordering-allowed multi-sort .items=${this.neumaticos}>
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column> <vaadin-grid-filter-column resizable width="9em" path="codNeumatico" header="Neumatico"></vaadin-grid-filter-column>
        <vaadin-grid-sort-column resizable width="9em" path="codMarca" header="Marca de Neumatico">
            <vaadin-grid-filter path="codMarca" value=${this.codMarcaFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column resizable width="9em" path="codModelo" flex-grow="2" header="Modelo de Neumatico">
            <vaadin-grid-filter path="codModelo" value=${this.codModeloFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column width="9em" path="codMedida" header="Medida de Neumatico">
            <vaadin-grid-filter path="codMedida" value=${this.codMedidaFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column width="9em" path="codDiseno" header="Diseno de Neumatico">
            <vaadin-grid-filter path="codDiseno" value=${this.codDisenoFilter}></vaadin-grid-filter>
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column width="9em" path="estado" header="Estado de Neumatico"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column width="9em" path="codProveedor" header="Proveedor de Neumatico"></vaadin-grid-sort-column>
    </vaadin-grid>

    <tires-search-element></tires-search-element>

     <style>
        button, p {
           display: inline-block;
         }
         #pages {
            display: flex;
            flex-wrap: wrap;
            margin: 20px;
        }

        #pages > button {
            user-select: none;
            padding: 5px;
            margin: 0 5px;
            border-radius: 10%;
            border: 0;
            background: transparent;
            font: inherit;
            outline: none;
            cursor: pointer;
        }

        #pages > button:not([disabled]):hover,
        #pages > button:focus {
            color: #ccc;
            background-color: #eee;
        }

        #pages > button[selected] {
            font-weight: bold;
            color: white;
            background-color: #ccc;
        }

        #pages > button[disabled] {
            opacity: 0.5;
            cursor: default;
        }
     </style>
  `;

  }
    updateItemsFromPage(innerText){
        this.vehiculosPage = this.vehiculos.slice((innerText-1)*this.pageSize,innerText*this.pageSize);
    }
}

window.customElements.define('my-view4', MyView4);
