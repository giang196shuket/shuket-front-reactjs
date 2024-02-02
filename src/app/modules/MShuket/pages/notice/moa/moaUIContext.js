import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const NoticeMoaUIContext = createContext();

export function useNoticeMoaUIContext() {
  return useContext(NoticeMoaUIContext);
}

export const NoticeMoaUIConsumer = NoticeMoaUIContext.Consumer;

export function NoticeMoaUIProvider({UIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    openAdd: UIEvents.openAdd,
    openEdit: UIEvents.openEdit,
    openDelete: UIEvents.openDelete,
  };

  return (
    <NoticeMoaUIConsumer.Provider value={value}>
      {children}
    </NoticeMoaUIConsumer.Provider>
  );
}
