import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const ComplainmanageAction = (agentId,deptId,page,limit) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}complainmanagement?agentId=${agentId}&deptId=${deptId}&orderby=id&ordertype=desc&page=${page}&perpage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.COMPLAINMANAGEMENTACTION,
                payload:response,
            }
        )

    }
    
}
