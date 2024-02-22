import { formatPrice } from "../../../common/funtion";
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
  getOrderList,
  paginationFactory,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  useDispatch,
  useEffect,
  useLang,
  useOrderUIContext,
  useMemo,
  useSelector,
} from "./index";

export function OrderTable() {
  const lang = useLang();
  const UIContext = useOrderUIContext();

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
    (state) => ({ currentState: state.order }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getOrderList(UIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "id",
      text: "STT",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "orderCode",
      text: "Order code",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => <div>{row.orderCode}</div>,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderDate",
      text: "Order date",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>{new Date(row.orderDate).toLocaleString()}</div>
      ),
    },

    {
      dataField: "orderCustomer",
      text: "Order By",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderGoodCNT",
      text: "Quantity product",
      sort: true,
      sortCaret: sortCaret,

      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderTotalPrice",
      text: "Product Price",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <b style={{ color: "red" }}>{formatPrice(row.orderTotalPrice)}</b>
        </div>
      ),
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderShipping",
      text: "Delivery charge",
      sort: true,
      sortCaret: sortCaret,

      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "deliveryText1",
      text: "Delivery",
      sort: true,
      sortCaret: sortCaret,

      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderCoupon",
      text: "Discount coupon",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderPayPrice",
      text: "Total Price",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <b style={{ color: "red" }}>{formatPrice(row.orderPayPrice)}</b>
        </div>
      ),
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderPayMethod",
      text: "Payment Method",
      sort: true,
      sortCaret: sortCaret,

      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
    },
    {
      dataField: "orderStatusText",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: (cell, row, rowIndex, extraData) => (
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <div style={{ backgroundColor: `${row.statusColorBox}`, width: 20 }}>
            {" "}
          </div>
          <p style={{ color: `${row.statusColorText}` }}>
            {row.orderStatusText}
          </p>
        </div>
      ),
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
        openDelete: UIProps.openDelete,
        columnName: "id",
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
    },
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: sizePerPageList,
    sizePerPage: UIProps.queryParams.sizePerPage,
    page: UIProps.queryParams.page,
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
