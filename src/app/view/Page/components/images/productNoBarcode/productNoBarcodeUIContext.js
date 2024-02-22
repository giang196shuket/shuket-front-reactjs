import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductNoBarcodeUIContext = createContext();

export function useProductNoBarcodeUIContext() {
  return useContext(ProductNoBarcodeUIContext);
}

export const ProductNoBarcodeUIConsumer = ProductNoBarcodeUIContext.Consumer;

export function ProductNoBarcodeUIProvider({UIEvents, children }) {
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
    <ProductNoBarcodeUIConsumer.Provider value={value}>
      {children}
    </ProductNoBarcodeUIConsumer.Provider>
  );
}
