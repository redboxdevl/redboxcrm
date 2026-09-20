import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const PayrecieptsAction = (page,limit,ProjectId,CompanyId,PropertyNo,Reference,PropertyType,company_id) =>{

    return async function(dispatch,getState){
       
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}payreciepts?ProjectId=${ProjectId}&CompanyId=${CompanyId}&PropertyNo=${PropertyNo}&Reference=${Reference}&PropertyType=${PropertyType}&company_id=${company_id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        
        dispatch(
            {
                type:actionType.PAYRECIEPTSACTION,
                payload:response,
            }
        )

    }
    
}
