import TagsInput from "react-tagsinput";
import {
  ActionsColumnFormatter,
  BootstrapTable,
  NoRecordsFoundMessage,
  Pagination,
  PaginationProvider,
  PleaseWaitMessage,
  defaultSorted,
  getHandlerTableChange,
  getListImagesWithoutBarcode,
  getSelectRow,
  injectIntl,
  paginationFactory,
  shallowEqual,
  sizePerPageList,
  sortCaret,
  useDispatch,
  useEffect,
  useProductNoBarcodeUIContext,
  useMemo,
  useSelector,
  SwitchesCustom,
  editProductImage
} from "./index";
import 'react-tagsinput/react-tagsinput.css'
import '../../../../../../module/assets/sass/pages/images/productBarcode.scss'
import { useState } from "react";

function ProductNoBarcodeTable(props) {
  const UIContext = useProductNoBarcodeUIContext();

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
    (state) => ({ currentState: state.images }),
    shallowEqual
  );

  const {
    productImage: entities,
    productImageTotal: total,
    isLoading,
    productImageEdit,
  } = currentState;
  const dispatch = useDispatch();
  console.log("UIProps.queryParams", UIProps.queryParams);
  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getListImagesWithoutBarcode(UIProps.queryParams));
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
      text: "IMAGE",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "150px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <img style={{ width: "100%" }} src={row.arrImage.image_uri} alt="" />
      ),
    },

    {
      text: "IMAGE INFO",
      sort: true,
      sortCaret: sortCaret,
      classes: "pr-0",
      headerClasses: " pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>tags: {row.tags}</p>
          <p>code: {row.code}</p>
          <p>image name: {row.name}</p>
        </div>
      ),
    },
    {
      dataField: "c_time",
      text: "LOGS INFO",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>{new Date(row.createdTime).toLocaleString()}</p>
          <p>------------------------------</p>
          <p>{new Date(row.modifiedTime).toLocaleString()}</p>
        </div>
      ),
    },
    {
      text: "STATUS",
      sort: true,
      sortCaret: sortCaret,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-0",
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
      dataField: "method",
      text: "Methods",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: UIProps.openEdit,
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

  console.log("productImageEdit", productImageEdit);

  const [tagsEdit, setTagsEdit] = useState([])

  console.log('tagsEdit', tagsEdit)

  //convert tag string => array
  function generateTag(tages) {
    return tages.split("#").filter(Boolean);
  }

  // thêm xóa tag
  const handleChangeTag = (tages) =>{
    setTagsEdit(tages)
  }

  //tắt expanded khi chuyển panigation, limit
  useEffect(() => {
    dispatch(editProductImage(productImageEdit));
  }, [UIProps.queryParams]);

  //đổi state tags khi expand sản phẩm khác
  useEffect(()=>{
    if(productImageEdit){
      setTagsEdit(generateTag(entities.find((en)=> en.id === productImageEdit)?.tags))
    }
  },[entities, productImageEdit])
  
  // html mở rộng
  const expandRow = {
    renderer: (row) => (
      <div className="my-5">
        <div className="row">
            <div className="col-lg-5 offset-md-1">
              <div className="row">
                <p className="col-lg-2 offset-md-1"> Name: </p>
                <input className="col-lg-9 form-control" defaultValue={row.name} />
            </div>
            <div className="row my-5">
              <p className="col-lg-2 offset-md-1"> Tags: </p>
              <div className="col-lg-9 d-flex flex-column" style={{gap:10}}>
                <TagsInput value={tagsEdit} onChange={handleChangeTag}   />
              </div>
            </div>
            <div className="row mt-5">
              <button className="offset-md-1 btn btn-light-primary font-weight-bolder font-size-sm"> SAVE </button>
              <button className="ml-5 btn btn-danger font-weight-bolder font-size-sm" onClick={()=>dispatch(editProductImage(productImageEdit))}> Cancle </button>
            </div>
          </div>
          <div  className="col-lg-5 offset-md-1">
          <img style={{ width: "30%" }} src={row.arrImage.image_uri} alt="" className=" offset-md-2"/>
          </div>
        </div>
      </div>
    ),
    expanded: [productImageEdit], // dựa vào này mở rộng row nào đó
    onExpand: (row, isExpand) => {
      console.log('rowrowrow')
    },
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
                keyField="id"
                data={!entities || isLoading ? [] : entities}
                columns={columns}
                expandRow={expandRow}
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

export default injectIntl(ProductNoBarcodeTable);
