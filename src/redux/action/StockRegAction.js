import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const StockRegAction = (agentId,page,limit,StockNatureId,ProjectId,StockTypeId) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}stockregister?agentId=${agentId}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}&StockNatureId=${StockNatureId}&ProjectId=${ProjectId}&StockTypeId=${StockTypeId}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.STOCKREGISTERACTION,
                payload:response,
            }
        )

    }
}