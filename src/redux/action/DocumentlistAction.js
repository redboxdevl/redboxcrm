import axios from "axios";
import { actionConfig } from "../../configuration";
import { actionType } from "../types/types";

export const DocumentlistAction = (page, limit) => {
  return async function (dispatch, getState) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const response = await axios(
      `${actionConfig.REACT_APP_URL}documentlist?orderBy=id&orderType=desc&page=${page}&perPage=${limit}`,
      { cancelToken: source.token }
    )
      .then((res) => {
        return res.data;
      })
      .catch((thrown) => {
        return thrown;
      });
    dispatch({
      type: actionType.DOCUMENTFILESACTION,
      payload: response,
    });
  };
};
