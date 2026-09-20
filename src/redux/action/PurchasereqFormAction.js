import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const PurchasereqFormAction = (agentId,deptId,TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,page,limit,company_id) =>{

    return async function(dispatch,getState){
       
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}purchasereqform?agentId=${agentId}&deptId=${deptId}&TypeId=${TypeId}&DepartmentId=${DepartmentId}&Status=${Status}&User=${User}&TotalCost=${TotalCost}&DisbursedAmt=${DisbursedAmt}&company_id=${company_id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        
        dispatch(
            {
                type:actionType.PURCHASEREQFORM,
                payload:response,
            }
        )

    }
    
}
