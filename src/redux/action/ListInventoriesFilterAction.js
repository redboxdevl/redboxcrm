import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
import axios from 'axios';

export const ListInventoriesFilterAction = () =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listinventoriesfilters`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.LISTINVENTORIESFILTERS,
                payload:response,
            }
        )

    }
    
}




