import { ActionsColumnFormatter, BootstrapTable, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, defaultSorted, getAddressList, getHandlerTableChange, getSelectRow, injectIntl, paginationFactory, shallowEqual, sizePerPageList, sortCaret, useAreaUIContext, useDispatch, useEffect, useMemo, useSelector } from './index'


function AreaTable(props) {
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

  const { currentState } = useSelector(
    (state) => ({ currentState: state.delivery }),
    shallowEqual
  );

  const { listArea: entities, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getAddressList(UIProps.queryParams));
  }, [UIProps.queryParams, dispatch ]);

  const columns = [
    {
      dataField: "seq",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "region_1depth_name",
      text: "PROVINCE",
      sort: true,
      sortCaret: sortCaret,
    },

    {
      dataField: "region_2depth_name",
      text: "CITY",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <>
          <p>{row.region_2depth_name}</p>
          <p>({row.zone_no})</p>
        </>
      ),
    },
    {
      dataField: "road_address_name",
      text: "ADDRESS",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <>
          <p>Road address : {row.road_address_name}</p>
          <p>Address : {row.address_name}</p>
        </>
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

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={isLoading}
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

export default injectIntl(AreaTable);
