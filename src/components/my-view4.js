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
    this.myBool = true;
    this.myArray = ['an','array','of','test','data'];
    this.vehiculos = [];
    this.boolVehiculos = this.vehiculos.length >2;
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
      }
    
    }
     `})
    })
      .then(r => r.json())
      .then(data => this.vehiculos = (data['data']['vehiculo']));
    this.snneumaticosdet =
      [
        {
          "codNeumatico": "0856",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017108",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017109",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017112",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017115",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017116",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017117",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017118",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017119",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017125",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017127",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017128",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017130",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017131",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017134",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017135",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017136",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017138",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017139",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "101017140",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "101017143",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10111712",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10114036",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10114039",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10114063",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "10115011",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115014",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115017",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115018",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115021",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "10115043",
          "codEvento": "10",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "1"
        },
        {
          "codNeumatico": "10115171",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115175",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115179",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10115180",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "1011523",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "1011606",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10116100",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10116101",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10116102",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        },
        {
          "codNeumatico": "10116103",
          "codEvento": "19",
          "codObra": "01",
          "usuario": "roberto",
          "fecha": "2019-05-31",
          "idcarga": "2"
        }]

  }
  static get styles() {
    return [
      SharedStyles
    ];
  }
  static get properties() {
    return {
      message: { type: String },
      myBool: { type: Boolean },
      myArray: { type: Array },
      vehiculos: { type: Array},
    //  boolVehiculos: {type: Boolean}
    };
  }
  // decrement() {
  //   this.value--;
  //   this._valueChanged();
  // }

  // increment() {
  //   this.value++;
  //   this._valueChanged();
  // }
  // _valueChanged() {
  //   // Fire a custom event for others to listen to
  //   this.dispatchEvent(new CustomEvent('valueChange', { detail: this.value }));
  // }
  clickHandler(event) {
    console.log(event.target);
    console.log(this.vehiculos);
    this.myBool = !this.myBool;


  }

  _itemSelected(e) {
    var selectedItem = e.target.selectedItem;
    if (selectedItem) {
      console.log("selected: " + selectedItem.innerText);
    }
  }
  render() {
    return html`
    <section>
    <p>${this.message}</p>
    ${this.myBool ?
      html`<p>Render some HTML if myBool is true</p>` :
      html`<p>Render some other HTML if myBool is false</p>`}
    <button @click=${this.clickHandler}>Click</button>
    <p>this bind: ${this.myBool}</p>
   <counter-element></counter-element> 
     <paper-dropdown-menu label="Neumaticos" vertical-offset="60">
       <paper-listbox slot="dropdown-content" selected=3 >
        ${this.snneumaticosdet.map(item => html`<paper-item @click=${e => console.log(e.target.innerText)}>${item['codNeumatico']}</paper-item>`)}
       </paper-listbox>
     </paper-dropdown-menu>
     <paper-dropdown-menu label="Obra" vertical-offset="60">
       <paper-listbox slot="dropdown-content" selected=3 >
        ${this.snneumaticosdet.map(item => html`<paper-item @click=${e => console.log(e.target.innerText)}>${item['codObra']}</paper-item>`)}
       </paper-listbox>
     </paper-dropdown-menu>
     <paper-dropdown-menu label="fecha" vertical-offset="60">
       <paper-listbox slot="dropdown-content" selected=3 >
        ${this.snneumaticosdet.map(item => html`<paper-item @click=${e => console.log(e.target.innerText)}>${item['fecha']}</paper-item>`)}
       </paper-listbox>
     </paper-dropdown-menu>
     <paper-dropdown-menu label="Evento" vertical-offset="60">
       <paper-listbox slot="dropdown-content" selected=3 >
        ${this.snneumaticosdet.map(item => html`<paper-item @click=${e => console.log(e.target.innerText)}>${item['codEvento']}</paper-item>`)}
       </paper-listbox>
     </paper-dropdown-menu>
     <paper-dropdown-menu label="Array Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
       </paper-listbox>
     </paper-dropdown-menu>

     <style is="custom-style" include="paper-item-shared-styles"></style>

     </paper-dropdown-menu>
     <paper-dropdown-menu label="Array Vehiculos" vertical-offset="60" async>
       <paper-listbox slot="dropdown-content" selected=3 >
    ${this.boolVehiculos?
      html`<paper-item>no content</paper-item>`:
      html`${
             this.vehiculos.map( x => html`<paper-item>${x.codVehiculo}</paper-item>`)
            }`
    }
       </paper-listbox>
     </paper-dropdown-menu>


${this.boolVehiculos?html`<p>no hay vehiculos </p>`:html`${this.vehiculos.map(x => html`${x.codVehiculo}`)}`}
${html`${this.vehiculos.map(x => html`${x.codVehiculo}`)}`}

    </section>
     <style>
         button, p {
           display: inline-block;
         }
       </style>

  `;
    // return html`
    //   <section>
    //     <h2>Historial de neumaticos</h2>
    // <paper-dropdown-menu label="Dinosaurs">
    //   <paper-listbox slot="dropdown-content" >
    //     <paper-item>allosaurus</paper-item>
    //     <paper-item>brontosaurus</paper-item>
    //     <paper-item>carcharodontosaurus</paper-item>
    //     <paper-item>diplodocus</paper-item>
    //   </paper-listbox>
    // </paper-dropdown-menu>
    // <style>
    //     button, p {
    //       display: inline-block;
    //     }
    //   </style>
    //   <button @click=${() => this.decrement()} aria-label="decrement">-</button>
    //   <p>${this.value}</p>
    //   <button @click=${() => this.increment()} aria-label="increment">+</button>
    //   <button @click=${this.clickHandler}>Click</button>

    //   </section>
    // `
  }
}

window.customElements.define('my-view4', MyView4);
