import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SingleAssignLeadsaction = (leadid) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}listassignleads?leadid=${leadid}`,{cancelToken: source.token}).then((res)=>{
            return res.data.data[0];
         }).catch((error) => {
            return error;
         });
        dispatch(
            {
                type:actionType.SINGLEASSIGNLEADSACTION,
                payload:response,
            }
        )

    }
}