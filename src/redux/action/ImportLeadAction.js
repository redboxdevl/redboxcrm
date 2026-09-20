import { actionConfig } from "../../configuration";
import { actionType } from "../types/types";

export const ImportLeadAction = (
  leadStatus,
  page,
  limit,
  ProjectFilter,
  agentId,
  company_id,
  StatusFilter
) => {
  return async function (dispatch, getState) {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}importleads?leadstatus=${leadStatus}&ProjectFilter=${ProjectFilter}&agentId=${agentId}&company_id=${company_id}&StatusFilter=${StatusFilter}&orderBy=id&orderType=desc&page=${page}&perPage=${limit}`
    );
    const dataxs = await response.json();
    const GetArray = dataxs;
    dispatch({
      type: actionType.IMPORTLEADSACTION,
      payload: GetArray,
    });
  };
};
