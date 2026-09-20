import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const DimensionLevel3Action = (page,limit,Level1Id,Level2Id) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}dimensionlevel3?Level1Id=${Level1Id}&Level2Id=${Level2Id}&orderby=id&ordertype=asc&page=${page}&perpage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.DIMENSIONLEVEL3,
                payload:response,
            }
        )

    }
    
}
