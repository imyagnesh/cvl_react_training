const loggerMiddleware = (store) => (next) => (action) => {
  //   console.log(action);

  const match = /(.*)_(REQUEST)/.exec(action.type);

  if (match) {
    // api call
    next({
      ...action,
      payload: { message: 'Message changed from middleware' },
    });
  } else {
    next(action);
  }
};

export default loggerMiddleware;
