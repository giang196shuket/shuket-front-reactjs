import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductTable, injectIntl, useMemo, useProductUIContext } from './index'

function ProductCard(props, history) {
  const { intl } = props;

  const UIContext = useProductUIContext();
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
            New Product
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <MartsFilter />
        {UIProps.ids.length > 0 && (
          <>
            <MartsGrouping />
          </>
        )} */}
        <ProductTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductCard);
