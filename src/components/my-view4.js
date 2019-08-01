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
    this.marcas = [];
    this.modelos = [];
    this.tipos = [];
    this.fetchModelos = fetch('http://azaryah.sdyalor.me/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
     body: JSON.stringify({query: `
     query {	
      modelo {
        codModelo
        descripcion
      }
    
    }
     `})
    })
      .then(r => r.json())
      .then(data => this.modelos = (data['data']['modelo']));
    this.fetchTipos = fetch('http://azaryah.sdyalor.me/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
     body: JSON.stringify({query: `
     query {	
      tipo {
        codTipo
        descripcion
      }
    
    }
     `})
    })
      .then(r => r.json())
      .then(data => this.tipos = (data['data']['tipo']));
    this.fetchVehiculos = fetch('http://azaryah.sdyalor.me/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
     body: JSON.stringify({query: `
     query {	
      vehiculo {
        codVehiculo
        placa
      }
    
    }
     `})
    })
      .then(r => r.json())
      .then(data => this.vehiculos = (data['data']['vehiculo']));
    this.fetchMarcas = fetch('http://azaryah.sdyalor.me/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
     body: JSON.stringify({query: `
     query {	
      marca {
        codMarca
        descripcion
      }
    
    }
     `})
    })
      .then(r => r.json())
      .then(data => this.marcas = (data['data']['marca']));
  }
  static get styles() {
    return [
      SharedStyles
    ];
  }
  static get properties() {
    return {
      vehiculos: { type: Array},
      marcas: {type: Array},
      modelos: {type: Array},
      tipos: {type: Array}
    };
  }

  render() {
    return html`
    <style is="custom-style" include="paper-item-shared-styles"></style>
    <section>
    <!-- codVehiculo -->
     <paper-dropdown-menu label="Array Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
    ${
      html`${
             this.vehiculos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codVehiculo}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!-- end codVehiculo -->
    <!-- placa -->
     <paper-dropdown-menu label="Placa de Array Vehiculos vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
    ${
      html`${
            this.vehiculos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.placa}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!-- end placa -->
    <!-- codMarca -->
     <paper-dropdown-menu label="codMarca de Array Marcas" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
    ${
      html`${
            this.marcas.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codMarca} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!-- End codMarca -->
    <!-- Modelos -->
     <paper-dropdown-menu label="codModelo de Array modelos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
    ${
      html`${
            this.modelos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codModelo} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End  Modelos -->
    <!-- Tipos -->
     <paper-dropdown-menu label="Array tipos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
    ${
      html`${
            this.tipos.map( x => html`<paper-item @click=${e => console.log(e.target.innerText)}>${x.codTipo} : ${x.descripcion}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>
    <!--End  Tipos -->
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
