import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const StockFiltersAction = (StockInDateStart,StockInDateEnd,ProjectsFrom,ProjectsTo,StockNatureFrom,StockNatureTo,RecivedByFrom,RecievedByTo) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}stockfilters?StockInDateStart=${StockInDateStart}&StockInDateEnd=${StockInDateEnd}&ProjectsFrom=${ProjectsFrom}&ProjectsTo=${ProjectsTo}&StockNatureFrom=${StockNatureFrom}&StockNatureTo=${StockNatureTo}&RecivedByFrom=${RecivedByFrom}&RecievedByTo=${RecievedByTo}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.STOCKFILTERSACTION,
                payload:response,
            }
        )

    }
}