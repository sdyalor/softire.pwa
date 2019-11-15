import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  customElement
} from 'lit-element';
// import './my-view4';
// import './softireComponents/history-dataframe';
import 'canvas-datagrid/dist/canvas-datagrid.js';

@customElement('my-app')
export class MyApp extends LitElement {
  protected render() {
    return html`
      <h1>hi</h1>
      <canvas-datagrid .data="${[1,2,3]}"></canvas-datagrid>
    `;
  }
}
