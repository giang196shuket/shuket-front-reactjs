import {
  ActionsColumnFormatter,
  BootstrapTable,
  NoRecordsFoundMessage,
  Pagination,
  PaginationProvider,
  PleaseWaitMessage,
  defaultSorted,
  getHandlerTableChange,
  getListImagesWithBarcode,
  getSelectRow,
  injectIntl,
  paginationFactory,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  useDispatch,
  useEffect,
  useProductBarcodeUIContext,
  useMemo,
  useSelector,
  SwitchesCustom,
} from "./index";

function ProductBarcodeTable(props) {
  const UIContext = useProductBarcodeUIContext();

  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEdit: UIContext.openEdit,
      openDelete: UIContext.openDelete,
    };
  }, [UIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.images }),
    shallowEqual
  );

  const { productBarcodeImage: entities, isLoading } = currentState;
  const dispatch = useDispatch();
  console.log('UIProps.queryParams', UIProps.queryParams)
  useEffect(() => {
    UIProps.setIds([]);
    dispatch(
      getListImagesWithBarcode(UIProps.queryParams)
    );
  }, [dispatch, UIProps.queryParams]);

  const columns = [
    {
      dataField: "id",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      text: "IMAGE",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "150px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <img style={{ width: "100%" }} src={row.arrImage.image_uri} alt="" />
      ),
    },

    {
      text: "IMAGE INFO",
      sort: true,
      sortCaret: sortCaret,
      classes: "pr-0",
      headerClasses: " pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>tags: {row.tags}</p>
          <p>code: {row.code}</p>
          <p>image name: {row.name}</p>
        </div>
      ),
    },
    {
      dataField: "c_time",
      text: "LOGS INFO",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{new Date(row.createdTime).toLocaleString()}</p>
          <p>------------------------------</p>
          <p>{new Date(row.modifiedTime).toLocaleString()}</p>
        </div>
      ),
    },
    {
      dataField: "c_time",
      text: "STATUS",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <SwitchesCustom status={row.status === 'A' ? true : false} code={row.code}></SwitchesCustom>
        </div>
      ),
    },

    {
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
        openDelete: UIProps.openDelete,
        columnName: "fcm_code",
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      ShowingA {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    custom: true,
    totalSize: entities.length,
    sizePerPageList: sizePerPageList,
    limit: UIProps.queryParams.limit,
    page: UIProps.queryParams.page,
    paginationTotalRenderer: customTotal,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={isLoading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField="fcm_code"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(UIProps.setQueryParams)}
                selectRow={getSelectRow({
                  entities,
                  ids: UIProps.ids,
                  setIds: UIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default injectIntl(ProductBarcodeTable);
