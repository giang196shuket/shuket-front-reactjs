import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const UserAccountUIContext = createContext();

export function useUserAccountUIContext() {
  return useContext(UserAccountUIContext);
}

export const UserAccountUIConsumer = UserAccountUIContext.Consumer;

export function UserAccountUIProvider({UIEvents, children }) {
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
    <UserAccountUIConsumer.Provider value={value}>
      {children}
    </UserAccountUIConsumer.Provider>
  );
}
