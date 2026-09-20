import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SuperDatabaseReportAction = (agentId,page,limit,search,ProjectN,LeadStatys,Status,ReminderStatus,StartDates,EndDate,SalesConsul,ReminderPriority,company_id) =>{
    return async function (dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listsuperdatabasereportings?agentId=${agentId}&search=${search}&ProjectN=${ProjectN}&LeadStatys=${LeadStatys}&Status=${Status}&ReminderStatus=${ReminderStatus}&StartDates=${StartDates}&EndDate=${EndDate}&SalesConsul=${SalesConsul}&ReminderPriority=${ReminderPriority}&company_id=${company_id}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}${newCond}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.SUPERDATABASEACTION,
                payload:response,
            }
        )

    }
}
