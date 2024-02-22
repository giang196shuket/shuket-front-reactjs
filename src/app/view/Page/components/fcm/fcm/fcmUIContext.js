import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const FcmUIContext = createContext();

export function useFcmUIContext() {
  return useContext(FcmUIContext);
}

export const FcmUIConsumer = FcmUIContext.Consumer;

export function FcmUIProvider({UIEvents, children }) {
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
    <FcmUIConsumer.Provider value={value}>
      {children}
    </FcmUIConsumer.Provider>
  );
}
