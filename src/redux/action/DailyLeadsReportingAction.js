import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const DailyLeadsReportingAction = () =>{
    return async function (dispatch,getState){
      
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listdailyleadsreporting`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}${newCond}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.DAILYLEADSREPORTING,
                payload:response,
            }
        )

    }
}
