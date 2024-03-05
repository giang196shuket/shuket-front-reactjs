import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ProductRegisterUIContext = createContext();

export function useProductRegisterUIContext() {
  return useContext(ProductRegisterUIContext);
}

export const ProductRegisterUIConsumer = ProductRegisterUIContext.Consumer;

export function ProductRegisterUIProvider({UIEvents, children }) {
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
    openEditMaxMin:  UIEvents.openEditMaxMin,
    openEditStock: UIEvents.openEditStock,
    openEditCate: UIEvents.openEditCate,

  };

  return (
    <ProductRegisterUIContext.Provider value={value}>
      {children}
    </ProductRegisterUIContext.Provider>
  );
}
