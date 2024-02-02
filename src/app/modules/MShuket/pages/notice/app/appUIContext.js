import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const NoticeAppUIContext = createContext();

export function useNoticeAppUIContext() {
  return useContext(NoticeAppUIContext);
}

export const NoticeAppUIConsumer = NoticeAppUIContext.Consumer;

export function NoticeAppUIProvider({UIEvents, children }) {
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
    <NoticeAppUIConsumer.Provider value={value}>
      {children}
    </NoticeAppUIConsumer.Provider>
  );
}
