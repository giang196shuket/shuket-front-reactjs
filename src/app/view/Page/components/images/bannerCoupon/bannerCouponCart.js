import { Card, CardBody, CardHeader, CardHeaderToolbar, BannerCouponFilter, BannerCouponGrouping, BannerCouponTable, injectIntl, useBannerCouponUIContext, useMemo } from './index'


function BannerCouponCard(props, history) {
  const { intl } = props;

  const UIContext = useBannerCouponUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openAdd: UIContext.openAdd,
      openDelete: UIContext.openDelete,

    };
  }, [UIContext]);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          id: `MART.LIST`
        },{ length: 10})}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={UIProps.openAdd}
          >
            New BannerCoupon
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BannerCouponFilter />
        {UIProps.ids.length > 0 && (
          <>
            <BannerCouponGrouping />
          </>
        )}
        <BannerCouponTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(BannerCouponCard);
