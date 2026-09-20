import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
import axios from 'axios';

export const InventoriesAction = (company_id) =>{

    return async (dispatch,getState)=>{

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}project?company_id=${company_id}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}project`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.INVENTORIES,
                payload:response,
            }
        )

    }
    
}





