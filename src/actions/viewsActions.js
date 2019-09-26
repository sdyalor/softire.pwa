import { store } from '../store.js';
import { find as rFind, map as rMap } from 'ramda';
export const ADD_DESCRIPTIONS_TO_TIRES = 'ADD_DESCRIPTION_TO_TIRES';
export const ADD_DESCRIPTIONS_TO_VEHICLES = 'ADD_DESCRIPTION_TO_VEHICLES';

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
    const addDescriptionTo = (
      brandsBinded,
      modelsBinded,
      measuresBinded,
      designsBinded,
      tire
    ) => {
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
        const brandThatMatches = rFind(filterCallback.bind(null, aTire));
        const aBrand = brandThatMatches(allBrands);
        return aBrand;
      };
      const selectModel = (allModels, aTire) => {
        const filterCallback = (aTire, brandToFilter) =>
          aTire['codModelo'] === brandToFilter['codModelo'];
        const modelThatMatches = rFind(filterCallback.bind(null, aTire));
        const aBrand = modelThatMatches(allModels);
        return aBrand;
      };
      const selectMeasure = (allMeasures, aTire) => {
        const filterCallback = (aTire, measureToFilter) =>
          aTire['codMedida'] === measureToFilter['codMedida'];
        const measureThatMatches = rFind(filterCallback.bind(null, aTire));
        const aMeasure = measureThatMatches(allMeasures);
        return aMeasure;
      };
      const selectDesign = (allDesigns, aTire) => {
        const filterCallback = (aTire, designToFilter) =>
          aTire['codDiseno'] === designToFilter['codDiseno'];
        const designThatMatches = rFind(filterCallback.bind(null, aTire));
        const aDesign = designThatMatches(allDesigns);
        return aDesign;
      };

      return {
        ...tire,
        codMarcaDescripcion: selectBrand(brandsBinded, tire)['descripcion'],
        codModeloDescripcion: selectModel(modelsBinded, tire)['descripcion'],
        codMedidaDescripcion: selectMeasure(measuresBinded, tire)[
          'descripcion'
        ],
        codDisenoDescripcion: selectDesign(designsBinded, tire)['descripcion']
      };
    };

    /**
     * MAP Place
     */

    tiresWithDescriptions = rMap(
      addDescriptionTo.bind(
        null,
        _tiresBrands,
        _tiresModels,
        _tiresMeasures,
        _tiresDesings
      ),
      _tires
    );
    return dispatch({
      type: ADD_DESCRIPTIONS_TO_TIRES,
      tiresView: tiresWithDescriptions
    });
  }
};

export const addDescriptionsToVehicles = () => dispatch => {
  if (
    store.getState().vehicles.vehicles.vehiculo &&
    store.getState().vehicles.vehicleTypes.tipoVehiculo
  ) {
    const _vehicleTypes = store.getState().vehicles.vehicleTypes.tipoVehiculo;
    const _vehicleBrands = store.getState().vehicles.vehicleBrands
      .marcaVehiculo;
    const _vehicleModels = store.getState().vehicles.vehicleModels
      .modeloVehiculo;
    const _vehicleConfigurations = store.getState().vehicles
      .vehicleConfigurations.configuracion;
    const _vehicles = store.getState().vehicles.vehicles.vehiculo;
    let vehiclesWithDescriptions = [];

    const addDescriptionTo = (
      typesBinded,
      brandsBinded,
      modelsBinded,
      confsBinded,
      vehicle
    ) => {
      const selectByKey = (
        sampleSpace,
        selectorObject,
        keyStringfindICO,
        keyStringFilterO
      ) => {
        const filterCallback = (
          filterObjectBinded,
          keyStringfilterBinded,
          keyStringIterableBinded,
          findIterableCurrentSample
        ) =>
          filterObjectBinded[`${keyStringfilterBinded}`] ===
          findIterableCurrentSample[`${keyStringIterableBinded}`];

        const selectionThatMatches = rFind(
          filterCallback.bind(
            null,
            selectorObject,
            keyStringFilterO,
            keyStringfindICO
          )
        );
        const selection = selectionThatMatches(sampleSpace);
        return selection;
      };

      return {
        ...vehicle,
        codTipoDescripcion: selectByKey(
          typesBinded,
          vehicle,
          'codTipo',
          'codTipo'
        )['descripcion'],
        codMarcaDescripcion: selectByKey(
          brandsBinded,
          vehicle,
          'codMarca',
          'codMarca'
        )['descripcion'],
        codModeloDescripcion: selectByKey(
          modelsBinded,
          vehicle,
          'codModelo',
          'codModelo'
        )['descripcion'],
        codConfiguracionDescripcion: selectByKey(
          confsBinded,
          vehicle,
          'codConfi',
          'codConfiguracion'
        )['descripcion']
      };
    };

    vehiclesWithDescriptions = rMap(
      addDescriptionTo.bind(
        null,
        _vehicleTypes,
        _vehicleBrands,
        _vehicleModels,
        _vehicleConfigurations
      ),
      _vehicles
    );
    return dispatch({
      type: ADD_DESCRIPTIONS_TO_VEHICLES,
      vehiclesView: vehiclesWithDescriptions
    });
  }
};
