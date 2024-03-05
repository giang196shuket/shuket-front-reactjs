import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductUnregisterUIContext = createContext();

export function useProductUnregisterUIContext() {
  return useContext(ProductUnregisterUIContext);
}

export const ProductUnregisterUIConsumer = ProductUnregisterUIContext.Consumer;

export function ProductUnregisterUIProvider({UIEvents, children }) {
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
    openEdit: UIEvents.openEdit,

  };

  return (
    <ProductUnregisterUIContext.Provider value={value}>
      {children}
    </ProductUnregisterUIContext.Provider>
  );
}
