import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const PostDatedFilterAction = (RecievedDateFrom,RecievedDateTo,ChequeDateFrom,ChequeeDateTo,BankNameFrom,BankNameTo,PayeeTypeFrom,PayeeTypeTo,StatusFrom,StatusTo) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}postdatedchequefilters?RecievedDateFrom=${RecievedDateFrom}&RecievedDateTo=${RecievedDateTo}&ChequeDateFrom=${ChequeDateFrom}&ChequeeDateTo=${ChequeeDateTo}&BankNameFrom=${BankNameFrom}&BankNameTo=${BankNameTo}&PayeeTypeFrom=${PayeeTypeFrom}&PayeeTypeTo=${PayeeTypeTo}&StatusFrom=${StatusFrom}&StatusTo=${StatusTo}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.POSTDATEDCHEQUEFILTERSACTION,
                payload:response,
            }
        )

    }
}