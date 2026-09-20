import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const PaymentVoucherReportAction = (DateOfTransactionFrom,DateOfTransactionTo,VoucherDateFrom,VoucherDateTo,AmountFrom,AmountTo,PaymentTypeFrom,PaymentTypeTo,CompanyFrom,CompanyTo,PayToFrom,PayToTo) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}paymentvoucherfilters?DateOfTransactionFrom=${DateOfTransactionFrom}&DateOfTransactionTo=${DateOfTransactionTo}&VoucherDateFrom=${VoucherDateFrom}&VoucherDateTo=${VoucherDateTo}&AmountFrom=${AmountFrom}&AmountTo=${AmountTo}&PaymentTypeFrom=${PaymentTypeFrom}&PaymentTypeTo=${PaymentTypeTo}&CompanyFrom=${CompanyFrom}&CompanyTo=${CompanyTo}&PayToFrom=${PayToFrom}&PayToTo=${PayToTo}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.PAYMENTVOUCHERFILTERACTION,
                payload:response,
            }
        )

    }
}