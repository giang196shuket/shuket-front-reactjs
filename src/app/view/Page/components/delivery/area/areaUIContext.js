import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const AreaUIContext = createContext();

export function useAreaUIContext() {
  return useContext(AreaUIContext);
}

export const AreaUIConsumer = AreaUIContext.Consumer;

export function AreaUIProvider({UIEvents, children }) {
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
    <AreaUIConsumer.Provider value={value}>
      {children}
    </AreaUIConsumer.Provider>
  );
}
