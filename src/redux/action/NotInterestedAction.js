import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"
import axios from 'axios';

export const NotInterestedAction = (agentid,page,limit,teamObj,SalesConsul) =>{
    return async function (dispatch,getState){
       
        if(agentid == 'all'){ var cond = `?agentId=all&teamObj=${teamObj}&SalesConsul=${SalesConsul}&`; }else{ var cond = `?agentId=${agentid}&SalesConsul=${SalesConsul}&` }
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listnotinterestedleads${cond}orderBy=created_at&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}listnotinterestedleads?agentid=${agentid}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        // const FinalArray = GetArray.data;
        dispatch(
            {
                type:actionType.NOTINTERESTEDLEADS,
                payload:response,
            }
        )

    }
}




