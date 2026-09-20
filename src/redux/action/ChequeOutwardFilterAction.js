import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ChequeOutwardFilterAction = (IssueDateFrom,IssueDateTo,ChequeDateFrom,ChequeeDateTo,AccountNoFrom,AccountNoTo,ChequeNoFrom,ChequeNoTo,StatusFrom,StatusTo) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}chequeoutwardfilters?IssueDateFrom=${IssueDateFrom}&IssueDateTo=${IssueDateTo}&ChequeDateFrom=${ChequeDateFrom}&ChequeeDateTo=${ChequeeDateTo}&AccountNoFrom=${AccountNoFrom}&AccountNoTo=${AccountNoTo}&ChequeNoFrom=${ChequeNoFrom}&ChequeNoTo=${ChequeNoTo}&StatusFrom=${StatusFrom}&StatusTo=${StatusTo}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.CHEQUEOUTWARDFILTERSACTION,
                payload:response,
            }
        )

    }
}