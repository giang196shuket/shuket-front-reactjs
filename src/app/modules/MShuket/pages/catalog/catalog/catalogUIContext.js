import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const CatalogUIContext = createContext();

export function useCatalogUIContext() {
  return useContext(CatalogUIContext);
}

export const CatalogUIConsumer = CatalogUIContext.Consumer;

export function CatalogUIProvider({UIEvents, children }) {
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
    <CatalogUIConsumer.Provider value={value}>
      {children}
    </CatalogUIConsumer.Provider>
  );
}
