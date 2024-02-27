import { BootstrapTable, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, defaultSorted, getHandlerTableChange, getSelectRow, paginationFactory, searchAddressKakao, shallowEqual, sizePerPageList, sortCaret, useAreaUIContext, useDispatch, useEffect, useMemo, useSelector } from './index'


export default function AreaCartTable() {
    const UIContext = useAreaUIContext();
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

    const dispatch = useDispatch();

    const wordSearchKakao = useSelector(
      (state) => state.delivery.wordSearchKakao );
  

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(searchAddressKakao({ address_name: wordSearchKakao}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.delivery }),shallowEqual  );
   
    const { listAreaSearch : entities } = currentState;

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
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
  const columns = [
    {
      dataField: "ZONE_NO",
      text: "ZONE NO",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
  
    {
      dataField: "ADDRESS_NAME",
      text: "Address",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "ADDRESS_NAME2",
      text: "Road address",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
  ];

  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => {
        return (
          <Pagination
            //   isLoading={isLoading}
            paginationProps={paginationProps}
          >
            <BootstrapTable
              wrapperClasses="table-responsive"
              classes="table table-head-custom table-vertical-center"
              bootstrap4
              bordered={false}
              remote
              keyField="id"
              data={entities === null ? [] : entities}
              columns={columns}
              defaultSorted={defaultSorted}
              onTableChange={getHandlerTableChange(
                  UIProps.setQueryParams
              )}
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
  );
}
