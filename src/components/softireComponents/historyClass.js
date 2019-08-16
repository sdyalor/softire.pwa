export default class historyClass {
    constructor(arg){
    /* index api Fetch  */
        // this.nroCia = arg.map(({nroCia}) => nroCia);
        // this.codNeumatico = arg.map(({codNeumatico}) => codNeumatico);
        // this.fechaMov = arg.map(({fechaMov}) => fechaMov);
        // this.codCondicion = arg.map(({codCondicion}) => codCondicion);
        // this.ubicacion = arg.map(({ubicacion}) => ubicacion);
        // this.codEvento = arg.map(({codEvento}) => codEvento);
        // this.remanenteProm = arg.map(({remanenteProm}) => remanenteProm);
        // this.posicion = arg.map(({posicion}) => posicion);
        // this.codDiseno = arg.map(({codDiseno}) => codDiseno);
        // this.kilometraje = arg.map(({kilometraje}) => kilometraje);
        // this.horometro = arg.map(({horometro}) => horometro);
        // this.presion = arg.map(({presion}) => presion);
        // this.codProveedor = arg.map(({codProveedor}) => codProveedor);
        // this.costo = arg.map(({costo}) => costo);

        this.groupBycodCondicion = this.groupBy(arg, 'codCondicion');
        /**
         * 
         */
        // this.ArrayOfcondicionNU =  this.groupBy(this.groupBycodCondicion['NU'],'codEvento');
        this.ArrayOfcondicionNU =  this.groupBy(this.groupBycodCondicion['NU'],'codEvento');
    }

    groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
                var key = obj[property];
                if (!acc[key]) {
                acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});
    }

    /**
     * installation Remnant
     */
    get instalationRemnantObj(){
        return this.groupBycodCondicion['NN'][0];
        //returns Array[0], so Object
    }

    /**
     * last Inspection Remnant
     */
    // set lastInspectionWhereCondicion(condicion){
    //     groupOfcondicion01 =  groupBy
    //            (
    //                this.groupBycodCondicion[`${condicion}`],
    //                'codEvento'
    //            )['01'];
    //     return groupOfcondicion01[groupOfcondicion01.length -1];
    // }
    get lastInspectionWhereCondicionNU(){
        // return this.ArrayOfcondicionNU[this.ArrayOfcondicionNU.length -1];
        return this.ArrayOfcondicionNU;
    }
}