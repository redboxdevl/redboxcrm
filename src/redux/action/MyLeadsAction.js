import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const MyLeadsAction = (agentid,page,limit,search,teamObj,browserName,SalesConsul,ProjectN,SelfStatus) =>{

    return async function(dispatch,getState){
       
        if(agentid == 'all'){ var cond = `?agentid=all&teamObj=${teamObj}&browserName=${browserName}&SalesConsul=${SalesConsul}&ProjectN=${ProjectN}&SelfStatus=${SelfStatus}&`; }else{ var cond = `?agentid=${agentid}&browserName=${browserName}&SalesConsul=${SalesConsul}&ProjectN=${ProjectN}&SelfStatus=${SelfStatus}&` }

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listmyleads${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}&q=${search}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}listmyleads${cond}orderby=id&ordertype=desc&page=${page}&perpage=${limit}&q=${search}`);
        // const dataxs = await response.json();
        // const finalDataMy = dataxs.data;
        dispatch(
            {
                type:actionType.MYLEADS,
                payload:response,
            }
        )

    }
    
}
