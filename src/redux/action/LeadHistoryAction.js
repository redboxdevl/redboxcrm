import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const LeadHistoryAction = (LeadID) =>{

    return async function(dispatch,getState){
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const response = await axios(`${actionConfig.REACT_APP_URL}leadhistoryaction?leadid=${LeadID}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((error) => {
            return error;
         });
     
        dispatch(
            {
                type:actionType.LEADHISTORYACTION,
                payload:response,
            }
        )

    }
    
}
