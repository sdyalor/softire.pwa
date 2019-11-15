/* eslint-disable no-console */
import { LitElement, property, customElement, html } from 'lit-element';
import { SharedStyles } from '../shared-styles';
import { store } from '../../store';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { DataFrame, IDataFrame } from 'data-forge';
// import 'canvas-datagrid/dist/canvas-datagrid.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';

@customElement('history-dataframe')
export class HistoryDataframe extends connect(store)(LitElement) {
  //@ts-ignore
  private fetchGraphQL({ queryString }) {
    const fetchURL = `https://azaryah.sdyalor.me/api/graphql`;
    return fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: queryString
      })
    })
      .then(r => r.json())
      .then(r => r.data);
  }

  @property({ type: String })
  queryG = (id: String) => `
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
  `;
  async dataFrameFromAPI(dfID: String) {
    const data = await this.fetchGraphQL({
      queryString: this.queryG(dfID)
    }).then(x => x['snNeumaticosDetsById']);
    return new DataFrame(data);
  }

  static get styles() {
    return [SharedStyles];
  }
  dfWithOperations(df: IDataFrame): IDataFrame {
    const dfWithPartialKm = df.ensureSeries({
      partialKmPerInspection: df
        .getSeries('kilometraje')
        .select((value, index) =>
          value > 0 && df.getSeries('kilometraje').at(index - 1) > 0
            ? value - df.getSeries('kilometraje').at(index - 1)
            : 0
        )
    });
    const dfWithTotalKm = dfWithPartialKm.ensureSeries({
      totalKmPerInspection: dfWithPartialKm
        .getSeries('partialKmPerInpection')
        .select((value, index) =>
          value > 0 &&
          dfWithPartialKm
            .getSeries('partialKmPerInspection')
            .at(index - 1) >= 0
            ? value +
              dfWithPartialKm
                .getSeries('partialKmPerInspection')
                .at(index - 1)
            : 0
        )
    });
    const dfWithKmCost = dfWithTotalKm.ensureSeries({
      costPerKm: dfWithTotalKm
        .getSeries('totalKmPerInspection')
        .select((value, index) =>
          value > 0
            ? dfWithTotalKm
                .getSeries('costo')
                .toArray()
                .slice(0, index)
                .filter(e => e > 0)[
                dfWithTotalKm
                  .getSeries('costo')
                  .toArray()
                  .slice(0, index)
                  .filter(e => e > 0).length - 1
              ] / value
            : 0
        )
    });

    const dfWithPartialHours = dfWithKmCost.ensureSeries({
      partialHoursPerInspection: dfWithKmCost
        .getSeries('horometro')
        .select((value, index) =>
          value > 0 &&
          dfWithKmCost.getSeries('horometro').at(index - 1) > 0
            ? value - dfWithKmCost.getSeries('horometro').at(index - 1)
            : 0
        )
    });
    const dfWithTotalHours = dfWithPartialHours.ensureSeries({
      totalHoursPerInspection: dfWithPartialHours
        .getSeries('partialHoursPerInspection')
        .select((value, index) =>
          value > 0
            ? value +
              dfWithPartialHours
                .getSeries('partialHoursPerInspection')
                .at(index - 1)
            : 0
        )
    });
    const dfWithInspections = dfWithTotalHours.ensureSeries({
      costPerInspectionHours: dfWithTotalHours
        .getSeries('totalHoursPerInspection')
        .select((value, index) =>
          value > 0
            ? dfWithTotalHours
                .getSeries('costo')
                .toArray()
                .slice(0, index)
                .filter(e => e > 0)[
                dfWithTotalHours
                  .getSeries('costo')
                  .toArray()
                  .slice(0, index)
                  .filter(e => e > 0).length - 1
              ] / value
            : 0
        )
    });
    return dfWithInspections;
  }

  @property({ type: String })
  inputValue = `0007412`;
  @property({ type: Array })
  dfDataToDisplay = [1, 2, 3];
  @property({ type: DataFrame })
  dfHolder = typeof DataFrame;

  async Operation() {
    console.log(this.inputValue, 'from Operation async');
    const data = await this.dataFrameFromAPI(this.inputValue);
    console.log(await data.toArray());
    const dfWithOperations = this.dfWithOperations(data);
    console.log(dfWithOperations.getColumnNames());
    console.log(dfWithOperations.toArray());

    this.dfDataToDisplay = await dfWithOperations.toArray();

    console.log(this.dfDataToDisplay);

    // await Promise.all(this.updateComplete, this.getMoreState());
  }

  async getMoreState() {
    return this.shadowRoot
      .getElementById('gridTime')
      .recalculateColumnWidths();
  }

  @property({ type: Array })
  canvasSchema = {
    width: '20'
  };

  @property()
  columns = [
    { root: 'nroCia', header: 'Compania' },
    { root: 'codNeumatico', header: 'Neumatico' },
    { root: 'fechaMov', header: 'Fecha' },
    { root: 'codCondicion', header: 'Condicion' },
    { root: 'ubicacion', header: 'Ubicacion' },
    { root: 'codEvento', header: 'Evento' },
    { root: 'remanenteProm', header: 'Remanente Promedio' },
    { root: 'posicion', header: 'Posicion' },
    { root: 'codDiseno', header: 'Disenio' },
    { root: 'kilometraje', header: 'Kilometraje' },
    { root: 'horometro', header: 'Horometro' },
    { root: 'presion', header: 'Presion' },
    { root: 'codProveedor', header: 'Proveedor' },
    { root: 'costo', header: 'Costo' },
    { root: 'partialKmPerInspection', header: 'Km/I Parciales' },
    { root: 'totalKmPerInspection', header: 'Km/I Totales' },
    { root: 'costPerKm', header: 'Costo/Km' },
    { root: 'partialHoursPerInspection', header: 'H Parciales' },
    { root: 'totalHoursPerInspection', header: 'H Totales' },
    { root: 'costPerInspectionHours', header: 'Costo/H' }
  ];

  reRenderShady() {
    this.shadowRoot
      .getElementById('gridTime')
      .children.forEach((element, index, array) => {
        if (element.tagName == 'VAADIN-GRID-COLUMN') {
          console.log(element.tagName);
          // array[index].autoWidth = true;
          // array[index].width = "300px"
        }
      });
    this.shadowRoot.getElementById('gridTime').recalculateColumnWidths();
  }

  render() {
    return html`
      <section>
        <h1>Detalle de Movimientos</h1>
        <input
          value=${this.inputValue}
          @change="${(e: { srcElement: { value: any } }) => {
            console.log(e.srcElement.value);
            console.log(this.inputValue, 'insideChangeEvent');
            this.inputValue = `${e.srcElement.value}`;
          }}"
        />
        <button
          @click=${e => this.Operation().then(e => this.getMoreState())}
        >
          GetOperations
        </button>
        <button @click="${this.reRenderShady}">
          recalculateColumnWidth
        </button>
      </section>
      <div id="container">
        <vaadin-grid
          id="gridTime"
          theme="compact column-borders"
          .items="${this.dfDataToDisplay}"
        >
          ${this.columns.map(
            columnPath => html`
              <vaadin-grid-column
                path="${columnPath.root}"
                header="${columnPath.header}"
                width="70px"
                text-align="center"
                .autoWidth="${true}"
              ></vaadin-grid-column>
            `
          )}
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
