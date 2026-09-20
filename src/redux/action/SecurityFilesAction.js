import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SecurityFilesAction = (agentId,page,limit,dtype,ptype,dref,dstatus,Title,Description,IssuingAuthority,companyId) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}securityfiles?agentId=${agentId}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}&dtype=${dtype}&ptype=${ptype}&dref=${dref}&dstatus=${dstatus}&Title=${Title}&Description=${Description}&IssuingAuthority=${IssuingAuthority}&companyId=${companyId}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.SECURITYFILESACTION,
                payload:response,
            }
        )

    }
}