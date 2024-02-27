import {
  ActionsColumnFormatter,
  BootstrapTable,
  NoRecordsFoundMessage,
  Pagination,
  PaginationProvider,
  PleaseWaitMessage,
  defaultSorted,
  getNoticeAppList,
  getHandlerTableChange,
  getSelectRow,
  injectIntl,
  paginationFactory,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  useDispatch,
  useEffect,
  useNoticeAppUIContext,
  useMemo,
  useSelector,
} from "./index";
function NoticeAppTable(props) {
  const UIContext = useNoticeAppUIContext();

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
    (state) => ({ currentState: state.notice }),
    shallowEqual
  );

  const { entitiesApp, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getNoticeAppList(UIProps.queryParams));
  }, [dispatch, UIProps.queryParams]);

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
      text: "Image",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      style: {
        width: "100px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
         <img alt="" src={row.image} style={{width:'100%'}} />
        </div>
      ),
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      text: "Notice time",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p> from {row.startDate} {row.startHour}:{row.startMinus}:00 to {row.endDate} {row.endHour}:{row.endMinus}</p>
        </div>
      ),
    },
    {
      dataField: "targetScreenUrl",
      text: "Target screen /Url",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "targetMart",
      text: "Target mart",
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
        columnName: "NoticeApp_code",
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
    totalSize: entitiesApp.length,
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
                data={entitiesApp === null ? [] : entitiesApp}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(UIProps.setQueryParams)}
                selectRow={getSelectRow({
                  entities: entitiesApp,
                  ids: UIProps.ids,
                  setIds: UIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entitiesApp} />
                <NoRecordsFoundMessage entities={entitiesApp} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}

export default injectIntl(NoticeAppTable);
