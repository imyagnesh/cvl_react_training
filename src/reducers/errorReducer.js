const errorReducer = (state, { type, payload = {} }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'FAIL') {
    return [...state, { actionName, ...payload }];
  }

  return state.filter(
    (x) => !(x.actionName === actionName && x.loadingId === payload.loadingId)
  );
};

export default errorReducer;
