import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductBarcodeUIContext = createContext();

export function useProductBarcodeUIContext() {
  return useContext(ProductBarcodeUIContext);
}

export const ProductBarcodeUIConsumer = ProductBarcodeUIContext.Consumer;

export function ProductBarcodeUIProvider({UIEvents, children }) {
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
    <ProductBarcodeUIConsumer.Provider value={value}>
      {children}
    </ProductBarcodeUIConsumer.Provider>
  );
}
