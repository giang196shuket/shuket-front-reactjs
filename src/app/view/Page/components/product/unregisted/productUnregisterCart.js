import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductUnregisterTable, injectIntl, shallowEqual, useMemo, useProductUnregisterUIContext, useSelector } from './index'
import { ProductUnregisterFilter } from './productUnregisterFilter';
import { ProductUnregisterGrouping } from './productUnregisterGrouping';

function ProductUnregisterCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const {  isLoading } = currentState;

  const UIContext = useProductUnregisterUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEdit: UIContext.openEdit
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
   

        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <ProductUnregisterFilter isLoading={isLoading}/>
        {UIProps.ids.length > 0 && (
          <>
            <ProductUnregisterGrouping />
          </>
        )} 
        <ProductUnregisterTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductUnregisterCard);
