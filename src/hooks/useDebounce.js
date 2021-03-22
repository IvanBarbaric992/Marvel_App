const { useEffect } = require("react");

//callback should be wrapped inside useCallback to avoid reference problems

const useDebounce = ({ callback, value, debounceDelay }) => {
  useEffect(() => {
    const debounce = setTimeout(() => {
      typeof callback === "function" && callback();
    }, debounceDelay);

    return () => {
      clearInterval(debounce);
    };
  }, [callback, value, debounceDelay]);
};

export default useDebounce;
