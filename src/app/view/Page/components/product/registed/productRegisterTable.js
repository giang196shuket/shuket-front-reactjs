import { getProductInventoryList } from "../../../redux/product/Thunk";
import { ProductDetail } from "../common/productDetail";
import { ProductInfo } from "./helper/productInfo";
import { ProductMinMax } from "./helper/productMinMax";
import { ProductPrice } from "./helper/productPrice";
import { ProductStock } from "./helper/productStock";
import { ProductTime } from "./helper/productTime";
import {
  SwitchesCustom,
  BootstrapTable,
  Button,
  LinearProgress,
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
  getProductRegisterList,
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
  useProductRegisterUIContext,
  useSelector,
  useState,
} from "./index";

function ProductRegisterTable(props) {
  const UIContext = useProductRegisterUIContext();

  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openEditMaxMin: UIContext.openEditMaxMin,
      openEditStock: UIContext.openEditStock,
      openEditCate: UIContext.openEditCate,
    };
  }, [UIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );



  const { productList: entities, isLoading, productTotal: total } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getProductInventoryList(UIProps.queryParams));
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
      text: "STOCK",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.is_pro_stock ? row.value_stock : "--"}</p>
          <p style={{ color: "red" }}>
            {row.is_pro_stock && row.min_stock >= row.value_stock
              ? "OUT OF STOCK"
              : ""}
          </p>
        </div>
      ),
    },
    {
      text: "DATE SYNC STOCK",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{row.date_sync_stock}</p>
          <p>{row.time_sync_stock}</p>
        </div>
      ),
    },
    {
      text: "CUSTOM STOCK",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
        textAlign: "center",
      },
      formatter: (cell, row, rowIndex, extraData) => <ProductStock row={row} />,
    },
    {
      text: "MAX/MIN QUANTITY",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <ProductMinMax row={row} />
      ),
    },
    {
      text: "DATE SYNC STOCK",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
        textAlign: "center",
      },
      headerClasses: "text-center ",
      formatter: (cell, row, rowIndex, extraData) => <ProductTime row={row} />,
    },
    {
      text: "STATUS",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
      headerClasses: "text-center ",

      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <SwitchesCustom
            status={row.status === "A" ? true : false}
            code={row.code}
          ></SwitchesCustom>
        </div>
      ),
    },

    {
      text: "",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
       <ProductDetail row={row}/>
      ),
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

export default injectIntl(ProductRegisterTable);
