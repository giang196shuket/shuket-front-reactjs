import {
  generateCSVName,
  ExportCSV,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  MartsFilter,
  MartsGrouping,
  MartsTable,
  injectIntl,
  shallowEqual,
  useMartsUIContext,
  useMemo,
  useSelector,
} from "./index";

function MartsCard(props, history) {
  const { intl } = props;

  const { currentState } = useSelector(
    (state) => ({ currentState: state.marts }),
    shallowEqual
  );
  const { totalCount, entities, isLoading } = currentState;

  const martsUIContext = useMartsUIContext();
  const martsUIProps = useMemo(() => {
    return {
      ids: martsUIContext.ids,
      queryParams: martsUIContext.queryParams,
      setQueryParams: martsUIContext.setQueryParams,
      openAdd: martsUIContext.openAdd,
      openDelete: martsUIContext.openDelete,
      openEdit: martsUIContext.openEdit,
      //openUpdateProductsStatusDialog:productsUIContext.openUpdateProductsStatusDialog,
      //openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
    };
  }, [martsUIContext]);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage(
          {
            id: `MART.LIST`,
          },
          { length: 10 }
        )}
      >
        <CardHeaderToolbar>
          <ExportCSV
            csvData={entities}
            fileName={generateCSVName("mart")}
            UIProps={martsUIProps}
          ></ExportCSV>

          <button
            type="button"
            className="btn btn-primary"
            onClick={martsUIProps.openAdd}
          >
            New Mart
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MartsFilter isLoading={isLoading}/>
        {martsUIProps.ids.length > 0 && (
          <>
            <MartsGrouping />
          </>
        )}
        <MartsTable isLoading={isLoading}/>
      </CardBody>
    </Card>
  );
}

export default injectIntl(MartsCard);
