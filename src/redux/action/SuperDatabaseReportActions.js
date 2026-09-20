import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SuperDatabaseReportActions = (page,limit,search,fdate,tdate) =>{
return async function (dispatch,getState){
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const response = await axios(`${actionConfig.REACT_APP_URL}listsuperdatabasesreportings?orderBy=id&orderType=desc&page=${page}&perPage=${limit}&q=${search}&fdate=${fdate}&tdate=${tdate}`,{cancelToken: source.token}).then((res)=>{
return res.data;
}).catch((thrown) => {
return thrown;
});

// const response = await fetch(`${actionConfig.REACT_APP_URL}${newCond}`);
// const dataxs = await response.json();
// const GetArray = dataxs.data;
dispatch(
{
    type:actionType.SUPERDATABASEACTIONS,
    payload:response,
}
)

}
}
