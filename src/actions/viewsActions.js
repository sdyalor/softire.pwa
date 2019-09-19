import { store } from '../store.js';
import * as R from 'ramda';
export const ADD_DESCRIPTIONS_TO_TIRES = 'ADD_DESCRIPTION_TO_TIRES';

export const addDescriptionsToTires = () => dispatch => {
  if (
    store.getState().tires.tires.neumaticos &&
    store.getState().tires.tireConditions.condicionesNeumatico
  ) {
    const _tiresBrands = store.getState().tires.tireBrands.marcaNeumatico;
    const _tiresModels = store.getState().tires.tireModels.modeloNeumatico;
    const _tiresMeasures = store.getState().tires.tireMeasures.medidaNeumatico;
    const _tiresDesings = store.getState().tires.tireDesigns.disenosNeumatico;
    const _tires = store.getState().tires.tires.neumaticos;
    let tiresWithDescriptions = [];
    /**
     * MAP Place
     */
    //CallBack Map Function with Brands Binded
    //AddDescriptionTo Returns a object tire with Descriptions
    const addDescriptionTo = (brandsBinded, modelsBinded, measuresBinded, designsBinded, tire) => {
      //select brand: brands and a tire returns a brand
      const selectBrand = (allBrands, aTire) => {
        //filterCallback return boolean from comparison, Comparison is between brandCodBrand tireCodBrand
        // takes a brand then a tire that is binded
        /**
         * filterCallback takes a brand and a tire binded
         */
        const filterCallback = (aTire, brandToFilter) =>
          aTire['codMarca'] === brandToFilter['codMarca'];
        //assumming that at least one brand matches
        const brandThatMatches = R.find(filterCallback.bind(null, aTire));
        const aBrand = brandThatMatches(allBrands);
        return aBrand;
      };
      const selectModel = (allModels, aTire) => {
        const filterCallback = (aTire, brandToFilter) =>
          aTire['codModelo'] === brandToFilter['codModelo'];
        const modelThatMatches = R.find(filterCallback.bind(null, aTire));
        const aBrand = modelThatMatches(allModels);
        return aBrand;
      };
      const selectMeasure = (allMeasures, aTire) => {
        const filterCallback = (aTire, measureToFilter) =>
          aTire['codMedida'] === measureToFilter['codMedida'];
        const measureThatMatches = R.find(filterCallback.bind(null, aTire));
        const aMeasure = measureThatMatches(allMeasures);
        return aMeasure;
      };
      const selectDesign = (allDesigns, aTire) => {
        const filterCallback = (aTire, designToFilter) =>
          aTire['codDiseno'] === designToFilter['codDiseno'];
        const designThatMatches = R.find(filterCallback.bind(null, aTire));
        const aDesign = designThatMatches(allDesigns);
        return aDesign;
      };

      return {
        ...tire,
        codMarcaDescripcion: selectBrand(brandsBinded, tire)['descripcion'],
        codModeloDescripcion: selectModel(modelsBinded, tire)['descripcion'],
        codMedidaDescripcion: selectMeasure(measuresBinded, tire)['descripcion'],
        codDisenoDescripcion: selectDesign(designsBinded, tire)['descripcion']
      };
    };

    /**
     * MAP Place
     */

    tiresWithDescriptions = R.map(
      addDescriptionTo.bind(null, _tiresBrands, _tiresModels, _tiresMeasures, _tiresDesings),
      _tires
    );
    return dispatch({ type: ADD_DESCRIPTIONS_TO_TIRES, tiresView: tiresWithDescriptions });
  }
};

// let neumaticosView = R.map(this.toAddDescripcions.bind(null, this), this._tires);

// function toAddDescripcions(othis, tire) {
//   // R.find()
//   const wrapper = othis._tireBrands;
//   const callback = (fthis, brand) => brand['codMarca'] == fthis['codMarca'];

//   const OBrand = R.find(callback.bind(null, tire))(wrapper);
//   // return { ...tire, added: wrapper };
//   return { ...tire, codMarcaDescripcion: OBrand['descripcion'] };
// }
