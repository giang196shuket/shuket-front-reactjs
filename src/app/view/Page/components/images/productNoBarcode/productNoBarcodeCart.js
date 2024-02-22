import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductNoBarcodeFilter, ProductNoBarcodeGrouping, ProductNoBarcodeTable, injectIntl, useProductNoBarcodeUIContext, useMemo } from './index'


function ProductNoBarcodeCard(props, history) {
  const { intl } = props;

  const UIContext = useProductNoBarcodeUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openAdd: UIContext.openAdd,
      openDelete: UIContext.openDelete,
      openEdit: UIContext.openEdit,

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
            New ProductNoBarcode
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductNoBarcodeFilter />
        {UIProps.ids.length > 0 && (
          <>
            <ProductNoBarcodeGrouping />
          </>
        )}
        <ProductNoBarcodeTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductNoBarcodeCard);
