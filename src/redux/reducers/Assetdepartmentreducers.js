import { actionType } from "../types/types";

const AssetDepartmentFlowCountstate = {
    assetdepartmentflowdata:[],
}
export const Assetdepartmentreducers = (state = AssetDepartmentFlowCountstate,action)=>{
    switch (action.type ) {
        case actionType.ASSETDEPARTMEMTFLOWACTION:
            return {
                ...state, //old state data
                assetdepartmentflowdata:action.payload,// updated state data
            }
        default:
           return state;
    }

}