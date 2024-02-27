
import { ActionsColumnFormatter, BootstrapTable, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, StatusColumnFormatter, defaultSorted, getFcmList, getHandlerTableChange, getSelectRow, injectIntl, paginationFactory, shallowEqual, sizePerPageList, sortCaret, useDispatch, useEffect, useFcmUIContext, useMemo, useSelector } from './index'
function FcmTable(props) {
  const UIContext = useFcmUIContext();

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
    (state) => ({ currentState: state.fcm }),shallowEqual  );

  const { entities, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getFcmList());
  }, [dispatch, UIProps.queryParams]);

  const columns = [
    {
      dataField: "number_order",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "code",
      text: "FCM CODE",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },

    {
      dataField: "name",
      text: "FCM NAME",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },

    {
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
        openDelete: UIProps.openDelete,
        columnName: 'fcm_code'

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
    < >
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
                keyField="fcm_code"
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
    </>
  );
}

export default injectIntl(FcmTable);
