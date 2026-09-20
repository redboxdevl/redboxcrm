import { actionType } from "../types/types"

export const NoticeBoardAction = () =>{

    return async (dispatch,getState)=>{
        const response = await fetch(`https://api.publicapis.org/entries`);
        const dataxs = await response.json();
        const finalData = dataxs.entries;
        dispatch(
            {
                type:actionType.NOTICEBOARDACTION,
                payload:[...finalData],
            }
        )

    }
    
}
