import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types"

export const FixedAssetFiltersAction = (AssetTypeFrom,AssetTypeTo,PurchasedDateFrom,PurchasedDateTo,DepartmentIdFrom,DepartmentIdTo,CompanyIdFrom,CompanyIdTo,AssetBookValueFrom,AssetBookValueTo) =>{
    return async function (dispatch,getState){

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
         const response = await axios(`${actionConfig.REACT_APP_URL}assetregisterfilters?AssetTypeFrom=${AssetTypeFrom}&AssetTypeTo=${AssetTypeTo}&PurchasedDateFrom=${PurchasedDateFrom}&PurchasedDateTo=${PurchasedDateTo}&DepartmentIdFrom=${DepartmentIdFrom}&DepartmentIdTo=${DepartmentIdTo}&CompanyIdFrom=${CompanyIdFrom}&CompanyIdTo=${CompanyIdTo}&AssetBookValueFrom=${AssetBookValueFrom}&AssetBookValueTo=${AssetBookValueTo}`,{cancelToken: source.token}).then((res)=>{
            return res.data;
         }).catch((thrown) => {
            return thrown;
         });
        dispatch(
            {
                type:actionType.FIXEDASSETFILTERSACTION,
                payload:response,
            }
        )

    }
}