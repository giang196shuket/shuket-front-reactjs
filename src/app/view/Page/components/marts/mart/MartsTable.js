import { checkAcceptUrl } from "../../../common/funtion";
import {
  ActionsColumnFormatter,
  BootstrapTable,
  NoRecordsFoundMessage,
  Pagination,
  PaginationProvider,
  PleaseWaitMessage,
  StatusColumnFormatter,
  defaultSorted,
  getHandlerTableChange,
  getSelectRow,
  getMoaMartList,
  paginationFactory,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  useDispatch,
  useEffect,
  useLang,
  useMartsUIContext,
  useMemo,
  useSelector,
} from "./index";

export function MartsTable({isLoading}) {
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
  const { total, entities } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    martsUIProps.setIds([]);
    dispatch(getMoaMartList(martsUIProps.queryParams));
  }, [ martsUIProps.queryParams]);

  const columns = [
    {
      text: "IMAGE",
      sort: true,
      style: {
        width: "300px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <img style={{ width: "60%" }} src={row.logo_url} alt="" />
      ),
    },
    {
      dataField: "mart_code",
      text: "Code",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "mart_name",
      text: "Name",
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
      text: "Mart Type",
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
      Showing {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    custom: true,
    totalSize: total,
    sizePerPageList: sizePerPageList,
    limit: martsUIProps.queryParams.limit,
    page: martsUIProps.queryParams.page,
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
                keyField="mart_seq"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(
                  martsUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: martsUIProps.ids,
                //   setIds: martsUIProps.setIds,
                // })}
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
