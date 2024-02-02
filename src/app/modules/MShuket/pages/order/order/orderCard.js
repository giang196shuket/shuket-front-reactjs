
import {generateCSVName,ExportCSVGroup, Card, CardBody, CardHeader, CardHeaderToolbar, OrderFilter, OrderGrouping, OrderTable, injectIntl, shallowEqual, useOrderUIContext, useMemo, useSelector }  from './index'

function OrderCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.order }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const UIContext = useOrderUIContext();
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
          <ExportCSVGroup csvData={entities} fileName={generateCSVName('order')}  UIProps={UIProps}></ExportCSVGroup>
    
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrderFilter />
        {UIProps.ids.length > 0 && (
          <>
            <OrderGrouping />
          </>
        )}
        <OrderTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(OrderCard);
