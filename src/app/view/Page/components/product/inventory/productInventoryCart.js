import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductInventoryTable, injectIntl, shallowEqual, useMemo, useProductInventoryUIContext, useSelector } from './index'
import { ProductInventoryFilter } from './productInventoryFilter';
import { ProductInventoryGrouping } from './productInventoryGrouping';

function ProductInventoryCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const {  isLoading } = currentState;

  const UIContext = useProductInventoryUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEditStock: UIContext.openEditStock,
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
            className="btn btn-primary mr-3"
            onClick={UIProps.openEditStock}
          >
           Setting stock
          </button>
      
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <ProductInventoryFilter isLoading={isLoading}/>
        {UIProps.ids.length > 0 && (
          <>
            <ProductInventoryGrouping />
          </>
        )} 
        <ProductInventoryTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductInventoryCard);
