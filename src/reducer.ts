/// <reference path="./index.d.ts" />
import { assign } from "lodash";
import { Actions } from "./contants";
const Reducer = (
  state: Infrastructure.IState,
  action: Infrastructure.IAction
) => {
  const stateAddition: object = {};

  return assign({}, state, stateAddition);
};

export default Reducer;
