'use strict';

/**
 * This function debounce the received function
 * @param { function } func	Function to be debounced
 * @param { number } delay Time to wait before execut the function
 * @param { boolean } immediate	Param to define if the function will be executed immediately
 */

const debounce = <T, A extends any[]>(
  func: (...arg: A) => void,
  delay: number,
  immediate: boolean,
) => {
  let timeout: NodeJS.Timeout | null = null;

  /* Debouce the function */
  function debouncedFunc(this: T, ...args: A) {
    /* Run func immediately for the first time
        and wait util timeout is over from second time
    */
    if (immediate && !timeout) {
      func.apply(this, args);
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }

    /* Run func util timeout is over */
    if (!immediate) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      if (!timeout) {
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      }
    }
  }

  /* Cancel timout */
  debouncedFunc.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debouncedFunc;
};

export default debounce;
