import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const ChequeOutwardAction = (page,limit,IssueDate,ChequeDate,ChequeNo,ChequeStatus,AccountNo,ChequeAmount,Title,company_id) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}chequeoutwardregister?orderBy=id&orderType=desc&page=${page}&perPage=${limit}&IssueDate=${IssueDate}&ChequeDate=${ChequeDate}&ChequeNo=${ChequeNo}&ChequeStatus=${ChequeStatus}&AccountNo=${AccountNo}&ChequeAmount=${ChequeAmount}&Title=${Title}&company_id=${company_id}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.CHEQUEOUTWARDLISTACTION,
                payload:response,
            }
        )

    }
    
}
