import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const CircularPolicyACtion = (page,limit,agentId,CircularCategory,subjectName,policyDate) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}circularpolicy?agentId=${agentId}&CircularCategory=${CircularCategory}&subjectName=${subjectName}&policyDate=${policyDate}&orderby=id&ordertype=desc&page=${page}&perpage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.CIRCULEPOLICY,
                payload:response,
            }
        )

    }
    
}
