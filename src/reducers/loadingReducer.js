const loadingReducer = (state, { type, payload = {} }) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'REQUEST') {
    return [...state, { actionName, ...payload }];
  }

  return state.filter((x) => x.actionName !== actionName);
};

export default loadingReducer;
