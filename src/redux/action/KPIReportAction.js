import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const KPIReportAction = (agentId,ReportType,SalesConsul,EmpData,StartDates,EndDate,NoOfDays,companyId) =>{

    return async function(dispatch,getState){
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const response = await axios(`${actionConfig.REACT_APP_URL}kpireport?agentId=${agentId}&ReportType=${ReportType}&SalesConsul=${SalesConsul}&EmpData=${EmpData}&StartDates=${StartDates}&EndDate=${EndDate}&NoOfDays=${NoOfDays}&companyId=${companyId}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((error) => {
            return error;
         });
        dispatch(
            {
                type:actionType.KPIREPORTS,
                payload:response,
            }
        )

    }
    
}
