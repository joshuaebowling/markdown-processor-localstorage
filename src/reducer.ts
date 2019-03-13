/// <reference path="./index.d.ts" />
import { assign } from "lodash";
import { Actions, InitialState } from "./constants";

const reducer = (
  state: Infrastructure.IState,
  action: Infrastructure.IAction
) => {
  const stateAddition: object = {};
  switch (action.type) {
    case Actions.ADD_OPEN_DOCUMENT_RQ:
      break;
    case Actions.REMOVE_OPEN_DOCUMENT_RQ:
      break;
    case Actions.OPEN_DOCUMENTS_CHANGED_RS:
      break;
  }
  return assign({}, state, stateAddition);
};

export default reducer;
