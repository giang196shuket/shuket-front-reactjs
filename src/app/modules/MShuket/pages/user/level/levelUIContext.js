import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const UserLevelUIContext = createContext();

export function useUserLevelUIContext() {
  return useContext(UserLevelUIContext);
}

export const UserLevelUIConsumer = UserLevelUIContext.Consumer;

export function UserLevelUIProvider({UIEvents, children }) {
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
    <UserLevelUIConsumer.Provider value={value}>
      {children}
    </UserLevelUIConsumer.Provider>
  );
}
