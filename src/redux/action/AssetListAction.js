import { actionType } from "../types/types"
import { actionConfig } from "../../configuration";
import axios from 'axios';

export const AssetListAction = (agentId,page,limit,AssetType,CompanyId,DepartementId,PurchaseDate,AssetBookValue,Status,AssetLocationId,SalesConsul,company_id) =>{

    return async function(dispatch,getState){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}assetregister?agentId=${agentId}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}&AssetType=${AssetType}&CompanyId=${CompanyId}&DepartementId=${DepartementId}&PurchaseDate=${PurchaseDate}&AssetBookValue=${AssetBookValue}&Status=${Status}&AssetLocationId=${AssetLocationId}&SalesConsul=${SalesConsul}&company_id=${company_id}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });

        dispatch(
            {
                type:actionType.ASSETLISTACTION,
                payload:response,
            }
        )

    }
    
}
