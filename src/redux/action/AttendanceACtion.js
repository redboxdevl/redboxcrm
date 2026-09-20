import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const AttendanceACtion = (agentId,page,limit) =>{
    return async function (dispatch,getState){

        if(agentId == 'all'){ var cond = `?agentId=all&`; }else{ var cond = `?agentId=${agentId}&` }
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}attendance${cond}orderBy=attendance_date&orderType=desc&page=${page}&perPage=${limit}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        // const response = await fetch(`${actionConfig.REACT_APP_URL}attendance?agentId=${agentId}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.ATTENDANCEACTION,
                payload:response,
            }
        )

    }
}