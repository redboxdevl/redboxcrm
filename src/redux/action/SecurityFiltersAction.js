import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const SecurityFiltersAction = (SerialNoStart,SerialNoEnd,EntryDateFrom,EntryDateTo,ReleaseDateFrom,ReleaseDateTo,DocTypeFrom,DocTypeTo,DocNatureFrom,DocNatureTo,PropTypeFrom,PropTypeTo,CompaniesStartId,CompaniesEndId) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}securityfilters?SerialNoStart=${SerialNoStart}&SerialNoEnd=${SerialNoEnd}&EntryDateFrom=${EntryDateFrom}&EntryDateTo=${EntryDateTo}&ReleaseDateFrom=${ReleaseDateFrom}&ReleaseDateTo=${ReleaseDateTo}&DocTypeFrom=${DocTypeFrom}&DocTypeTo=${DocTypeTo}&DocNatureFrom=${DocNatureFrom}&DocNatureTo=${DocNatureTo}&PropTypeFrom=${PropTypeFrom}&PropTypeTo=${PropTypeTo}&CompaniesStartId=${CompaniesStartId}&CompaniesEndId=${CompaniesEndId}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.SECURITYFILTERSACTION,
                payload:response,
            }
        )

    }
}