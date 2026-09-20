import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const InventoryFilterdataAction = (id) =>{

    return async function(dispatch,getState){
        const response = await fetch(`${actionConfig.REACT_APP_URL}listinventoryfilterdata?proid=${id}`);
        const dataxs = await response.json();
        const finalDataMy = dataxs;
        dispatch(
            {
                type:actionType.INVENTORYFILTERDATA,
                payload:finalDataMy,
            }
        )

    }
    
}
