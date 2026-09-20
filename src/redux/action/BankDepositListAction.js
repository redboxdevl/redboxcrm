import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const BankDepositListAction = (agentId,page,limit,company_id) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}bankdeposits?agentId=${agentId}&company_id=${company_id}&orderby=id&ordertype=desc&page=${page}&perpage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.BANK_DEPOSITS_ACTION,
                payload:response,
            }
        )

    }
    
}
