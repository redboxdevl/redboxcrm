import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const ZongCallingDataAction = (id,page,limit,search,Type,Source,CommentStatus,Consultant,Project,SearchDate,empTeam,StartDates,EndDate,Status,company_id) =>{
    return async function (dispatch,getState){
        
        if(id == 'all'){ var newCond = `listzonecalling?` }else{ var newCond = `listzonecalling?ext=${id}&` }

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}${newCond}orderBy=id&orderType=desc&page=${page}&perPage=${limit}&q=${search}&Type=${Type}&Source=${Source}&CommentStatus=${CommentStatus}&Consultant=${Consultant}&Project=${Project}&SearchDate=${SearchDate}&empTeam=${empTeam}&StartDates=${StartDates}&EndDate=${EndDate}&Status=${Status}&company_id=${company_id}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        // const response = await fetch(`${actionConfig.REACT_APP_URL}${newCond}`);
        // const dataxs = await response.json();
        // const GetArray = dataxs.data;
        dispatch(
            {
                type:actionType.ZONGCALLINGDATAACTION,
                payload:response,
            }
        )

    }
}
