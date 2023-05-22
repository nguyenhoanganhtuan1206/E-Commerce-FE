import { useCallback } from "react";

/*
 * This hook is used to display elements corresponding to capacityPage
 */

const usePaginate = () => {
  const paginate = useCallback((data = [], curPage = 1, capacityPage) => {
    const indexOfLastPost = curPage * capacityPage;
    const indexOfFirstPost = indexOfLastPost - capacityPage;
    const storage = data.slice(indexOfFirstPost, indexOfLastPost);

    return storage;
  }, []);

  return { paginate };
};

export default usePaginate;
