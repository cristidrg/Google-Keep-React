/**
 * @FP --- Composition
 * This function allows the execution of its arguments in serial.
 */
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
