import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductBarcodeFilter, ProductBarcodeGrouping, ProductBarcodeTable, injectIntl, useProductBarcodeUIContext, useMemo } from './index'


function ProductBarcodeCard(props, history) {
  const { intl } = props;

  const UIContext = useProductBarcodeUIContext();
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
            New ProductBarcode
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductBarcodeFilter />
        {UIProps.ids.length > 0 && (
          <>
            <ProductBarcodeGrouping />
          </>
        )}
        <ProductBarcodeTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductBarcodeCard);
