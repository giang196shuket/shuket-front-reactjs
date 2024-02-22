import { BootstrapTable, Button, Form, LinearProgress, Modal, NoRecordsFoundMessage, Pagination, PaginationProvider, PleaseWaitMessage, SVG, TextField, ViewDetail, defaultSorted, getHandlerTableChange, getProductRegisterList, getSelectRow, injectIntl, paginationFactory, productStockStatus, searchProductImages, setMaxMinProduct, shallowEqual, sizePerPageList, sortCaret, toAbsoluteUrl, updateStockItem, useDispatch, useEffect, useMemo, useProductUIContext, useSelector, useState } from './index'

function ProductTable(props) {
  const UIContext = useProductUIContext();

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

  const [MinMax, setMinMax] = useState(null);
  const [detail, setDetail] = useState(null);
  const [images, setImages] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const [keyword, setKeyword] = useState("");

  const { entities, isLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    UIProps.setIds([]);
    dispatch(getProductRegisterList(UIProps.queryParams));
  }, [dispatch, UIProps.queryParams]);

  const handleSetMinMax = () => {
    dispatch(setMaxMinProduct(MinMax)).then(() => {
      setMinMax(null);
    });
  };

  //get detail
  const handleViewDetail = (seq) => {
    dispatch(ViewDetail(seq))
      .unwrap()
      .then((res) => {
        setDetail(res.data.row_detail);
      })
      .catch((err) => {});
  };

  //find list image
  const handleFindImages = () => {
    setLoadingImage(true);
    dispatch(
      searchProductImages({
        img_barcode: 1,
        img_cate: "",
        img_keyword: "name",
        img_type: "all",
        keyword: keyword,
      })
    )
      .unwrap()
      .then((res) => {
        setImages(res.data.list_images);
        setLoadingImage(false);
      })
      .catch((err) => {
        setLoadingImage(false);
      });
  };

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
        <img style={{ width: "100%" }} src={row.images[0].thumb} alt="" />
      ),
    },
    {
      text: "PRODUCT INFO",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "250px",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>Product code: {row.code}</p>
          <p>Barcode: {row.barcode}</p>
          <p>Category: {row.category}</p>
          <p>Product name: {row.name}</p>
          <p>Tag: {row.tags}</p>
          <p>Unit: {row.unit}</p>
        </div>
      ),
    },
    {
      text: "Price",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <s>{row.list_price} 원</s>
          <p>
            {row.sale_price} 원{" "}
            <b style={{ color: "red" }}> {row.sale_percent}%</b>
          </p>

          <p>{row.sale_src}</p>
          <p>{row.sale_title}</p>

          {row.price_updown === "U" ? (
            <div style={{ color: "green", backgroundColor: "#DCF2F1" }}>
              <p>{row.price_show} 원</p>
              <p>
                {row.price_number}{" "}
                {row.price_type === "PC"
                  ? "%"
                  : row.price_type === "AM"
                  ? "원"
                  : ""}
              </p>
            </div>
          ) : row.price_updown === "D" ? (
            <div style={{ color: "red", backgroundColor: "#DCF2F1" }}>
              <p>{row.price_show} 원</p>
              <p>
                {row.price_number}{" "}
                {row.price_type === "PC"
                  ? "%"
                  : row.price_type === "AM"
                  ? "원"
                  : ""}
              </p>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      text: "STOCK",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
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
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          {row.is_pro_stock ? (
            <>
              <div className="d-flex flex-row justify-content-around align-items-center mb-5">
                <button
                  className="btn btn-primary"
                  disabled={row.min_stock === 0}
                  onClick={() =>
                    dispatch(
                      updateStockItem({
                        min_stock: row.min_stock - 1,
                        p_code: row.code,
                        barcode: row.barcode,
                      })
                    )
                  }
                >
                  -
                </button>
                <p>{row.min_stock}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    dispatch(
                      updateStockItem({
                        min_stock: row.min_stock + 1,
                        p_code: row.code,
                        barcode: row.barcode,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-light"
                onClick={() =>
                  dispatch(
                    productStockStatus({
                      prd_seqs: [row.seq],
                      is_pro_stock: row.is_pro_stock,
                    })
                  )
                }
              >
                OFF
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() =>
                dispatch(
                  productStockStatus({
                    prd_seqs: [row.seq],
                    is_pro_stock: row.is_pro_stock,
                  })
                )
              }
            >
              ON
            </button>
          )}
        </div>
      ),
    },
    {
      text: "MAX/MIN QUANTITY",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p>
            <text style={{ color: "skyblue" }}>IS MAX:</text>{" "}
            {row.is_pro_maxqty}
          </p>
          {row.is_pro_maxqty === "Y" && (
            <p>
              {" "}
              <text style={{ color: "skyblue" }}>VALUE OF MAX:</text>{" "}
              {row.pro_max_qty}
            </p>
          )}

          <p>
            {" "}
            <text style={{ color: "skyblue" }}>IS MIN:</text>{" "}
            {row.is_pro_minqty}
          </p>
          {row.is_pro_minqty === "Y" && (
            <p>
              {" "}
              <text style={{ color: "skyblue" }}>VALUE OF MAX:</text>
              {row.pro_min_qty}
            </p>
          )}

          <button
            className="btn btn-primary"
            onClick={() =>
              setMinMax({
                is_pro_maxqty: row.is_pro_maxqty,
                pro_max_qty: row.pro_max_qty,
                is_pro_minqty: row.is_pro_minqty,
                pro_min_qty: row.pro_min_qty,
                seq: row.seq,
              })
            }
          >
            EDIT MIN/MAX QUANTITY
          </button>
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
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <p> {new Date(row.create_time).toLocaleString()}</p>
          <p>{row.create_name}</p>
          <hr />
          <p>{new Date(row.update_time).toLocaleString()}</p>
          <p>{row.update_name}</p>
        </div>
      ),
    },
    {
      text: "STATUS",
      sort: true,
      sortCaret: sortCaret,
      style: {
        width: "fit-content",
      },
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          {row.status === "A" ? (
            <button className="btn btn-primary">ACTIVE</button>
          ) : (
            <button className="btn">ACTIVE</button>
          )}
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
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => handleViewDetail(row.seq)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/images/svg/icons/Communication/Write.svg")}
            />
          </span>
        </a>
      ),
    },
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      ShowingA {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    custom: true,
    totalSize: entities.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: UIProps.queryParams.pageSize,
    page: UIProps.queryParams.pageNumber,
    paginationTotalRenderer: customTotal,
  };

  return (
    <>
      <Modal show={MinMax} onHide={() => setMinMax(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Max/Min Qty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="d-flex" controlId={MinMax?.is_pro_maxqty}>
            <Form.Label>Use maxquantity: </Form.Label>

            <Form.Check
              className="ml-5"
              value="Y"
              type="radio"
              label="Yes"
              onChange={() => setMinMax({ ...MinMax, is_pro_maxqty: "Y" })}
              checked={MinMax?.is_pro_maxqty === "Y"}
            />
            <Form.Check
              className="ml-5"
              value="N"
              type="radio"
              label="No"
              onChange={() => setMinMax({ ...MinMax, is_pro_maxqty: "N" })}
              checked={MinMax?.is_pro_maxqty === "N"}
            />
          </Form.Group>
          {MinMax?.is_pro_maxqty === "Y" && (
            <Form.Group className="d-flex" controlId={MinMax?.pro_max_qty}>
              <Form.Label>Max quantity: </Form.Label>
              <Form.Control
                type="text"
                defaultValue={MinMax?.pro_max_qty}
                onChange={(e) =>
                  setMinMax({ ...MinMax, pro_max_qty: e.target.value })
                }
              />
            </Form.Group>
          )}

          <Form.Group className="d-flex" controlId={MinMax?.is_pro_minqty}>
            <Form.Label>Use minquantity: </Form.Label>

            <Form.Check
              className="ml-5"
              value="Y"
              type="radio"
              label="Yes"
              onChange={() => setMinMax({ ...MinMax, is_pro_minqty: "Y" })}
              checked={MinMax?.is_pro_minqty === "Y"}
            />
            <Form.Check
              className="ml-5"
              value="N"
              type="radio"
              label="No"
              onChange={() => setMinMax({ ...MinMax, is_pro_minqty: "N" })}
              checked={MinMax?.is_pro_minqty === "N"}
            />
          </Form.Group>

          {MinMax?.is_pro_minqty === "Y" && (
            <Form.Group className="d-flex" controlId={MinMax?.pro_min_qty}>
              <Form.Label>Max quantity: </Form.Label>
              <Form.Control
                type="text"
                defaultValue={MinMax?.pro_min_qty}
                onChange={(e) =>
                  setMinMax({ ...MinMax, pro_min_qty: e.target.value })
                }
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ display: "block", margin: "auto" }}
            onClick={handleSetMinMax}
          >
            SET
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={detail}
        onHide={() => {
          setDetail(null);
          setImages(null);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update product registered detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Product code: {detail?.code}</p>
          <p>Product name: {detail?.name}</p>
          <p>Product category: {detail?.category}</p>
          <p>Product price: {detail?.list_price}</p>
          <p>Product unit: {detail?.unit}</p>
          <p>Product provider: {detail?.provider}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 20,
            }}
          >
            <label>Tags:</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div>
                {detail?.tags
                  .split("#")
                  .filter((fil) => fil !== "")
                  .map((tag) => {
                    return (
                      <button className="btn btn-info mr-2">#{tag}</button>
                    );
                  })}
              </div>
              <TextField fullWidth variant="outlined" placeholder="add tag.." />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 20,
            }}
          >
            <label>Product detail image list:</label>
            {detail?.images.map((img) => {
              return <img src={img.thumb} alt="" style={{ width: 200 }} />;
            })}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="search keyword images..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              style={{ display: "block", margin: "auto" }}
              onClick={handleFindImages}
            >
              FIND IMAGES
            </Button>
          </div>
          {loadingImage && (
            <LinearProgress
              style={{ marginTop: 5, marginBottom: 5 }}
              color="secondary"
            />
          )}
          {images && (
            <div style={{ height: 300, overflow: "scroll", marginTop:5 }}>
              {images?.map((img) => {
                return (
                  <img
                    src={img.img_url}
                    loading="lazy"
                    alt=""
                    style={{ width: 140, height: 140 }}
                  />
                );
              })}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ display: "block", margin: "auto" }}>UPDATE</Button>
        </Modal.Footer>
      </Modal>
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
                keyField="code"
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

export default injectIntl(ProductTable);
