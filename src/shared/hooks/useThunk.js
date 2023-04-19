import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useThunk = (thunk) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runThunk = useCallback(
    (args) => {
      setIsLoading(true);
      dispatch(thunk(args))
        .unwrap()
        .catch((error) => setError(error.data.message))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};

export default useThunk;