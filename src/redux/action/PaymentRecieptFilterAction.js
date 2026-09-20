import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const PaymentRecieptFilterAction = (DateOfRecieptFrom,DateOfRecieptTo,PropertyNoFrom,PropertyNoTo,ProjectFrom,ProjectTo,CompanyFrom,CompanyTo,PropertyTypeFrom,PropertyTypeTo) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}paymentrecieptfilters?DateOfRecieptFrom=${DateOfRecieptFrom}&DateOfRecieptTo=${DateOfRecieptTo}&PropertyNoFrom=${PropertyNoFrom}&PropertyNoTo=${PropertyNoTo}&ProjectFrom=${ProjectFrom}&ProjectTo=${ProjectTo}&CompanyFrom=${CompanyFrom}&CompanyTo=${CompanyTo}&PropertyTypeFrom=${PropertyTypeFrom}&PropertyTypeTo=${PropertyTypeTo}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.PAYMENTRECIEPTFILTERACTION,
                payload:response,
            }
        )

    }
}