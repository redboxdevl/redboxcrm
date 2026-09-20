import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const PayablebillsFilterAction = (Duedatefrom,Duedateto,Billingmonthfrom,Billingmonthto,Ballanceamountfrom,Ballanceamountto,Billnofrom,Billnoto) =>{
return async function (dispatch,getState){

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

    const response = await axios(`${actionConfig.REACT_APP_URL}payablebillsfilters?Duedatefrom=${Duedatefrom}&Duedateto=${Duedateto}&Billingmonthfrom=${Billingmonthfrom}&Billingmonthto=${Billingmonthto}&Ballanceamountfrom=${Ballanceamountfrom}&Ballanceamountto=${Ballanceamountto}&Billnofrom=${Billnofrom}&Billnoto=${Billnoto}`,{cancelToken: source.token}).then((res)=>{
    return res.data;
    }).catch((thrown) => {
    return thrown;
    });
dispatch(
    {
        type:actionType.PAYBALEBILLSFILTERACTION,
        payload:response,
    }
)

}
}