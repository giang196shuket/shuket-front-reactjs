import { createContext, initialFilter, isEqual, isFunction, useCallback, useContext, useState } from './index'

const BannerCouponUIContext = createContext();

export function useBannerCouponUIContext() {
  return useContext(BannerCouponUIContext);
}

export const BannerCouponUIConsumer = BannerCouponUIContext.Consumer;

export function BannerCouponUIProvider({UIEvents, children }) {
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
    <BannerCouponUIConsumer.Provider value={value}>
      {children}
    </BannerCouponUIConsumer.Provider>
  );
}
