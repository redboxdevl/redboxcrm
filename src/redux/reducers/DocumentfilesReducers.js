import { actionType } from "../types/types";

const documentfilesCountstate = {
  documentfiledata: [],
};
export const DocumentfilesReducers = (
  state = documentfilesCountstate,
  action
) => {
  switch (action.type) {
    case actionType.DOCUMENTFILESACTION:
      return {
        ...state, //old state data
        documentfiledata: action.payload, // updated state data
      };
    default:
      return state;
  }
};
