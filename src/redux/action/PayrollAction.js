import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const PayrollAction = (page,limit,StartDates,EndDate) =>{

    return async function(dispatch,getState){
       
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}payroll?orderBy=id&orderType=asc&page=${page}&perPage=${limit}&StartDates=${StartDates}&EndDate=${EndDate}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        
        dispatch(
            {
                type:actionType.PAYROLL_ACTION,
                payload:response,
            }
        )

    }
    
}
