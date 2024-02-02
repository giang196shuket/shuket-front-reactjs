
import { ActionsColumnFormatter, BootstrapTable, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, StatusColumnFormatter, defaultSorted, getHandlerTableChange, getSelectRow, moaSearchList, paginationFactory, shallowEqual, sizePerPageList, sortCaret, useDispatch, useEffect, useLang, useMartsUIContext, useMemo, useSelector }  from './index'

export function MartsTable() {
  const lang = useLang();
  const martsUIContext = useMartsUIContext();

  const martsUIProps = useMemo(() => {
    return {
      ids: martsUIContext.ids,
      setIds: martsUIContext.setIds,
      queryParams: martsUIContext.queryParams,
      setQueryParams: martsUIContext.setQueryParams,
      openEdit: martsUIContext.openEdit,
      openDelete: martsUIContext.openDelete,
    };
  }, [martsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.marts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    martsUIProps.setIds([]);
    dispatch(moaSearchList(martsUIProps.queryParams));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [martsUIProps.queryParams, dispatch]);


  const columns = [
    {
      dataField: "mart_code",
      text: "Mart Code",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "mart_name",
      text: "Mart Name",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          {row.mart_name}
          <br />
          {row.mart_code}
        </div>
      ),
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField:
        lang && lang === "en" ? "mart_type_name_en" : "mart_type_name_ko",
      text: "Mart Type Name",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "150px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>{row.mart_type_name.en}</div>
      ),
    },

    {
      dataField: "pos_regcode",
      text: "POSCODE",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          {row.pos_regcode}/{row.mart_code}
        </div>
      ),
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: StatusColumnFormatter,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: martsUIProps.openEdit,
        openDelete: martsUIProps.openDelete,
        columnName: "mart_seq",
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
      Showing  {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: sizePerPageList,
    sizePerPage: martsUIProps.queryParams.sizePerPage,
    page: martsUIProps.queryParams.page,
    paginationTotalRenderer: customTotal,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField="mart_seq"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(
                  martsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: martsUIProps.ids,
                  setIds: martsUIProps.setIds,
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
