import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const PaymentVoucherAction = (page,limit,Amount,TransactionDate,CompanyId,Status,PayTo,PaymentType,company_id) =>{

    return async function(dispatch,getState){
       
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}paymentvoucher?orderBy=id&orderType=desc&page=${page}&perPage=${limit}&Amount=${Amount}&TransactionDate=${TransactionDate}&CompanyId=${CompanyId}&Status=${Status}&PayTo=${PayTo}&PaymentType=${PaymentType}&company_id=${company_id}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        
        dispatch(
            {
                type:actionType.PAYMENTVOUCHERACTION,
                payload:response,
            }
        )

    }
    
}
