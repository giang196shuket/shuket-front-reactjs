import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductRegisterTable, injectIntl, shallowEqual, useMemo, useProductRegisterUIContext, useSelector } from './index'
import { ProductRegisterFilter } from './productRegisterFilter';
import { ProductRegisterGrouping } from './productRegisterGrouping';

function ProductRegisterCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const {  isLoading } = currentState;

  const UIContext = useProductRegisterUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEditMaxMin:  UIContext.openEditMaxMin,
      openEditStock: UIContext.openEditStock,
      openEditCate: UIContext.openEditCate
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
            onClick={UIProps.openEditCate}
          >
           Setting category
          </button>
        <button
            type="button"
            className="btn btn-primary mr-3"
            onClick={UIProps.openEditStock}
          >
           Setting stock
          </button>
        <button
            type="button"
            className="btn btn-primary"
            onClick={UIProps.openEditMaxMin}
          >
           Setting max/min
          </button>

        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
      <ProductRegisterFilter isLoading={isLoading}/>
        {UIProps.ids.length > 0 && (
          <>
            <ProductRegisterGrouping />
          </>
        )} 
        <ProductRegisterTable />
      </CardBody>
    </Card>
  );
}

export default injectIntl(ProductRegisterCard);
