import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const LeadImportDataAction = (page,limit,search,ProjectN,StartDates,EndDate) =>{

    return async function(dispatch,getState){
        
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const response = await axios(`${actionConfig.REACT_APP_URL}leadimportreports?q=${search}&ProjectN=${ProjectN}&StartDates=${StartDates}&EndDate=${EndDate}&orderBy=created_at&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((error) => {
            return error;
         });
     
        dispatch(
            {
                type:actionType.LEADIMPORTDATAACTION,
                payload:response,
            }
        )

    }
    
}
