import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const CallingActions = (agentId,LeadId,companyId) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}callingimpression?agentid=${agentId}&leadid=${LeadId}&companyId=${companyId}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((error) => {
            return error;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}callingimpression?agentid=${agentId}&leadid=${LeadId}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.CALLINGACTION,
                payload:response,
            }
        )

    }
}