const join = function () {
  const functions = arguments;
  return function () {
    for (let i = 0; i < functions.length; i += 1) {
      functions[i](...arguments);
    }
  };
};

export { join };
export default join;
