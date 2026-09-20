import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const TalktimeAction = (agentId,datefrom,dateto,page,limit) =>{

    return async function(dispatch,getState){
       
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}talktimehistory?agentId=${agentId}&datefrom=${datefrom}&dateto=${dateto}&orderBy=datetime&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        
        dispatch(
            {
                type:actionType.TALKTIMEACTION,
                payload:response,
            }
        )

    }
    
}
