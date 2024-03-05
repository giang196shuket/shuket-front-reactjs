import { ProductInfo } from "./helper/productInfo";
import { ProductPrice } from "./helper/productPrice";
import { ProductTime } from "./helper/productTime";
import {
  ActionsColumnFormatter,
  BootstrapTable,
  NoRecordsFoundMessage,
  Pagination,
  PaginationProvider,
  PleaseWaitMessage,
  defaultSorted,
  getHandlerTableChange,
  getProductPriceList,
  getSelectRow,
  injectIntl,
  paginationFactory,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  useDispatch,
  useEffect,
  useMemo,
  useProductPriceUIContext,
  useSelector,
} from "./index";

function ProductPriceTable(props) {
  const UIContext = useProductPriceUIContext();

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
    (state) => ({ currentState: state.product }),
    shallowEqual
  );

  const {
    productList: entities,
    isLoading,
    productTotal: total,
  } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getProductPriceList(UIProps.queryParams));
  }, [dispatch, UIProps.queryParams]);

  const columns = [
    {
      dataField: "seq",
      text: "SEQ",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "100px",
      },
    },
    {
      dataField: "images",
      text: "IMAGE",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "200px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <img style={{ width: "100%" }} src={row?.images[0]?.thumb} alt="" />
      ),
    },
    {
      text: "PRODUCT INFO",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "250px",
      },
      formatter: (cell, row, rowIndex, extraData) => <ProductInfo row={row} />,
    },
    {
      text: "Price",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => <ProductPrice row={row} />,
    },
    {
      text: "Unit",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.unit}</p>
        </div>
      ),
    },

    {
      text: "DATE SYNC STOCK",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => <ProductTime row={row} />,
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
                keyField="code"
                data={!entities || isLoading ? [] : entities}
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

export default injectIntl(ProductPriceTable);
