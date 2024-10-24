import React, { useCallback, useState } from "react";

function useBoolean(defaultState) {
  const [value, setValue] = useState(!!defaultState);
  const onTrue = useCallback(() => {
    setValue(true);
  }, []);
  const onFalse = useCallback(() => {
    setValue(false);
  }, []);
  return {
    value,
    setValue,
    onTrue,
    onFalse,
  };
}

export default useBoolean;
