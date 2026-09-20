import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
import axios from 'axios';

export const AllListInventoriesAction = (agentId,id) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}projectwiseblock?agentId=${agentId}&proid=${id}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}projectinventory?proid=${id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs;
        dispatch(
            {
                type:actionType.ALLLISTINVENTORIES,
                payload:response,
            }
        )

    }
    
}




