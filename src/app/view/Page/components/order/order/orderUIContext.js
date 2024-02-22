import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState }  from './index'

const OrderUIContext = createContext();

export function useOrderUIContext() {
  return useContext(OrderUIContext);
}

export const OrderUIConsumer = OrderUIContext.Consumer;

export function OrderUIProvider({ UIEvents, children }) {
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
    <OrderUIContext.Provider value={value}>
      {children}
    </OrderUIContext.Provider>
  );
}
