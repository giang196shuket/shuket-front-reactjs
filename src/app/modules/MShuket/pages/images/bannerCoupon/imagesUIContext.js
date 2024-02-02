import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const ImagesUIContext = createContext();

export function useImagesUIContext() {
  return useContext(ImagesUIContext);
}

export const ImagesUIConsumer = ImagesUIContext.Consumer;

export function ImagesUIProvider({UIEvents, children }) {
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
    <ImagesUIConsumer.Provider value={value}>
      {children}
    </ImagesUIConsumer.Provider>
  );
}
