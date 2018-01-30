/**
 * @FP --- Composition
 * This function calls the given functions in order with the given arguments.
 * There is no return value.
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
 *
 * rightPick picks only keys that are present in the object
 * leftPick picks all the given keys and sets their value to undefined if not found in the object 
 */
const rightPick = function (...pickedKeys) {
  return function (object) {
    return Object.keys(object).filter(key => pickedKeys.includes(key))
      .reduce((acc, curr) => {
        acc[curr] = object[curr];
        return acc;
      }, {});
  };
};

const leftPick = function (...pickedKeys) {
  return function (object) {
    return pickedKeys.reduce((acc, curr) => {
      acc[curr] = object[curr];
      return acc;
    }, {});
  };
};

function compareArrayOfTuples(anArray, anotherArray) { 
  if (anArray.some(key => !(key in anotherArray) || anArray[key] !== anotherArray[key])) {
    return false;
  }
  if (anotherArray.some(key => !(key in anArray))) {
    return false;
  }
  return true;
}

function compareTwoObjects(aObject, anotherObject) {
  return compareArrayOfTuples(Object.keys(aObject), Object.keys(anotherObject));
}

// Assuming the invariant that both objects have those keys
function equalityOnKeys(...keysToCompare) {
  return function (aObject, anotherObject) {
    return keysToCompare.every(key => aObject[key] === anotherObject[key]);
  };
}

export { join, leftPick, rightPick, equalityOnKeys, compareArrayOfTuples, compareTwoObjects };
export default join;
