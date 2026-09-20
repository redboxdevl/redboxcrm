import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const HrEmployeesAction = (agentId,page,limit,search,company_id) =>{

    return async function(dispatch,getState){
        // if(agentId == 'all'){ var cond = `?agentId=all&`; }else{ var cond = `?agentId=${agentId}&` }
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}employee?agentId=${agentId}&q=${search}&company_id=${company_id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.HREMPLOYEESACTION,
                payload:response,
            }
        )

    }
    
}
