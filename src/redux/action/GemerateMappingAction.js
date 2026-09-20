import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const GemerateMappingAction = (page,limit) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}generatemapping?orderby=id&ordertype=asc&page=${page}&perpage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.GENERATEMAPPINGACTION,
                payload:response,
            }
        )

    }
    
}
