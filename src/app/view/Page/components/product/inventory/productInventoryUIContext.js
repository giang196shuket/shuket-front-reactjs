import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductInventoryUIContext = createContext();

export function useProductInventoryUIContext() {
  return useContext(ProductInventoryUIContext);
}

export const ProductInventoryUIConsumer = ProductInventoryUIContext.Consumer;

export function ProductInventoryUIProvider({UIEvents, children }) {
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
    openEditStock: UIEvents.openEditStock,
  };

  return (
    <ProductInventoryUIContext.Provider value={value}>
      {children}
    </ProductInventoryUIContext.Provider>
  );
}
