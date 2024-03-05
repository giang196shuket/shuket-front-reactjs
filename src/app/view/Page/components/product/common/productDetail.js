/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  SVG,
  ViewDetail,
  LinearProgress,
  TextField,
  toAbsoluteUrl,
  useDispatch,
  useState,
  Modal,
  Button,
  searchProductImages,
  TagsInput,
  useEffect,
  keyTypeImageProductList,
  initailFilterImgProduct,
  keyTypeImage,
  FormCheck,
  findMaxId,
  updateProduct,toast
} from "../registed/index";
import "../../../../../../module/assets/sass/pages/product/productRegister.scss"

export const ProductDetail = ({ row }) => {
  const [images, setImages] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  const [dataFind, setDataFind] = useState(initailFilterImgProduct);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);

  //get detail
  const handleViewDetail = (code) => {
    dispatch(ViewDetail(code))
      .unwrap()
      .then((res) => {
        const data = res.data.row_detail;
        let images = data.images.sort((a, b) => a.priority - b.priority); // sắp xếp theo priority
        setDetail({ ...data, images: images });
      })
      .catch((err) => {});
  };

  //find list image
  const handleFindImages = () => {
    setLoadingImage(true);
    dispatch(searchProductImages(dataFind))
      .unwrap()
      .then((res) => {
        setImages(res.data.list_images);
        setLoadingImage(false);
      })
      .catch((err) => {
        setLoadingImage(false);
      });
  };
 
  // thêm xóa tag
  const handleChangeTag = (tages) => {
    setDetail({ ...detail, tags: tages });

  };

  // thêm ảnh vào detail
  const handleAddImg = (img) => {
    const newImgList = detail.images;
    let newImg = {}
    if(newImgList.length === 0){
      newImg = {
        thumb: img.img_url,
        priority: 1,
        main: 0,
        id: 1,
      };
    }else{
      newImg = {
        thumb: img.img_url,
        priority: findMaxId(newImgList, "priority") + 1,
        main: 0,
        id: findMaxId(newImgList, "id") + 1,
      };
    }

  
    newImgList.push(newImg);
    setDetail({ ...detail, images: newImgList });
  };

  // xóa ảnh trong detail
  const handleRemoveImg = (id) => {
    const newImgList = detail.images.filter((img) => img.id !== id);
    setDetail({ ...detail, images: newImgList });
  };
  // đổi thứ tự ưu tiên
  const handleChangePriority = (img, priority) =>{
    let newImgList = detail.images.map(function(im) {
      if (im.id === img.id) {
        return { ...im, priority: priority };
      } else {
        return im;
      }
    });
    const newImgListArrange = newImgList.sort((a, b) => a.priority - b.priority);
    setDetail({ ...detail, images: newImgListArrange });

  }
  // checked main
  const handleCheckMain = (img, checked) => {
    const main = checked ? 1 : 0;

    let newImgList = detail.images.map(function(im) {
      if (im.id === img.id) {
        return { ...im, main: main };
      } else {
        // chỉ 1 image duy nhất trong mảng detail.images có main = 1 => còn lại phải bằng 0
        if (main === 1) {
          return { ...im, main: 0 };
        } else {
          return im;
        }
      }
    });

    setDetail({ ...detail, images: newImgList });
  };

  //update tag and img 
  const handleUpdate = () =>{

    dispatch(updateProduct({prd_seq : detail.seq, prd_tags: detail.tags, prd_images: detail.images}))
    .then((res)=>{
      toast.success(res.payload.message)
    })
    .catch((err) => {
      toast.error(err)
    })
  }
  return (
    <>
      <Modal
        show={detail}
        onHide={() => {
          setDetail(null);
          setImages([]);
        }}
        size="xl"
        fullscreen={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update product registered detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table table-bordered">
            <tr>
              <th> code</th>
              <th> name</th>
              <th> category</th>
              <th> price</th>
              <th> unit</th>
              <th> provider</th>
            </tr>
            <tr>
              <td>{detail?.code}</td>
              <td>{detail?.name}</td>
              <td>{detail?.category}</td>
              <td>{detail?.list_price}</td>
              <td>{detail?.unit}</td>
              <td>{detail?.provider}</td>
            </tr>
          </table>
          <div style={{ display: "flex", gap: 50 }}>
            <div style={{ width: "50%" }}>
              <div className="mt-3">
                <TagsInput value={detail ? detail?.tags : []} onChange={handleChangeTag} />
              </div>
              <label className="mt-3">Product detail image list:</label>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 20,
                  maxHeight: 500,
                  overflowY: "scroll",
                  marginTop: 5,
                }}
              >
                {detail && detail?.images.map((img, index) => {
                  return (
                    <div key={img.id}>
                      <div className="form-group row">
                        <div className="col-lg-5 mt-3">
                          <FormCheck
                            size="large"
                            type="checkbox"
                            id={img.main}
                            label={"Main"}
                            checked={img.main === 1 ? true : false}
                            onChange={(e) =>
                              handleCheckMain(img, e.target.checked)
                            }
                          />
                        </div>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          defaultValue={img.priority}
                          style={{ width: 50 }}
                          onChange={(e)=>handleChangePriority(img, e.target.value)}
                        />
                      </div>
                      <div className="d-flex flex-column" style={{ gap: 5 }}>
                        <img src={img.thumb} alt="" style={{ width: 130 }} />
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveImg(img.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <div className="form-group row">
                <div className="col-lg-3">
                  <select
                    className="form-control"
                    placeholder="Filter by Image"
                    name="img_cate"
                    onChange={(e) => {
                      setDataFind({ ...dataFind, img_cate: e.target.value });
                    }}
                    value={dataFind.img_cate}
                  >
                    <option value="">All</option>
                  </select>
                  <small className="form-text text-muted">
                    <b>Filter</b> by type
                  </small>
                </div>
                <div className="col-lg-4">
                  <select
                    className="form-control"
                    placeholder="Filter by Image"
                    name="img_type"
                    onChange={(e) => {
                      setDataFind({ ...dataFind, img_type: e.target.value });
                    }}
                    value={dataFind.img_type}
                  >
                    <option value="">All</option>
                    {keyTypeImage.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                  <small className="form-text text-muted">
                    <b>Filter</b> by type image
                  </small>
                </div>
                <div className="col-lg-5">
                  <select
                    className="form-control"
                    placeholder="Filter by Image"
                    name="img_keyword"
                    onChange={(e) => {
                      setDataFind({ ...dataFind, img_keyword: e.target.value });
                    }}
                    value={dataFind.img_keyword}
                  >
                    <option value="">All</option>
                    {keyTypeImageProductList.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                  <small className="form-text text-muted">
                    <b>Filter</b> by type
                  </small>
                </div>
              </div>
              <div className="form-group row">
                {/* <div className="col-lg-5 mt-3">
                  <FormCheck
                    size="large"
                    type="checkbox"
                    id={dataFind.img_barcode}
                    label={"Image have barcode"}
                    checked={dataFind.img_barcode === 1 ? true : false}
                    onChange={(e) => {
                      setDataFind({
                        ...dataFind,
                        img_barcode: e.target.checked ? 1 : 0,
                      });
                    }}
                  />
                </div> */}
                <input
                  className="form-control col-lg-9"
                  placeholder="search keyword images..."
                  onChange={(e) =>
                    setDataFind({ ...dataFind, img_value: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="btn btn-success btn-sm col-lg-2 ml-1"
                  onClick={handleFindImages}
                >
                  FIND
                </button>
              </div>
              {loadingImage && <LinearProgress color="secondary" />}
              {images && (
                <div
                  style={{
                    maxHeight: 500,
                    overflowY: "scroll",
                    marginTop: 5,
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {detail && images?.map((img) => {
                    return (
                      <div className="container-product">
                        <img
                          src={img.img_url}
                          loading="lazy"
                          class="image-product"
                          alt=""
                          style={{ width: 150, height: 150 }}
                        />
                        <div class="middle">
                          <div class="text" onClick={() => handleAddImg(img)}>
                            Add
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ display: "block", margin: "auto" }} onClick={handleUpdate}>UPDATE</Button>
        </Modal.Footer>
      </Modal>
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => handleViewDetail(row.code)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/images/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </>
  );
};
