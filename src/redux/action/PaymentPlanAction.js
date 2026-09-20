import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const PaymentPlanAction = (page,limit) =>{

    return async function(dispatch,getState){
       
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}paymentplan?orderBy=id&orderType=asc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        
        dispatch(
            {
                type:actionType.PAYMENTPLANACTION,
                payload:response,
            }
        )

    }
    
}
