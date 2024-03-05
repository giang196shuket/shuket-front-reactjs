import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductPriceUIContext = createContext();

export function useProductPriceUIContext() {
  return useContext(ProductPriceUIContext);
}

export const ProductPriceUIConsumer = ProductPriceUIContext.Consumer;

export function ProductPriceUIProvider({UIEvents, children }) {
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
    openDelete: UIEvents.openDelete,

  };

  return (
    <ProductPriceUIContext.Provider value={value}>
      {children}
    </ProductPriceUIContext.Provider>
  );
}
