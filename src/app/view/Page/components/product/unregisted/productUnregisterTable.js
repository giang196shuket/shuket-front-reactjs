import {
  SwitchesCustom,
  BootstrapTable,
  editProduct,
  ProductExpand,
  Modal,
  NoRecordsFoundMessage,
  Pagination,
  PaginationProvider,
  PleaseWaitMessage,
  SVG,
  TextField,
  ViewDetail,
  defaultSorted,
  getHandlerTableChange,
  getProductUnregisterList,
  getSelectRow,
  injectIntl,
  paginationFactory,
  searchProductImages,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  toAbsoluteUrl,
  useDispatch,
  useEffect,
  useMemo,
  useProductUnregisterUIContext,
  useSelector,
  ActionsColumnFormatter,
  TagsInput,
  useState,
} from "./index";

function ProductUnregisterTable(props) {
  const UIContext = useProductUnregisterUIContext();

  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEdit: UIContext.openEdit,
    };
  }, [UIContext]);

  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getProductUnregisterList(UIProps.queryParams));
  }, [UIProps.queryParams]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );

  const {
    productList: entities,
    isLoading,
    editProductId,
    productTotal: total,
  } = currentState;

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
        <img style={{ width: "100%" }} src={row.noImage} alt="" />
      ),
    },
    {
      text: "PRODUCT INFO",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",

      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.code}</p>
          <p>{row.barcode}</p>
        </div>
      ),
    },
    {
      text: "PRODUCT name",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",

      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.name}</p>
        </div>
      ),
    },
    {
      text: "PRODUCT category",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",

      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.category}</p>
        </div>
      ),
    },
    {
      text: "PRODUCT category (sub)",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",

      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.categorySub}</p>
        </div>
      ),
    },
    {
      text: "Price",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.price} 원</p>
        </div>
      ),
    },
    {
      text: "Unit",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
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
      text: "Provider",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "max-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.provider}</p>
        </div>
      ),
    },

    {
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
        columnName: "code",
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



  //tắt expanded khi chuyển panigation, limit
  useEffect(() => {
    dispatch(editProduct(editProductId));
  }, [UIProps.queryParams]);


  // html mở rộng
  const expandRow = {
    renderer: (row) => (
     <ProductExpand row={row}/>
    ),
    expanded: [editProductId], // dựa vào này mở rộng row nào đó
    onExpand: (row, isExpand) => {},
    onlyOneExpanding: true,
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
                expandRow={expandRow}
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

export default injectIntl(ProductUnregisterTable);
