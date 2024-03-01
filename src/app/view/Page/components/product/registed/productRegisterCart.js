import { Card, CardBody, CardHeader, CardHeaderToolbar, ProductRegisterTable, injectIntl, shallowEqual, useMemo, useProductRegisterUIContext, useSelector } from './index'
import { ProductRegisterFilter } from './productRegisterFilter';
import { ProductRegisterGrouping } from './productRegisterGrouping';

function ProductRegisterCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const { totalCount, entities, isLoading } = currentState;

  const UIContext = useProductRegisterUIContext();
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
