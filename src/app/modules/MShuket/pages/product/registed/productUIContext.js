import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductUIContext = createContext();

export function useProductUIContext() {
  return useContext(ProductUIContext);
}

export const ProductUIConsumer = ProductUIContext.Consumer;

export function ProductUIProvider({UIEvents, children }) {
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
    <ProductUIConsumer.Provider value={value}>
      {children}
    </ProductUIConsumer.Provider>
  );
}
