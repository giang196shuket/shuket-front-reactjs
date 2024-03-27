import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductPriceTable, injectIntl, shallowEqual, useMemo, useProductPriceUIContext, useSelector } from './index'
import { ProductPriceFilter } from './productPriceFilter';
import { ProductPriceGrouping } from './productPriceGrouping';

function ProductPriceCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const {  isLoading } = currentState;

  const UIContext = useProductPriceUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEdit: UIContext.openEdit,
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
            className="btn btn-primary mr-3"
            onClick={UIProps.openEditStock}
          >
           Setting stock
          </button>
      
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <ProductPriceFilter isLoading={isLoading}/>
        {UIProps.ids.length > 0 && (
          <>
            <ProductPriceGrouping />
          </>
        )} 
        <ProductPriceTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductPriceCard);
