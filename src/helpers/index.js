/**
 * @FP --- Composition
 * This function allows the execution a set of functions with the same given arguments in serial.
 */
const join = function (...functions) {
  return function (...args) {
    for (let i = 0; i < functions.length; i += 1) {
      functions[i](...args);
    }
  };
};

/**
 * @MISC - This function allows to extract specific properties from an object into a new object.
 * While ES7 let's us extract arguments, I wanted a shorter way of extracting them into a new object and 
 * to use variables as keys.
 */
const pick = function (...pickedKeys) {
  return function (object) {
    return Object.keys(object).filter(key => pickedKeys.includes(key))
      .reduce((acc, curr) => {
        acc[curr] = object.curr;
        return acc;
      }, {});
  };
};

export { join, pick };
export default join;
