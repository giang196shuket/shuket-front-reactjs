import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState }  from './index'

const MartsUIContext = createContext();

export function useMartsUIContext() {
  return useContext(MartsUIContext);
}

export const MartsUIConsumer = MartsUIContext.Consumer;

export function MartsUIProvider({ martsUIEvents, children }) {
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
    openAdd: martsUIEvents.openAdd,
    openEdit: martsUIEvents.openEdit,
    openDelete: martsUIEvents.openDelete,
    //openDeleteProductsDialog: productsUIEvents.openDeleteProductsDialog,
    //openFetchProductsDialog: productsUIEvents.openFetchProductsDialog,
    //openUpdateProductsStatusDialog:productsUIEvents.openUpdateProductsStatusDialog,
  };

  return (
    <MartsUIContext.Provider value={value}>
      {children}
    </MartsUIContext.Provider>
  );
}
